from pymongo import MongoClient

# Kết nối đến MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['dtu']  # Thay your_database bằng tên database của bạn
questions_collection = db['questions']  # Thay questions_collection bằng tên collection của bạn

# Tạo index mới cho trường "category" và "difficulty" trong collection "questions"
questions_collection.create_index([("category", 1), ("difficulty", 1)])
print("New index created successfully.")
