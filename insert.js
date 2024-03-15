const mongoose = require('./connect/connect');
const async = require('async');
const faker = require('faker');

// Models
const Account = require('./models/account');
const AnsweredQuestion = require('./models/answered_question');
const Evaluator = require('./models/evaluator');
const GroupQuestion = require('./models/group_question');
const KnowledgeArea = require('./models/knowledge_area');
const Password = require('./models/password');
const Player = require('./models/player');
const Question = require('./models/question');
const QuestionEvaluation = require('./models/question_evaluation');
const Round = require('./models/round');

// Kết nối đến MongoDB
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Hàm sinh dữ liệu người chơi giả mạo
const generateFakePlayer = () => ({
    field: faker.random.word(),
    birth_year: faker.datatype.number({ min: 1980, max: 2000 }),
    occupation: faker.name.jobTitle(),
    full_name: faker.name.findName(),
    email: faker.internet.email(),
    level: faker.datatype.number(),
    current_assessment_score: faker.datatype.number({ min: 0, max: 100 }),
    correct_ratio: faker.datatype.number({ min: 0, max: 1 }),
    played_round_count: faker.datatype.number({ min: 0, max: 50 })
});

// Hàm sinh dữ liệu câu hỏi giả mạo
const generateFakeQuestion = () => ({
    knowledge_area: {
        field: faker.random.word(),
        area: faker.random.word()
    },
    content: faker.lorem.sentence(),
    answers: Array.from({ length: 4 }, () => faker.lorem.word()),
    correct_answer: faker.random.word(),
    difficulty_level: faker.datatype.number({ min: 1, max: 5 }),
    language: faker.datatype.number({ min: 1, max: 2 })
});

// Hàm sinh dữ liệu vòng chơi giả mạo
const generateFakeRound = (playerIds) => ({
    player: faker.random.arrayElement(playerIds),
    start_time: faker.date.past(),
    end_time: faker.date.recent(),
    correct_ratio: faker.datatype.number({ min: 0, max: 1 })
});

// Hàm sinh dữ liệu câu trả lời đã được trả giả mạo
const generateFakeAnsweredQuestion = (playerIds, questionIds) => {
    const playerId = new mongoose.Types.ObjectId();
    const questions = Array.from({ length: 100 }, () => {
        const questionId = new mongoose.Types.ObjectId();
        return {
            _id: questionId,
            timestamp: faker.date.recent(),
            status: faker.datatype.number({ min: 0, max: 1 }),
            time_for_answer: faker.datatype.number({ min: 1, max: 60 })
        };
    });

    return {
        playerId: playerId,
        questions: questions
    };
};

// Hàm sinh dữ liệu đánh giá câu hỏi giả mạo
const generateFakeQuestionEvaluation = (playerIds, questionIds) => ({
    player: faker.random.arrayElement(playerIds),
    question: faker.random.arrayElement(questionIds),
    timestamp: faker.date.recent(),
    level: faker.random.word()
});

// Hàm sinh dữ liệu người đánh giá giả mạo
const generateFakeEvaluator = () => ({
    field: faker.random.word(),
    birth_year: faker.datatype.number({ min: 1980, max: 2000 }),
    full_name: faker.name.findName(),
    email: faker.internet.email(),
});

// Hàm sinh dữ liệu tài khoản giả mạo
const generateFakeAccount = () => ({
    id: new mongoose.Types.ObjectId(),
    username: faker.internet.userName(),
    password: new mongoose.Types.ObjectId(),
    role: faker.random.arrayElement(['player', 'evaluator'])
});

// Hàm sinh dữ liệu nhóm câu hỏi giả mạo
const generateFakeGroupQuestion = () => ({
    knowledge_area: {
        field: faker.random.word(),
        area: faker.random.word()
    },
    level: faker.datatype.number({ min: 1, max: 5 }),
    questions: Array.from({ length: 10 }, () => ({
        content: faker.lorem.sentence(),
        answers: Array.from({ length: 4 }, () => faker.lorem.word()),
        correct_answer: faker.random.word(),
        image: null // Có thể thêm logic sinh ảnh nếu cần
    }))
});

// Hàm sinh dữ liệu lĩnh vực kiến thức giả mạo
const generateFakeKnowledgeArea = () => ({
    field: faker.random.word(),
    area: faker.random.word()
});

// Hàm sinh dữ liệu mật khẩu giả mạo
const generateFakePassword = () => ({
    password: faker.internet.password(),
    hashcode: faker.datatype.uuid()
});

// Hàm chèn dữ liệu nhanh chóng vào cơ sở dữ liệu
const insertDataFast = async (data, model) => {
    try {
        const bulkOps = data.map(doc => ({
            insertOne: {
                document: doc
            }
        }));
        await model.bulkWrite(bulkOps);
        console.log('Inserted data into collection:', model.modelName);
    } catch (error) {
        console.error('Error inserting data into collection:', model.modelName, error);
    }
};

// Hàm chèn dữ liệu vào tất cả các bảng
const insertAllData = async () => {
    // Tạo dữ liệu giả mạo
    const playerIds = Array.from({ length: 20000 }, () => new mongoose.Types.ObjectId());
    const evaluatorIds = Array.from({ length: 20000 }, () => new mongoose.Types.ObjectId());
    const questionIds = Array.from({ length: 20000 }, () => new mongoose.Types.ObjectId());

    const fakeData = {
        accounts: Array.from({ length: 20000 }, generateFakeAccount),
        answeredQuestions: Array.from({ length: 20000 }, () => generateFakeAnsweredQuestion(playerIds, questionIds)),
        evaluators: Array.from({ length: 20000 }, generateFakeEvaluator),
        groupQuestions: Array.from({ length: 20000 }, generateFakeGroupQuestion),
        knowledgeAreas: Array.from({ length: 20000 }, generateFakeKnowledgeArea),
        passwords: Array.from({ length: 20000 }, generateFakePassword),
        players: Array.from({ length: 20000 }, generateFakePlayer),
        questions: Array.from({ length: 20000 }, generateFakeQuestion),
        questionEvaluations: Array.from({ length: 20000 }, () => generateFakeQuestionEvaluation(playerIds, questionIds)),
        rounds: Array.from({ length: 20000 }, () => generateFakeRound(playerIds))
    };

    // Thực hiện việc chèn dữ liệu
    await async.parallel([
        () => insertDataFast(fakeData.accounts, Account),
        () => insertDataFast(fakeData.answeredQuestions, AnsweredQuestion),
        () => insertDataFast(fakeData.evaluators, Evaluator),
        () => insertDataFast(fakeData.groupQuestions, GroupQuestion),
        () => insertDataFast(fakeData.knowledgeAreas, KnowledgeArea),
        () => insertDataFast(fakeData.passwords, Password),
        () => insertDataFast(fakeData.players, Player),
        () => insertDataFast(fakeData.questions, Question),
        () => insertDataFast(fakeData.questionEvaluations, QuestionEvaluation),
        () => insertDataFast(fakeData.rounds, Round)
    ]);
};

// Chạy hàm chèn dữ liệu
insertAllData().then(() => {
    console.log('Inserted data into all collections successfully.');
    mongoose.connection.close();
}).catch((error) => {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
});
