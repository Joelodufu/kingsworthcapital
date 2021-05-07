var express = require('express');
var router = express.Router();
const Users = require('../models/user');
router.all('*/', (req, res, next) => {
    req.app.locals.layout = 'aboutlayout'


    next()
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('default/contact')
});
module.exports = router;