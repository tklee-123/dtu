const Player = require("./player")
const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/dtu_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const roundSchema = new mongoose.Schema({
    id: {type: String},
    player: {
        type: String,
        ref: Player
    },
    start_time: {type: String},
    questions: [
        {
            knowledge_area: {type: String},
            content: {type: String},
            correct_answer: {type: String},
            difficulty_level: {type: Number}
        }
    ],
    end_time: {type: String},
    correctly_answered_questions: [
        {
            knowledge_area: {type: String},
            content: {type: String},
            correct_answer: {type: String},
            difficulty_level: {type: Number},
            time_for_answer: {type: Number}
        }
    ],
    incorrectly_answered_questions: [
        {
            knowledge_area: {type: String},
            content: {type: String},
            correct_answer: {type: String},
            difficulty_level: {type: Number},
            time_for_answer: {type: Number}
        }
    ],
    correct_ratio: {type: Number}
})

const Round = mongoose.model("Round", roundSchema)
module.exports = Round