const mongoose = require("../connect/connect");

const answeredQuestionSchema = mongoose.Schema({
    playerId: { type: mongoose.Schema.Types.ObjectId}, // Id của người chơi
    questions: [{
        type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến các câu hỏi
        ref: 'Question' // Tên của model chứa các câu hỏi
    }],
    timestamp: { type: Date }, // Thời gian bắt đầu đưa ra câu hỏi
    status: { type: Number }, // Trạng thái trả lời: 1 cho đúng, 0 cho sai
    timeForAnswer: { type: Number } // Thời gian để trả lời câu hỏi (đơn vị: giây)
});

// Đánh chung một index cho playerId và timestamp
answeredQuestionSchema.index({ playerId: 1, timestamp: 1 });

const AnsweredQuestion = mongoose.model("AnsweredQuestion", answeredQuestionSchema);
module.exports = AnsweredQuestion;
