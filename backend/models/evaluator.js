const mongoose = require('../connect/connect');
const evaluatorSchema = new mongoose.Schema({
    field: {
        type: String,
        require: true
    }, //lĩnh vực chuyên môn của người đánh giá
    birth_year: {
        type: Number,
        require: true
    }, // năm sinh
    full_name: {
        type: String,
        require: true

    }, // họ tên
    email: {
        type: String,
        require: true,
    } //email
})

const Evaluator = mongoose.model("Evaluator", evaluatorSchema)
module.exports = Evaluator