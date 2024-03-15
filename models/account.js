const mongoose = require('../connect/connect')
const Password = require('./password')
const accountSchema = mongoose.Schema({
    id: {type: Object}, // là id của người chơi hoặc người đánh giá
    username: {type: String}, //tên tài khoản
    password: {
        type: String,
        ref: Password
    }, 
    role: {type: String} // vai trò, là người chơi hay người đánh giá
})
const Account = mongoose.model("Account", accountSchema)
module.exports = Account