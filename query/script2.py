from pymongo import MongoClient

# Kết nối đến MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']
answered_question_collection = db['answered_questions']
player_collection = db['players']
correct_answer_collection = db['question_statistics']

# Truy vấn aggregate
result = answered_question_collection.aggregate([
    {"$unwind": "$questions"},
    {"$group": {
        "_id": "$questions._id",
        "total_correct": {
            "$sum": {
                "$cond": [{"$eq": ["$questions.status", 1]}, 1, 0]
            }
        }
    }},
    {"$project": {
        "_id": 1,
        "total_correct": 1
    }},
    {"$out": "question_statistics"}  # Lưu kết quả vào collection question_statistics
])
print("Result saved")

