const FunctionModel = require("../models/function");
const QuestionModel = require("../models/question"); // Import QuestionModel
const mongoose = require("../connect/connect");

async function getQuestionInfo(questionId) {
    try {
        // Truy vấn thông tin chi tiết của câu hỏi từ collection questions
        const question = await QuestionModel.findOne({ _id: questionId });

        if (!question) {
            throw new Error("Question not found");
        }

        // Trả về thông tin chi tiết của câu hỏi
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
            value: getQuestionInfo.toString() // Change to getQuestionInfo
        });
        await functionDoc.save();
        console.log('Function "getQuestionInfo" saved successfully.');
    } catch (error) {
        console.error('Error saving function:', error);
    } finally {
        mongoose.disconnect();
    }
}

// Thực thi hàm saveFunction
saveFunction();
