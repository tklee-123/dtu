const FunctionModel = require("../models/function");
const QuestionModel = require("../models/question"); // Import QuestionModel
const mongoose = require("../connect/connect");

async function getQuestionInfo(questionId) {
    try {
        const question = await QuestionModel.findOne({ _id: questionId });

        if (!question) {
            throw new Error("Question not found");
        }
        return {
            content: question.content,
            answers: question.answers,
            correct_answer: question.correct_answer,
            multimedia: question.multimedia
        };
    } catch (err) {
        console.error("Error getting question info:", err);
        throw err;
    }
}

async function saveFunction() {
    try {
        const functionDoc = new FunctionModel({
            _id: 'getQuestionInfo',
            value: getQuestionInfo.toString() 
        });
        await functionDoc.save();
        console.log('Function "getQuestionInfo" saved successfully.');
    } catch (error) {
        console.error('Error saving function:', error);
    } finally {
        mongoose.disconnect();
    }
}
saveFunction();
