const mongoose = require('../connect/connect');
const playerSchema = new mongoose.Schema({
    field: { // lĩnh vực người chơi chọn để chơi (chọn lĩnh vực nào thì sẽ được đưa ra câu hỏi thuộc lĩnh vực đó)
        type: String,
        require: true
    }, //đánh index chung cho 3 cái field, birth_year, occupation và level
    birth_year: {
        type: Number,
        require: true
    }, // năm sinh
    occupation: {type: String}, // nghề nghiệp
    full_name: {
        type: String,
        require: true

    }, // họ tên
    email: {
        type: String,
        require: true
        
    }, //email
    level: {type: Number}, // cấp độ hiện tại
    current_assessment_score: {type: Number}, // điểm tích lũy (cứ sau mỗi lượt chơi, hệ thống sẽ dựa vào kết quả để cho điểm người chơi)
    correct_ratio: {type: Number}, // tỉ lệ trả lời đúng
    played_round_count: {type: Number} // tổng số vòng chơi đã chơi
})
playerSchema.index({ 'field': 1, 'birth_year': 1, 'occupation': 1, 'level': 1 });
const Player = mongoose.model("Player", playerSchema)
module.exports = Player