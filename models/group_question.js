const mongoose = require('../connect/connect');
const groupQuestionSchema = new mongoose.Schema({
    knowledge_area: {
        field: {type: String}, // tên lĩnh vực mà người chơi chọn sẽ chơi
        area: {type: String} // tên của khối kiến thức nhỏ nằm trong lĩnh vực đó
    }, //đánh index chung cho id của knowledge_area và level
    level: {type: Number}, // level của câu hỏi (chú ý câu hỏi ở level nào thì sẽ được đưa ra cho người chơi ở level đó)
    questions: [
        {
            content: {type: String}, //nội dung câu hỏi
            answers: [{type: String}], // nội dung các câu trả lời tương ứng để người chơi chọn (4 đáp án trắc nghiệm)
            correct_answer: {type: String}, // nội dung câu trả lời đúng
            image: {type: Buffer} // ảnh(nếu có) của câu hỏi
        }
    ]
})
groupQuestionSchema.index({ 'knowledgeArea.field': 1, 'knowledgeArea.area': 1, 'level': 1 });
const GroupQuestion = mongoose.model("GroupQuestion", groupQuestionSchema)
module.exports = GroupQuestion