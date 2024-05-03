const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:admin123@cluster0.jmil5cr.mongodb.net/dtu?retryWrites=true&w=majority&appName=Cluster0'; 
// const uri = 'mongodb://0.0.0.0:27017/dtu'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
