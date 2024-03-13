const Question = require("./question")
const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/dtu_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const question_evaluationSchema = new mongoose.Schema({
    id: {type: String},
    timestamp: {type: Date},
    question: {
        type: String,
        ref: Question
    },
    level: {type: String}

})
const QuestionEvaluation = mongoose.model("QuestionEvaluation", question_evaluationSchema)
module.exports = QuestionEvaluation