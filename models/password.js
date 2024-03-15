const mongoose = require('../connect/connect');
const passwordSchema = new mongoose.Schema({
   password: {type: String}, //password khi đăng kí của người chơi
   hashcode: {type: String} // password đó được chuyển đổi thành 1 mã băm để tránh lộ thông tin
})

const Password = mongoose.model("Password", passwordSchema)
module.exports = Password