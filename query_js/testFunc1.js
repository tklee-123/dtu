const mongoose = require("../connect/connect");
const PlayerModel = require("../models/player")
const QuestionModel = require("../models/question")
const AnsweredQuestionModel = require("../models/answered_question")
const GroupQuestionModel = require("../models/group_question"); // Import model for group_question
const FunctionModel = require("../models/function")


// Lấy hàm từ MongoDB và sử dụng
async function useFunction() {
    try {
        // Tìm kiếm hàm trong collection và lấy ra
        const functionDoc = await FunctionModel.findOne({ _id: 'filterQuestionsByPreferences' });
        if (!functionDoc) {
            console.log('Function not found.');
            return;
        }

        // Biên dịch và thực thi hàm
        const filterQuestionsByPreferencesFn = eval('(' + functionDoc.value + ')');

        // Giả sử có một người chơi với ID là playerId
        const playerId = "65fd0f645f411276c47a0347";

        // Gọi hàm filterQuestionsByPreferences để lấy danh sách các câu hỏi phù hợp
        const result = await filterQuestionsByPreferencesFn(playerId);

        // Lưu kết quả vào collection group_question
        await GroupQuestionModel.create({
            player_major: playerId,
            player_level: result.playerLevel,
            questions: result.questions
        });
    } catch (error) {
        console.error('Error using function:', error);
    } finally {
        mongoose.disconnect();
    }
}

// Thực thi hàm useFunction
useFunction();
