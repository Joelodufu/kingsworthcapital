var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('express-handlebars');
const { selectOption } = require('./config/customFunctions');
const { globalVariables } = require('./config/configuration');
const mongoose = require('mongoose');
const configuration = require('./config/configuration');
const flash = require('connect-flash');
const passport = require('passport');
const crypto = require('crypto');
const session = require('express-session');
const methordOveride = require('method-override')

const mongoStore = require('connect-mongo')(session)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');


var app = express();
//mongoose connection
mongoose.connect(process.env.MONGO_URL)
    .then(responds => {
        console.log('Mongodb Connected succesfully');
    })
    .catch(
        responds => {
            console.log('Database Connections failed');
        })




// view engine setup
app.engine('handlebars', hbs({ defaultLayout: 'default', helpers: { helpers: selectOption } }));
app.set('view engine', 'handlebars');

/**Use Methord Overide Middlewere */
app.use(methordOveride('newMethod'));

app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Session Store */
const sessionStore = new mongoStore({
    mongooseConnection: mongoose.createConnection(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }),
    collection: 'sessions'
});

/**Using Flash And Session */
app.use(session({
    secret: 'TheBasics',
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(flash());

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.login = req.isAuthenticated()
    if (req.user) {

        //MAKE Admin Property of a user a global variable
        app.locals.admin = req.user.isAdmin
    }

    next()
})

app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/', indexRouter);
app.use(globalVariables);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;