const bcrypt = require('bcryptjs')

module.exports = {

    selectOption: function(status, options) {

        return options.fn(this).replace(new RegExp('value=\"' + status + '\"'), '$&selected="selected"');
    },

    isEmpty: function(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    },

    validPassword: (password, hash) => {
        bcrypt.compare(password, hash, (err, passwordMatched) => {
            if (err) {
                return err
            }
            return passwordMatched
        })
    },
    genPassword: (password) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash, ) => {
                return hash
            })
        })
    },
    isAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            req.flash('error-message', 'You must login')
            res.redirect('/login')
        }


    },
    notAuth: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next()
        } else {
            req.flash('error-message', 'You must login')
            res.redirect('/users')
        }


    },
    isAdmin: (req, res, next) => {
        if (req.user.isAdmin) {
            next()
        } else {
            req.flash('error-message', 'You are not an admin')
            res.redirect('/users')
        }


    }
}