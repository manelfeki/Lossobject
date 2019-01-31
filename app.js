// Load all requirements for the app
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3000; 

mongoose.connect("mongodb://localhost:27017/lossobject", {
        useNewUrlParser: true
    },
    (err) => {
        if (!err) {
            console.log('Connection successful')
        } else {
            console.log('Error in DB connection ' + err)
        }
    });

require('./config/passport')(passport); // Pass passport for configuration

app.use(morgan('dev')); // Log every request to the console
app.use(cookieParser()); // Read cookies (needed for auth)

app.use(session({
    secret: 'This is just a random secret'
})); // Session secret
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions
app.use(flash()); // Use connect-flash for flash messages stored in session

// Set the view engine for the app to Pug 
app.set('view engine', 'pug')
// To support JSON-encoded bodies
app.use(bodyParser.json());
// To support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// Load our app routes
require('./routes/user.routes')(app, passport);
require('./routes/object.routes')(app);

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!')
})