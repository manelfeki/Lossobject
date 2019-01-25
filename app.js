const express = require('express')
const bodyParser = require('body-parser');
// Imports routes for the objects
const object = require('./routes/object.routes'); 
// initialize our express app
const app = express()
// Set up mongoose connection
mongoose.connect("mongodb://localhost:27017/lossobject");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/objects', object);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})