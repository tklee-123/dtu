const mongoose = require('../connect/connect');
const questionSchema = new mongoose.Schema({
    knowledge_area: { // câu hỏi thuộc khối kiến thức nào
        field: {type: String}, // tên lĩnh vực
        area: {type: String} // tên khối kiến thức
    },
    content: {
        type: String, // nội dung câu hỏi
        required: true
    },
    answers: [{
        type: String // 4 câu trả lời
    }],
    correct_answer: {type: String}, //câu trả lời đúng
    difficulty_level: {
        type: Number // độ khó dễ
    },
    language: {type: Number} // ngôn ngữ 
})

const Question = mongoose.model("Question", questionSchema)
module.exports = Question