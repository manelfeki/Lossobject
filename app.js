const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Imports routes for the objects
const object = require('./routes/object.routes'); 
// initialize our express app
const app = express()
// Set up mongoose connection
mongoose.connect("mongodb://localhost:27017/lossobject", {useNewUrlParser: true}, 
(err) => {
    if (!err) {
        console.log('Connection successful')
    }
    else {
        console.log('Error in DB connection ' + err)
    }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('view engine', 'pug')
// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use('/objects', object);

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})