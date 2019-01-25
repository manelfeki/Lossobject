const express = require('express')
const bodyParser = require('body-parser');
// Imports routes for the objects
const object = require('./routes/object.routes'); 
// initialize our express app
const app = express()
app.use('/objects', object);
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})