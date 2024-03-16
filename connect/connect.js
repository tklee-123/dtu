const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/dtu'; // Thay đổi địa chỉ IP nếu cần

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
