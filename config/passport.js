const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')


const costumeField = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const verifyCallback = (req, email, password, done) => {
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return done(null, false, req.flash('success-message', 'User does not exist'))
            } else {
                if (password === user.password) {
                    return done(null, user)
                } else {
                    return done(null, false, req.flash('error-message', 'Wrong Password'))
                }
            }
        })
};

const strategy = new LocalStrategy(costumeField, verifyCallback)
passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then(user => {
            done(null, user)
        })
})