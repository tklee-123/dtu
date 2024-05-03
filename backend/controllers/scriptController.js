const FileModel = require("../models/fsfile");
const { GridFSBucket } = require('mongodb');
const { MongoClient } = require('mongodb');
const { exec } = require("child_process");
const { ObjectId } = require('mongodb');
const { stdout } = require("process");
const QuestionModel = require("../models/question")
const mongoose = require("../connect/connect")
const AnsweredQuestionModel = require("../models/answered_question");
const { pipeline } = require("stream");
const Result = require("../models/result");
const Player = require("../models/player");
async function connectToMongoDB() {
    const uri = "mongodb+srv://admin:admin123@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to MongoDB");

        // Return the connected client
        return client;
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        throw e; // Throw error for handling in calling code
    }
}
const script = {
    getQuestionInfo: async (req, res) => {
        try {
            const questionId = new ObjectId(req.body.id);
            const result = await QuestionModel.findOne({_id: questionId})
            return res.status(200).json({
                content: result.content,
                answers: result.answers,
                correct_answer: result.correct_answer
            });
        } catch (error) {
            console.error('Error getting question info:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    getAnsweredQuestion: async (req, res) => {
        try {
            const playerId = new ObjectId(req.body.id);
            const playerInfo = await AnsweredQuestionModel.findOne({ 'player._id': playerId });
            if (!playerInfo) {
                return res.status(404).json({ error: 'Player information not found.' });
            }
            const questionIds = playerInfo.questions.map(question => question._id);
            return res.status(200).json({ questionIds });
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
    run: async (req, res) => {
        try {
            exec(`python D:/dtu/backend/DTU_demo_algo/generate_request.py`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing the Python script: ${error}`);
                    return res.status(500).send("Internal Server Error");
                }
                res.send("Players have already been recommended");
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
    },
    get_id: async (req, res) => {
        try {
            const number = req.body.number;
    
            const players = await Result.find({}, { _id: 1 });
            if (number < 0 || number >= players.length) {
                return res.status(400).json({ error: 'Invalid player number.' });
            }
            const playerId = players[number]._id;
            res.status(200).json({ player_id: playerId });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },
    
    get_recommended_question: async (req, res) => {
        try {
            console.log(req.params.id)
            const player_id = new ObjectId(req.params.id);
            const player = await Player.findOne({ "_id": player_id });
            const result = await Result.findOne({ '_id': player_id });
            console.log(player)
            const majority = player.major;
    
            if (!result) {
                return res.status(404).json({ error: 'Result not found for the player.' });
            }
    
            const questions = result.recommended_questions;
            const questionDetails = [];
    
            for (const questionId of questions) {
                const question = await QuestionModel.findById(questionId); 
                console.log(question)
                if (question) {
                    questionDetails.push({
                        "category": question.category,
                        "subcategory": question.subcategory,
                        "difficulty": question.difficulty,
                        "required_rank": question.required_rank
                    });
                }
            }
    
            res.status(200).json({
                "recommended_questions": questionDetails
            });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },
    get_nearest_player: async(req, res) => {
        try {
            const player_id =  new ObjectId(req.body.player_id);
            const result = await Result.findOne({"_id": player_id})
            if (!result) {
                return res.status(404).json({ error: 'Result not found for the player.' });
            }
            const nearest_player = result.nearest_player;
            res.status(200).json(nearest_player); 
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
       
    },
    get_infor: async(req, res) => {
        try {
            const player_id =  new ObjectId(req.params.id);
            const player = await Player.findOne({"_id": player_id})
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.status(200).json(player); 
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
    

    // process_loop: async(req, res) => {
    //     const rqs = req.body.rqs;
    //     const client = await connectToMongoDB();
    //     const playersCollection = client.db("dtu").collection("players");
    //     const players = 
    // }
    
};

module.exports = script;
