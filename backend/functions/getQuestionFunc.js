const mongoose = require('../connect/connect');
const Schema = mongoose.Schema;
const FunctionModel = require('../models/function')


// Model cho players và answered_questions
const PlayerModel = require("../models/player")
const AnsweredQuestionModel = require("../models/answered_question")

async function filterQuestionsByPreferences(playerId) {
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



async function saveFunction() {
    try {
        const functionDoc = new FunctionModel({
            _id: 'filterQuestionsByPreferences',
            value: filterQuestionsByPreferences.toString()
        });
        await functionDoc.save();
        console.log('Function "filterQuestionsByPreferences" saved successfully.');
    } catch (error) {
        console.error('Error saving function:', error);
    } finally {
        mongoose.disconnect();
    }
}

// Thực thi hàm saveFunction
saveFunction();
