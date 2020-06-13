const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async(req, res) => {
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

module.exports = router