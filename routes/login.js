const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', async(req, res) => {
    try {
        res.send('successful login')
    } catch (error) {
        res.redirect('/')
    }
})

module.exports = router