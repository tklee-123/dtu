from pymongo import MongoClient

from bson import ObjectId

#function
def get_answered_questions_by_player_id(db, player_id):
    answered_question_collection = db['answered_questions']
    return list(answered_question_collection.find({"playerId._id": player_id}))

#test
client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['dtu']  
player_id =  ObjectId("660d317f835b92824801c792")
answered_questions_data = get_answered_questions_by_player_id(db, player_id)
print(answered_questions_data)

