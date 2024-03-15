const Player = require("./player")
const Question = require("./question")
const mongoose = require('../connect/connect');
const roundSchema = new mongoose.Schema({
    player: {
        type: Object, // id của người chơi
        ref: Player
    },
    start_time: {type: String}, // thời gian bắt đầu lượt chơi
    questions: [ // các câu hỏi đã được đưa ra trong lượt chơi đó, mỗi round có 10 câu hỏi
        {
            _id: {
                type: Object,
                ref: Question
            }
        }
    ],
    end_time: {type: String}, // thời gian kết thúc lượt chơi
    correct_ratio: {type: Number} // tỷ lệ trả lời đúng
})

const Round = mongoose.model("Round", roundSchema)
module.exports = Round