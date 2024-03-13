const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/dtu_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const knowledge_areaSchema = new mongoose.Schema({
    
    id: {type: String},
    field: {type: String},
    area: {type: String}
})

const KnowledgeArea = mongoose.model("KnowledgeArea ", knowledge_areaSchema)
module.exports = KnowledgeArea