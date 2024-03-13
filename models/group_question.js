const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/dtu_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const group_questionSchema = new mongoose.Schema({
    id: {type: String},
    knowledge_area: {
        id: {type: String},
        field: {type: String},
        area: {type: String}
    },
    birth_year: {type: Number},
    questions: [
        {
            knowledge_area: {type: String},
            content: {type: String},
            correct_answer: {type: String},
            difficulty_level: {type: Number}
        }
    ]
})

const GroupQuestion = mongoose.model("Question", group_questionSchema)
module.exports = GroupQuestion