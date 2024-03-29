const mongoose = require("../connect/connect");
const Schema = mongoose.Schema;
const FunctionSchema = new Schema({
    _id: String,
    value: String
});

// Tạo model từ schema
const FunctionModel = mongoose.model('Function', FunctionSchema);
module.exports = FunctionModel