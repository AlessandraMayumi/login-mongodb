
const express = require('express')
const app = express()
const port = 3000

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

// express
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mybrary', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB')
});

//routes
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

// server
app.listen(port)