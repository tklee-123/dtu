from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Chọn cơ sở dữ liệu của bạn
player_collection = db['players']  # Collection chứa thông tin về người chơi
answered_question_collection = db['answered_questions']  # Collection chứa thông tin về câu trả lời

# Thực hiện truy vấn
pipeline = [
    # Unwind để mở rộng mảng major
    {"$unwind": "$major"},
    # Lookup để kết hợp thông tin câu trả lời của người chơi
    {"$lookup": {
        "from": "answered_questions",
        "localField": "_id",
        "foreignField": "playerId",
        "as": "answers"
    }},
    # Unwind để mở rộng mảng câu trả lời
    {"$unwind": "$answers"},
    # Match để lọc câu trả lời đúng
    {"$match": {
        "answers.questions.status": 1
    }},
    # Group theo _id người chơi và lĩnh vực, tính tổng số lần trả lời đúng
    {"$group": {
        "_id": {
            "player_id": "$_id",
            "major": "$major"
        },
        "total_correct_answers": {"$sum": 1}
    }},
    # Lookup để lấy thông tin về người chơi
    {"$lookup": {
        "from": "players",
        "localField": "_id.player_id",
        "foreignField": "_id",
        "as": "player_info"
    }},
    # Unwind để mở rộng mảng thông tin người chơi
    {"$unwind": "$player_info"},
    # Project để chỉ trả về các trường cần thiết
    {"$project": {
        "player_id": "$_id.player_id",
        "player_name": "$player_info.full_name",
        "major": "$_id.major",
        "total_correct_answers": 1
    }},
    # Lưu kết quả vào collection mới
    {"$out": "player_correct_answers"}
]

# Thực hiện truy vấn và lưu kết quả vào collection mới
player_collection.aggregate(pipeline)
print("Data saved")