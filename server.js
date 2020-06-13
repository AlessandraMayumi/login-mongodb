
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bodyParser = require("body-parser")

const indexRouter = require('./routes/index')
/*const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
*/

const app = express()
const port = 3000

// express config
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// passport Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// passport Strategies
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Incorrect username.' }) }
        if (!user.verifyPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
        return done(null, user);
      });
    }
))

// passport login
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//routes
app.use('/', indexRouter)
/*app.use('/login', loginRouter)
app.use('/register', registerRouter)
*/

const User = require('./models/user')

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async(req, res) => {
    try {
        let user = new User({
            username: req.body.username,
            email:req.body.email,
            password: req.body.password
        })
        await user.save()
        res.render('login')
    } catch (error) {
        res.redirect('/')
    }
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', 
    passport.authenticate('local', { 
        successRedirect: '/',
        successFlash: true,
        failureRedirect: '/register',
        //failureFlash: true
    })
)
/*
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/');
  });*/
  
// server

// mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mybrary', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB')
})

app.listen(port, () => {
    try {
        console.log(`Example app listening at http://localhost:${port}`)
    } catch (error) {
        console.log(error)
    }
})