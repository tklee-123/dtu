const mongoose = require('../connect/connect');
const questionSchema = new mongoose.Schema({
    category: {type: String},
    subcategory: {type: String},
    content: {
        type: String, // nội dung câu hỏi
        required: true
    },
    answers: [{
        type: String // 4 câu trả lời
    }],
    correct_answer: {type: String}, //câu trả lời đúng
    difficulty: {
        type: Number // độ khó dễ
    },
    required_rank: {type: Number},
    language: {type: Number}, // ngôn ngữ 
    multimedia: {type: String}
})
questionSchema.index({ 'category': 1, 'difficulty': 1});
const Question = mongoose.model("Question", questionSchema, "questions")
module.exports = Question