import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAuxEhaKN9z-cTeJzeusJbKdHt8eJI_Ypk",
    authDomain: "surveillance-camera-upload.firebaseapp.com",
    databaseURL: "https://surveillance-camera-upload.firebaseio.com",
    projectId: "surveillance-camera-upload",
    storageBucket: "surveillance-camera-upload.appspot.com",
    messagingSenderId: "1085627999450",
    appId: "1:1085627999450:web:7a0c092ce768bad83ef1e3",
    measurementId: "G-VKYQYMQ05D"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export { storage, firebase as default };