const Question = require("./question")
const Evaluator = require("./evaluator")
const mongoose = require('../connect/connect');
const Schema = mongoose.Schema;
const question_evaluationSchema = new mongoose.Schema({
    timestamp: {type: Date}, // thời gian khi người đánh giá bắt đầu chọn câu hỏi để đánh giá
    question: { 
        type: Schema.Types.ObjectId, // id của câu hỏi
        ref: Question
    },
    evaluator: {
        type: Schema.Types.ObjectId, 
        ref: Evaluator
    },
    level: {type: Number} // người đánh giá xếp câu hỏi vào cấp độ mấy
})
const QuestionEvaluation = mongoose.model("QuestionEvaluation", question_evaluationSchema)
module.exports = QuestionEvaluation