const Player = require('./models/player');
const AnsweredQuestion = require('./models/answered_question');
const mongoose = require("./connect/connect")
const getPlayerInfo = async (playerId) => {
    try {
        const start = performance.now(); // Thời gian bắt đầu truy vấn

        // Tìm thông tin của người chơi
        const playerInfo = await Player.findById(playerId)
            .select('field occupation birth_year level current_assessment_score played_round_count');

        if (!playerInfo) {
            throw new Error('Player not found');
        }

        // Tìm 100 câu trả lời gần đây nhất của người chơi
        const recentAnswers = await AnsweredQuestion.aggregate([
            { $match: { playerId: new mongoose.Types.ObjectId(playerId) } },
            { $unwind: '$questions' },
            { $sort: { 'questions.timestamp': -1 } },
            { $limit: 100 }
        ]);

        const end = performance.now(); // Thời gian kết thúc truy vấn
        const queryTime = end - start; // Thời gian thực thi truy vấn

        console.log('Query time:', queryTime, 'ms'); // In ra thời gian truy vấn

        return { playerInfo, recentAnswers };
    } catch (error) {
        console.error('Error fetching player info:', error);
        throw error;
    }
};
const playerId = '65f48b514a1e2489c5d4ec49'; // Đây là ID của người chơi
getPlayerInfo(playerId)
    .then(({ playerInfo, recentAnswers }) => {
        console.log('Player Info:', playerInfo);
        console.log('Recent Answers:', recentAnswers);
    })
    .catch(error => {
        console.error('Error:', error);
    });

