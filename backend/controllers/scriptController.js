const FunctionModel = require("../models/function");
const PlayerModel = require("../models/player");
const QuestionModel = require("../models/question");
const Player = require("../models/player");
const Question = require("../models/question");
const AnsweredQuestionModel = require("../models/answered_question");
const GroupQuestionModel = require("../models/group_question");
const mongoose = require("../connect/connect");
const FileModel = require("../models/fsfile");
const { GridFSBucket } = require('mongodb');
const { exec } = require("child_process");

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
            const playerId = req.body._id;
            const functionDoc = await FunctionModel.findOne({ _id: 'getUserPreferences' });
            if (!functionDoc) {
                console.log('Function not found.');
                return res.status(404).json({ error: 'Function not found.' });
            }
            const getUserPreferencesFn = eval('(' + functionDoc.value + ')');
            const result = await getUserPreferencesFn(playerId);
            return res.status(200).json({
                player_major: result.major,
                player_level: result.level,
                playerId: playerId
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
    },
    openVideo: async (req, res) => {
        try {
            const questionId = req.body.question_id;
            const question = await QuestionModel.findById(questionId);
            if (!question) {
                return res.status(404).json({ error: 'Question not found.' });
            }
            if (!question.multimedia) {
                return res.status(404).json({ error: 'Video not found for this question.' });
            }
    
            const videoObjectId = question.multimedia;
            const file = await FileModel.findOne({ _id: videoObjectId });
            if (!file) {
                return res.status(404).json({ error: 'Video file not found.' });
            }
    
            const videoFileName = file.filename;
            const db = mongoose.connection;
            const bucket = new GridFSBucket(db.db);
            const videoStream = bucket.openDownloadStreamByName(videoFileName);
            res.set('Content-Type', 'video/mp4');
            videoStream.pipe(res);
            videoStream.on('error', error => {
                console.error('Error opening video stream:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    
        } catch (error) {
            console.error('Error opening video:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    runAlgorithm: async (req, res) => {
        try {
            const playerId = req.account._id.toString();
            exec(`python ./codePython/algorithms/get_recommended_questions.py ${playerId}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing the Python script: ${error}`);
                    return res.status(500).send("Internal Server Error");
                }
                res.send(stdout);
            });
        } catch (error) {
            console.error('Error running algorithm:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },
    insertData: async(req, res) => {
        try {
            exec(`python ./codePython/algorithms/insert_rq.py`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing the Python script: ${error}`);
                    return res.status(500).send("Internal Server Error");
                }
                res.send("Insert successfully");
            });
        } catch (error) {
            console.error('Error running algorithm:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
};

module.exports = script;
