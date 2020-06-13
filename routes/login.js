const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
    res.render('login')
})
/*
router.post('/login',
    passport.authenticate('local'),
        function(req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            // res.redirect('/users/' + req.user.username);
            
        }
);
*/
router.post('/login', 
    passport.authenticate('local', { 
        successRedirect: '/',
        successFlash: 'Welcome!',
        failureRedirect: '/login',
        failureFlash: 'Invalid username or password.'
    })
)




module.exports = router