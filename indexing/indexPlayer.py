from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['dtu']  # Choose your database
player_collection = db['players']  # Collection chứa thông tin người chơi

# Tạo chỉ mục cho trường "major" và "level" trong collection "players"
player_collection.create_index([("major", 1), ("level", 1),("email",1)], name="major_level_index")
print("Index created successfully for 'major' and 'level' fields.")
