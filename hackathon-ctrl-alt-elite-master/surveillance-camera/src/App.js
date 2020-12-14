import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import $ from 'jquery';
import jQuery from 'jquery';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import {storage} from "./firebase";

function App() {
  const [records, setRecords] = useState([]);
  const video = useRef(null);
  const startButton = useRef(null);
  const stopButton = useRef(null);
  const recorder = useRef(null);
  const model = useRef(null);
  const lastDetections = useRef([]);
  const recording = useRef(false);
  const shouldRecord = useRef(false); //keep last 10 frames
  window.$ = window.jQuery=jQuery;
  const executed = useRef(false)
  var seconds = 0;
  var frames = 0;
  var noRecords = useRef(0);
  setInterval(increment, 1000);
  function increment(){
    seconds++;
  } 
  
  // Generates monitoring video from the camera
  useEffect(() => {
    async function getMedia() {
      startButton.current.setAttribute("disabled", true);
      stopButton.current.setAttribute("disabled", true);
      const constraints = window.constraints = {
        audio: true,
        video: true
      };
      
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          window.stream = stream; // make variable available to browser console
          video.current.srcObject = stream;
          model.current = await cocoSsd.load();
          startButton.current.removeAttribute("disabled");
        } catch (error) {
          console.error(error);
        }
      }
    }
    getMedia();
  }, []);

  function processImage(blob) {
    
    var subscriptionKey = "";

    var uriBase =
        "https://faceservicetudor.cognitiveservices.azure.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "false",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,gender,facialHair,glasses," +
            "hair,makeup,accessories"
    };
    
    document.querySelector("#sourceImage").src = URL.createObjectURL(blob);

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",
        processData: false,

        // Request body.
        data: blob,
    })

    .done(function(data) {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
        if(data.length > 0) {
          executed.current=true;
          const faceAttributes = JSON.stringify(data, null, 2);
          console.log(JSON.stringify(data, null, 2));
          var reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = function() {
              var base64string = reader.result
              var currTime = new Date()
              //console.log("Base64 String is: " + base64string)
              const json = JSON.stringify({"attributes": faceAttributes, "basecode" : base64string, "timestamp": currTime })
              $.ajax({
                    url: 'https://ctrlaltelite21.azurewebsites.net/form',
      
                    // Request headers.
                    beforeSend: function(xhrObj){
                        xhrObj.setRequestHeader("Content-Type","application/json");
                    },
      
                    type: "POST",
      
                    // Request body.
                    data: json,
              })
          }
        }})

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ?
            "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ?
            "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
};

  function takeASnap(frame){
    const canvas = document.createElement('canvas'); // create a canvas
    const ctx = canvas.getContext('2d'); // get its context
    canvas.width = frame.videoWidth; // set its size to the one of the video
    canvas.height = frame.videoHeight;
    ctx.drawImage(frame, 0,0); // the video
    return new Promise((res, rej)=>{
      canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
    });
  }

  // Detecting person function
  async function detectPerson() {
    if (!shouldRecord.current) {
      stopRecording();
      return;
    }
    const predictions = await model.current.detect(video.current);


    // Check found person
    let foundPerson = false;
    for (let i = 0; i < predictions.length; i++) {
      if (predictions[i].class === "person") {
        //console.log(JSON.stringify(predictions[i]));
        foundPerson = true;
        if(!executed.current ){
            frames++;;
            if(seconds % 3 === 0 && frames % 7 === 0) {
              takeASnap(video.current).then(processImage);
            }
        }
      }
    }

    if (foundPerson) { // Found person
      console.log("Found person!");
      startRecording();
      lastDetections.current.push(true);
    } else if (lastDetections.current.filter(Boolean).length) { //Not found but still have recent frames with person
      startRecording();
      lastDetections.current.push(false);
    } else { //Not found 
      stopRecording();
    }

    // Keep track of last 10 frames
    lastDetections.current = lastDetections.current.slice(
      Math.max(lastDetections.current.length - 10, 0)
    );

    // Callback next time the browser runs a repaint; check next frame
    requestAnimationFrame(() => {
      detectPerson();
    });
  }

  // Start recording function
  function startRecording() {
    if (recording.current) {
      return;
    }
    recording.current = true;
    console.log("Started recording!");

    recorder.current = new MediaRecorder(window.stream);

    // Save recording function
    recorder.current.ondataavailable = (record) => {
      noRecords.current++;
      const title = new Date() + " : " + noRecords.current;
      const href = URL.createObjectURL(record.data);
      setRecords(previousRecords => {
        return [...previousRecords, { href, title }];
      });

      const uploadTask = storage.ref(`videos/${title}`).put(record.data);
      uploadTask.on(
        "state_changed",
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("videos")
            .child(title)
            .getDownloadURL()
        }
      );
    };

    recorder.current.start();
  }

  // Stop recording function
  function stopRecording() {
    if (!recording.current) {
      return;
    }
    executed.current = false;
    recording.current = false;
    recorder.current.stop();
    console.log("Stopped recording!");
  }

  return (
    <div className="p-3">
      <div>
        <video autoPlay playsInline muted ref={video} >
        </video> 
      </div>
      <div>
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with start and stop buttons">
          <div className="btn-group mr-2" role="group">
            <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              shouldRecord.current = true;
              stopButton.current.removeAttribute("disabled");
              startButton.current.setAttribute("disabled", true);
              detectPerson();
            }}
            ref={startButton}
            >
            <b>Start</b>
            </button>
          </div>
          <div className="btn-group mr-2" role="group">
            <button
            className="btn btn-danger"
            onClick={() => {
                shouldRecord.current = false;
                startButton.current.removeAttribute("disabled");
                stopButton.current.setAttribute("disabled", true);
                stopRecording();
              }}            
            ref={stopButton}
            >
            <b>Stop</b>
            </button>
          </div>
        </div>
        <div className="row p-3">
            <div id="wrapper" style={{width: '1020px', display:'table'}}>
              <div id="jsonOutput" style={{width:'600px', display:'table-cell'}}>
              Face Attributes:<br></br>
                <textarea id="responseTextArea" className="UIInput" style={{width:'580px', height:'400px'}}></textarea>
              </div>
              <div id="imageDiv" style={{width:'420px', display:'table-cell'}}>
              Intruder:<br></br>
             <img id="sourceImage" width="400" alt="Source" />
              </div>
            </div>
        </div>
        <div className="row p-3">
          <h3>Records:</h3>
          {!records.length ? null :
            records.map(rec => {
              return (
                <div className="card mt-3 w-100" key={rec.title}>
                  <div className="card-body">
                    <h5 className="card-title" >{rec.title}</h5>
                    <video controls src={rec.href}></video>
                  </div>
                </div>                
              );
            })
          }
        </div>
      </div>
    </div>    
  );
}

export default App;
