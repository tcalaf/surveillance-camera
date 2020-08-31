const express = require('express')
const http = require('http')
const bodyParser = require('body-parser') 
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()
app.use(bodyParser.json());
//app.use(express.static('www'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req,res,next) =>{
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

let cachedLogs  = [{"name" : "Andrei", "age" : 15}]
const imageDir = 'public/images'
const dbName = 'database.txt'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
   
var upload = multer({ storage: storage })


//const port = 3200;
const port = process.env.PORT || 1337;
app.set('view engine','ejs') 

//app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))

app.get('/', (req,res) => {
    if(cachedLogs.length == 0){
        res.render('index', {
          "logs" : "Empty logs"
        })
    } else {
        res.render('index', {
          "logs" : cachedLogs[cachedLogs.length-1]
        })
    }
})
app.get('/database',(req,res) => {
    updateDatabase({"dog" : "Azor"}, dbName);
    res.status(201).send('Update succesfully')
})

app.get('/cristi', (req, res) => res.send("Yout post succesfuly  !!!"))
app.get('/reset', (req, res) => {
    console.log("You have reseted the cached data")
    cachedLogs = []
    console.log("Cached logs: " + cachedLogs)
    res.send('You have emptied the cache')
})
app.get('/features', (req,res) => {
    console.log('Somebody tries to access the cached features')
    if (cachedLogs.length) {
        res.status(200).send(cachedLogs[cachedLogs.length-1])
    }else {
        res.status(200).send('The cached data is empty')
    }
})
app.get('/api/images/titles', (req,res) => {
    var imageNames = []
    fs.readdirSync(imageDir).forEach(file => imageNames.push(file))
    res.status(200).send({'files' : imageNames})
})
app.get('/images/titles', (req, res) => {
    var imageNames = []
    fs.readdirSync(imageDir).forEach(file => imageNames.push(file))
    res.render('images_titles', {"titles": imageNames})
})
app.get('/images', (req, res) => {
    //var imageNames = []
    //fs.readdirSync(imageDir).forEach(file => imageNames.push("/images/" + file))
    fs.readFile(dbName, {encoding: 'utf8'}, function(err,data) {
        console.log("La imagini se vor afisa: " + data)
        var jsonData = JSON.parse(data)
        var attributes = jsonData[0]
        var gender = attributes.faceAttributes
        //var featuresClass = attributes[0]
        console.log("Attributes " + attributes)
        console.log("Gender " + gender)
        res.render('images', {links: jsonData})
    })
})

app.post('/form', (req, res) => {
  
    if (req.body.basecode) {
        let base64String = req.body.basecode
        let base64Image = base64String.split(';base64,').pop()   
        let name = "/images/" + (new Date().getTime().toString()) + "_image.jpeg";
        let directory = "public/images/" + (new Date().getTime().toString()) + "_image.jpeg";

        updateDatabase({"name" : name, "timestamp": req.body.timestamp, "attributes" : req.body.attributes}, dbName)

        fs.writeFile(directory, base64Image, {encoding: 'base64'}, function(err) {
          console.log("Image created: " + directory)
        })
    }
    console.log("You have received a post")
    //console.log("You have received" + JSON.stringify(req.body))
    cachedLogs.push(JSON.stringify(req.body));
    //console.log("The cached log so far is: " + cachedLogs)
  // }
  
   res.status(201).send("You post succesfully a form")
})

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

function updateDatabase(entry, db) {
    fs.readFile(db, 'utf8', function(err, data) {
        console.log("Data citita: " + data)
        var entries = JSON.parse(data)
        entries.push(entry)
        fs.writeFile(db, JSON.stringify(entries) , function(err) {
            console.log("Updated database succesfully")
        })
    })  
}

//fetch('http://localhost:3000/form',{headers: {'Accept': 'application/json', 'Content-Type' : 'application/json'},method: 'post', body: JSON.stringify(data)})