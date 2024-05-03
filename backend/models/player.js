const mongoose = require('../connect/connect');
const playerSchema = new mongoose.Schema({
    major: [{ 
        type: String,
        require: true
    }], 
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
        require: true
        
    }, 
    degree: {type: Number}, 
    account: {
        username: {type: String},
        passwword: {type: String}
    }
})
const Player = mongoose.model("Player", playerSchema)
module.exports = Player