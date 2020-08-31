const functions = require('firebase-functions');
const express = require('express')
const bodyParser = require('body-parser')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const app = express()
app.use(bodyParser.json()); 

app.get('/', (req,res) => {
    res.render('../public/index.html')
})

app.get('/altceva', (req,res) => {
    res.send("Hello Sunshine");
})

var dogsArr = []

app.post('/dogs',(req,res) => {
    var dog = req.body;
    console.log(dog);
    dogsArr.push(dog);
    res.send("Dog added!");
    //console.log("Ai postat ceva")
    //res.status(201).send("Somebody posted something")
})




exports.app = functions.https.onRequest(app);