const mongoose = require("../connect/connect");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'Player' }, 
    recommended_questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    player_ability: {type: Number},
    recommendedation_status: {type: Number}
});
const Result = mongoose.model("Result", resultSchema, "results");
module.exports = Result;
