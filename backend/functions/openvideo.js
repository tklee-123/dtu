const { MongoClient, GridFSBucket } = require('mongodb');
const express = require('express');
const app = express();

// Kết nối tới MongoDB
const uri = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('dtu');
        const bucket = new GridFSBucket(database);

        // Route để phát video
        app.get('/video', async (req, res) => {
            const videoStream = bucket.openDownloadStreamByName('video.mp4');
            videoStream.pipe(res);
        });

        const port = 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

main().catch(console.error);
