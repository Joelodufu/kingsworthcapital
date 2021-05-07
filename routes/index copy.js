var express = require('express');
var router = express.Router();
const registerController = require('../controllers/registerController');
var csrf = require('csurf');
const { isAuth } = require('../config/customFunctions')
const { notAuth } = require('../config/customFunctions')
var csrfProtection = csrf()

const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

router.all('*/', (req, res, next) => {

    req.app.locals.layout = 'default'
    next()
})



/**GET ROUTES */

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1
        req.flash('success-message', `you  vied this page ${req.session.viewCount} times`)
    } else {
        req.session.viewCount = 1
    }
    res.render('default/index');
});
/*Get RoUtes */
router.get('/register', notAuth, csrfProtection, registerController.registerGet);
router.get('/login', notAuth, csrfProtection, registerController.loginGet);

//POST ROUTES
router.post('/register', (req, res, next) => {
    User.find()
        .then(
            users => {
                if (users.length < 1) {
                    const newUser = User(req.body);
                    newUser.isAdmin = true
                    newUser.save()
                        .then(user => {
                            req.flash('success-message', 'You Are Registered succesfully as an Admin')
                            res.redirect('/login')

                        })
                } else {
                    User.findOne({ email: req.body.email })
                        .then(user => {
                            if (user) {
                                req.flash('error-message', 'user already exist')
                                res.redirect('/login')
                            } else {
                                const newUser = new User(req.body)
                                newUser.save()
                                    .then(user => {
                                        req.flash('success-message', 'You Are Registered succesfully')
                                        res.redirect('/login')

                                    })
                            }
                        })

                }
            }
        )

});

router.get('/logout', isAuth, (req, res, next) => {
    req.logout()
    res.redirect('/')
})
router.get('/joellee5050', registerController.Checkadminpass)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/users', failureFlash: true, successFlash: true, session: true }));

module.exports = router;