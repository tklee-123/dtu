const FunctionModel = require("../models/function");
const PlayerModel = require("../models/player");
const QuestionModel = require("../models/question");
const Player = require("../models/player");
const Question = require("../models/question");
const AnsweredQuestionModel = require("../models/answered_question");
const GroupQuestionModel = require("../models/group_question");
const mongoose = require("../connect/connect");

const script = {
    createQuestionPool: async (req, res) => {
        try {
            const playerId = req.body._id;
            const functionDoc = await FunctionModel.findOne({ _id: 'filterQuestionsByPreferences' });
            if (!functionDoc) {
                console.log('Function not found.');
                return res.status(404).json({ error: 'Function not found.' });
            }
            const filterQuestionsByPreferencesFn = eval('(' + functionDoc.value + ')');
            const result = await filterQuestionsByPreferencesFn(playerId);
            await GroupQuestionModel.create({
                player_major: playerId,
                player_level: result.playerLevel,
                questions: result.questions
            });
            return res.status(200).json({ message: 'Question pool created successfully.' });
        } catch (error) {
            console.error('Error creating question pool:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    get_player_major_level: async (req, res) => {
        try {
            const playerId = req.account._id;
            const functionDoc = await FunctionModel.findOne({ _id: 'getUserPreferences' });
            if (!functionDoc) {
                console.log('Function not found.');
                return res.status(404).json({ error: 'Function not found.' });
            }
            const getUserPreferencesFn = eval('(' + functionDoc.value + ')');
            const result = await getUserPreferencesFn(playerId);
            return res.status(200).json({
                player_major: result.major,
                player_level: result.level
            });
        } catch (error) {
            console.error('Error getting player major level:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    getQuestionInfo: async (req, res) => {
        try {
            const questionId = req.body.id;
            const functionDoc = await FunctionModel.findOne({ _id: 'getQuestionInfo' });
            if (!functionDoc) {
                console.log('Function not found.');
                return res.status(404).json({ error: 'Function not found.' });
            }
            const getQuestionInfo = eval('(' + functionDoc.value + ')');
            const result = await getQuestionInfo(questionId);
            return res.status(200).json({
                content: result.content,
                answers: result.answers,
                correct_answer: result.correct_answer,
                multimedia: result.multimedia
            });
        } catch (error) {
            console.error('Error getting question info:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    deleteOldQuestions: async (req, res) => {
        try {
            const playerId = req.body._id;
            const playerQuestions = await AnsweredQuestionModel.findOne({ playerId });
            if (playerQuestions) {
                if (playerQuestions.questions.length > 100) {
                    playerQuestions.questions = playerQuestions.questions.slice(-100);
                    await playerQuestions.save();
                    console.log("Old data has been successfully deleted.");
                } else {
                    console.log("No need to delete data.");
                }
            } else {
                console.log("Player information not found.");
            }
            return res.status(200).json({ message: 'Old questions deleted successfully.' });
        } catch (error) {
            console.error("Error deleting old questions:", error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },
    getAnsweredQuestion: async(req, res) => {
        try {
            const playerId = req.body.playerId;
            const playerInfo = await AnsweredQuestionModel.findOne({ playerId: playerId });
            if (!playerInfo) {
                return res.status(404).json({ error: 'Player information not found.' });
            }
            return res.status(200).json({ playerInfo });
        } catch (error) {
            console.error('Error retrieving player information:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
};

module.exports = script;
