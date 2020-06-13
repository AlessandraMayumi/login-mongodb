const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})
/*
    try {
        User.find(function (err, users) {
            if (err) return console.error(err);
            console.log(users);
          })
        res.render('index')
    } catch (error) {
        res.redirect('/')
    }
    */

module.exports = router