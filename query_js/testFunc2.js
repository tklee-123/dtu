const FunctionModel = require("../models/function");
const QuestionModel = require("../models/question"); // Import QuestionModel
const mongoose = require("../connect/connect");

async function getQuestionInfo () {
    try {
        const functionDoc = await FunctionModel.findOne({ _id: 'getQuestionInfo' });
        if (!functionDoc) {
            console.log('Function not found.');
            return;
        }
        console.log("a")
        const getQuestionInfo = eval('(' + functionDoc.value + ')');
        const questionId = '6604e1d35327f48bea9c86ee';
        const result = await getQuestionInfo(questionId);
        res = {
            content: result.content,
            answers: result.answers,
            correct_answer: result.correct_answer,
            multimedia: result.multimedia

        }
        console.log(res)
    } catch (error) {
        console.error('Error using function:', error);
    } finally {
        console.log("Successfull")
        mongoose.disconnect();
    }
};

getQuestionInfo();