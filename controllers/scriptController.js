const FunctionModel = require("../models/function")
const Player = require("../models/player")
const QuestionModel = require("../models/question")
const AnsweredQuestionModel = require("../models/answered_question")
const GroupQuestionModel = require("../models/group_question"); 
const script = {

    createQuestionPool : async(req,res) => {
        try {
            const playerId = req.account._id;
            const functionDoc = await FunctionModel.findOne({ _id: 'filterQuestionsByPreferences' });
            if (!functionDoc) {
                console.log('Function not found.');
                return;
            }
            const filterQuestionsByPreferencesFn = eval('(' + functionDoc.value + ')');
            // const playerId = "65fd0f645f411276c47a0347";
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
    },
    get_player_major_level: async(req,res) => {
        try {
            const playerId = req.account._id;
            const functionDoc = await FunctionModel.findOne({ _id: 'getUserPreferences' });
            if (!functionDoc) {
                console.log('Function not found.');
                return;
            }
            const getUserPreferencesFn = eval('(' + functionDoc.value + ')');
            // const playerId = "65fd0f645f411276c47a0347";
            const result = await getUserPreferencesFn(playerId);
            return({
                player_major: result.major,
                player_level: result.level
            })
        } catch (error) {
            console.error('Error using function:', error);
        } finally {
            mongoose.disconnect();
        }
        
    },
    getQuestionInfo: async(req,res) => {
        try {
            const playerId = req.account._id;
            const functionDoc = await FunctionModel.findOne({ _id: 'getUserPreferences' });
            if (!functionDoc) {
                console.log('Function not found.');
                return;
            }
            const getUserPreferencesFn = eval('(' + functionDoc.value + ')');
            // const playerId = "65fd0f645f411276c47a0347";
            const result = await getUserPreferencesFn(playerId);
            return({
                player_major: result.major,
                player_level: result.level
                
            })
        } catch (error) {
            console.error('Error using function:', error);
        } finally {
            mongoose.disconnect();
        } 
    },
    deleteOldQuestions: async(req,res) => {
        try {
            const playerId = req.body._id;
            const playerQuestions = await AnsweredQuestionModel.findOne({ playerId });
    
            if (playerQuestions) {
                if (playerQuestions.questions.length > 100) {
                    playerQuestions.questions = playerQuestions.questions.slice(-100);
                    await playerQuestions.save();
                    console.log("Dữ liệu cũ đã được xóa thành công.");
                } else {
                    console.log("Không cần xóa dữ liệu.");
                }
            } else {
                console.log("Không tìm thấy thông tin của người chơi.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu cũ:", error);
        }

    }
}
module.exports = script