const Player = require('./models/player');
const AnsweredQuestion = require('./models/answered_question');
const mongoose = require("./connect/connect");
const async = require('async');

const getPlayerInfo = async (playerId) => {
    try {
        const playerInfo = await Player.findById(playerId)
            .select('field occupation birth_year level current_assessment_score played_round_count');

        if (!playerInfo) {
            throw new Error('Player not found');
        }

        const recentAnswers = await AnsweredQuestion.aggregate([
            { $match: { playerId: new mongoose.Types.ObjectId(playerId) } },
            { $unwind: '$questions' },
            { $sort: { 'questions.timestamp': -1 } },
            { $limit: 100 }
        ]);

        return { playerInfo, recentAnswers };
    } catch (error) {
        console.error('Error fetching player info:', error);
        throw error;
    }
};

const NUM_REQUESTS = 20000; 
const playerId = '65f48b514a1e2489c5d4ec49'; 

const processRequest = async () => {
    try {
        await getPlayerInfo(playerId);
    } catch (error) {
        console.error('Error:', error);
    }
};

const queue = async.queue(processRequest, 100); // Thực hiện tối đa 100 request cùng lúc
for (let i = 0; i < NUM_REQUESTS; i++) {
    queue.push();
}

queue.drain(() => {
    console.log(`All ${NUM_REQUESTS} requests have been processed.`);
    process.exit(0); 
});
