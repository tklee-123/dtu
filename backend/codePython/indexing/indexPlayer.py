from pymongo import MongoClient

client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['dtu']  # Choose your database
player_collection = db['players']  # Collection chứa thông tin người chơi

player_collection.create_index([("major", 1), ("rank",1),("email",1)])
print("Index created successfully")