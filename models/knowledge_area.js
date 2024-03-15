const mongoose = require('../connect/connect');
const knowledge_areaSchema = new mongoose.Schema({
    field: {type: String},
    area: {type: String}
})

const KnowledgeArea = mongoose.model("KnowledgeArea ", knowledge_areaSchema)
module.exports = KnowledgeArea