const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/dtu_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const questionSchema = new mongoose.Schema({
    id: {type: String},
    knowledge_area: {
        id: {type: String},
        field: {type: String},
        area: {type: String}
    },
    content: {
        type: String,
        required: true
    },
    correct_answer: {type: String},
    difficulty_level: {
        type: Number
    }
})

const Question = mongoose.model("Question", questionSchema)
module.exports = Question