const mongoose = require('../connect/connect');
const groupQuestionSchema = new mongoose.Schema({
    player_major: {type: String},
    player_level: {type: Number},
    questions: [
        {
            _id: {type: mongoose.Schema.Types.ObjectId},
            difficulty: {type: Number}
        }
    ]
})
groupQuestionSchema.index({ 'player_major': 1, 'player_level': 1 });
const GroupQuestion = mongoose.model("Group_Question", groupQuestionSchema)
module.exports = GroupQuestion