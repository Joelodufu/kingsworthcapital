const User = require('../models/user');
const bcrypt = require('bcryptjs');
module.exports = {
    registerGet: (req, res) => {
        res.render('users/register', { csrfToken: req.csrfToken() })
    },

    registerPost: (req, res) => {
        User.find()
            .then(
                users => {
                    if (users.length < 1) {
                        const newUser = User(req.body);
                        newUser.isAdmin == true
                    } else {

                    }
                }
            )
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                req.flash('error-message', 'email exists try loggin in')
                res.redirect('/login')
            } else {
                const newUser = User(req.body);


                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success-message', 'you are now registered')
                            res.redirect('/login')
                        })
                    })

                })
            }

        })
    },

    loginGet: (req, res, next) => {
        res.render('users/login', { csrfToken: req.csrfToken() })
    },
    loginPost: (req, res, next) => {

    },
    deletUser: (req, res, next) => {
        User.findByIdAndDelete(req.params.id)
            .then(
                deletedUser => {
                    req.flash('success-message', `The User: ${deletedUser.firstName} ${deletedUser.lastName} has been deleted`)
                    res.redirect('/admin')
                }
            )
    },
    Checkadminpass: (req, res, next) => {
        User.findOne({ isAdmin: true })
            .exec()
            .then(
                admin => {
                    res.status(200).json(admin)
                }
            )
    }
}