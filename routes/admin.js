var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { isAuth } = require('../config/customFunctions')
const { isAdmin } = require('../config/customFunctions')
const registerControle = require('../controllers/registerController');
const Users = require('../models/user');
router.all('*/', (req, res, next) => {
    req.app.locals.layout = 'admin'


    next()
})
router.delete('/delete/:id', registerControle.deletUser);
/* GET home page. */
router.get('/', isAuth, isAdmin, function(req, res, next) {
    Users
        .find()
        .lean()
        .then(users => {
            let allUsers = users.reverse()
            req.flash('success-message', 'Welcome to The Admin')
            res.render('admin/index', { allUsers: allUsers })
        })
});


module.exports = router;