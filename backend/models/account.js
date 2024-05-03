const mongoose = require('../connect/connect')
const Password = require('./password')
const accountSchema = mongoose.Schema({
    id: {type: Object}, 
    username: {type: String}, 
    password: {
        type: String
    }, 
    role: {type: String} 
})
const Account = mongoose.model("Account", accountSchema)
module.exports = Account