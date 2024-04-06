const mongoose = require('../connect/connect');
const Schema = mongoose.Schema;

const roundSchema = new mongoose.Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    },
    start_time: { type: Date },
    questions: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    end_time: { type: Date },
    correct_ratio: { type: Number }
});

const Round = mongoose.model("Round", roundSchema);
module.exports = Round;
