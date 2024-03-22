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
groupQuestionSchema.index({ 'knowledgeArea.field': 1, 'knowledgeArea.area': 1, 'level': 1 });
const GroupQuestion = mongoose.model("GroupQuestion", groupQuestionSchema)
module.exports = GroupQuestion