from pymongo import MongoClient

client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['dtu']  # Choose your database
questions_collection = db['questions']  # Thay questions_collection bằng tên collection của bạn

# Tạo index mới cho trường "category" và "difficulty" trong collection "questions"
questions_collection.create_index([("category", 1), ("difficulty", 1)])
print("New index created successfully.")
