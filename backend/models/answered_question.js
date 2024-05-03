const mongoose = require("../connect/connect");
const Schema = mongoose.Schema;
const answeredQuestionSchema = mongoose.Schema({
    player: { 
        _id: {type: Schema.Types.ObjectId},
        degree: {type: Number}
    },
    questions: [{
        _id: {type: Schema.Types.ObjectId},
        timestamp: { type: Date }, // Thời gian bắt đầu đưa ra câu hỏi
        status: { type: Number }, // Trạng thái trả lời: 1 cho đúng, 0 cho sai
        timeForAnswer: { type: Number }, // Thời gian để trả lời câu hỏi (đơn vị: giây)
        difficulty: {type:Number}
    }],
    
});

// Đánh chung một index cho playerId và timestamp
answeredQuestionSchema.index({ playerId: 1, timestamp: 1 });
const AnsweredQuestion = mongoose.model("answered_question", answeredQuestionSchema);
module.exports = AnsweredQuestion;
