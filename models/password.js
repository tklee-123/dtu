const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/dtu_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const passwordSchema = new mongoose.Schema({
   id: {type: String},
   password: {type: String},
   hashcode: {type: String} 
})

const Password = mongoose.model("Password", passwordSchema)
module.exports = Password