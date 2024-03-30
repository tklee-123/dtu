from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['dtu']  # Chọn cơ sở dữ liệu
answered_question_collection = db['answered_questions']  # Chọn collection chứa câu hỏi đã được trả lời
# Tạo chỉ mục mới cho trường "playerId" trong collection "answered_questions"
answered_question_collection.create_index([("playerId", 1),("timestamp",1)], name="playerId_index", background=True)

print("Index re-created successfully for 'playerId' field.")
