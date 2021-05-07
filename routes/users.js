var express = require('express');
var router = express.Router();
const registerControle = require('../controllers/registerController');
const passport = require('passport');
const { isAuth } = require('../config/customFunctions');
const User = require('../models/user');

router.all('*/', (req, res, next) => {
    req.app.locals.layout = 'users'
    next()
})


router.get('/', isAuth, (req, res, next) => {

    if (req.user.isAdmin) {
        //request comming from passport authentication... redirect admin's  request to admin profile
        res.redirect('/admin')
    } else {
        res.render('users/index', req.user)
        console.log(req.user);

    }



})



module.exports = router;