const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/dtu_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const evaluatorSchema = new mongoose.Schema({
    id: {type: String},
    field: {
        type: String,
        require: true
    },
    birth_year: {
        type: Number,
        require: true
    },
    full_name: {
        type: String,
        require: true

    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    account: {
        username: {type: String},
        password: {
            type: String
        }
    }
})

const Evaluator = mongoose.model("Evaluator", evaluatorSchema)
module.exports = Evaluator