const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/dtu_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const playerSchema = new mongoose.Schema({
    field: {
        type: String,
        require: true
    },
    birth_year: {
        type: Number,
        require: true
    },
    occupation: {type: String},
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
    },
    level: {type: String},
    current_assessment_score: {type: Number},
    total_correct_answer: {type: Number},
    played_round_count: {type: Number}
})

const Player = mongoose.model("Player", playerSchema)
module.exports = Player