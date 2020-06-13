const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

userSchema.method('verifyPassword', function(password) {
    if (this.password == password) {
        return true 
    } else {
        return false
    }
})


module.exports = mongoose.model('User', userSchema)