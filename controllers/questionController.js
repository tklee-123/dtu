const Question = require("../models/question")

const questionController = {
    addQuestion: async(req, res) => {
        
        try {
            const question = new Question({
                knowledge_area: req.knowledge_area,
                content: req.content,
                correct_answer: req.correct_answer,
                difficulty_level: req.difficulty_level
            })
            await question.save()
            res.status(201).json({ message: 'Question added successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error});
        }
    },
    evaluateQuestion: async(req,res) => {
        try {
            
        } catch (error) {
            
        }
    }
}
module.exports() = questionController
