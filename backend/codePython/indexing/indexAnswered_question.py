from pymongo import MongoClient

client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['dtu']  # Choose your database
answered_question_collection = db['answered_questions']  # Choose the collection containing answered questions

answered_question_collection.create_index([("player", 1), ("timestamp", 1), ("status", 1)], background=True)

print("Index re-created successfully for 'playerId' field.")
