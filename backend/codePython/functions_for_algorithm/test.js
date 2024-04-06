const { MongoClient } = require('mongodb');

// MongoDB Connection URI
const uri = 'mongodb://0.0.0.0:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Database and collection
        const database = client.db('dtu');
        const collection = database.collection('players');

        // Aggregation pipeline
        const pipeline = [
            {
                $project: {
                    _id: 1,
                    major: 1,
                    birth_year: 1,
                    occupation: 1,
                    full_name: 1,
                    email: 1,
                    level: 1,
                    current_assessment_score: 1,
                    correct_ratio: 1,
                },
            },
            {
                $group: {
                    _id: '$major', // Grouping by major
                    players: { $push: '$$ROOT' }, // Storing documents belonging to each major in an array
                },
            }
        ];

        // Execute aggregation pipeline
        const result = await collection.aggregate(pipeline).toArray();
        console.log(result); // Log the result
    } finally {
        // Close the connection
        await client.close();
    }
}

// Run the main function
main().catch(console.error);
