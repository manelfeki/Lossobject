const LocalStrategy = require('passport-local').Strategy;
// Load up the user model
const User = require('../models/user.models');

module.exports = function (passport) {

    // Used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // Used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // Definining sign up strategy with name local-signup
    passport.use('local-signup', new LocalStrategy({
        // Overriding the default username and password field
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // Allows to pass back the entire request to the callback
    },
        function (req, email, password, done) {

            // Asynchronous
            process.nextTick(function () {

                // Find a user whose email is the same as the forms email
                User.findOne({
                    'local.email': email
                }, function (err, user) {
                    // If there are any errors, return the error
                    if (err)
                        return done(err);

                    // Check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // If there is no user with that email then we create a new one
                        var newUser = new User();

                        // Set the user's local credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.nom = req.body.nom
                        newUser.local.prenom = req.body.prenom


                        // Save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    // Definining login strategy with name local-login
    passport.use('local-login', new LocalStrategy({
        // Overriding the default username and password field
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // Allows to pass back the entire request to the callback
    },
        function (req, email, password, done) {

            // Find a user whose email is the same as the forms email
            User.findOne({
                'local.email': email
            }, function (err, user) {
                // If there are any errors, return the error before anything else
                if (err) {
                    console.log('err' + err)
                    return done(err);
                }

                // If no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // If the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Wrong password.')); // create the loginMessage and save it to session as flashdata

                // If everything checks out, return the user
                return done(null, user);
            });

        }));

};