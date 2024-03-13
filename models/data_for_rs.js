const Player = require("./player")
const Round = require("./round")
const KnowledgeArea = require("./knowledge_area")
const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/dtu_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const dataSchema = new mongoose.Schema({
    player: {
        type: String, 
        ref: Player
    },
    round: {
        type: String,
        ref: Round
    },
    current_correct_ratio: {
        type: Number
    },
    knowledge_stats: [
        {
            knowledge_area: {
                type: String, 
                ref: KnowledgeArea
            },
            round: {type: String},
            number_of_correct_answers: {type: Number},
            number_of_incorrect_answers: {type: Number},
            current_correct_ratio: {type: Number}
        }
    ]
})

const Data_RS = mongoose.model("Data_RS", dataSchema)
module.exports = Data_RS