from pymongo import MongoClient
from bson import ObjectId

# function
def update_player_ability_and_recommendation(db, player_id, ability_value, recommended_question_value):
    player_collection = db['players']
    filter_query = {"_id": player_id}
    update_query = {"$set": {"ability": ability_value, "recommended_question": recommended_question_value}}
    player_collection.update_one(filter_query, update_query)
# test
client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['dtu']  
player_id =  ObjectId("660d2617a6126d926d5b3bf2")
ability_value = 0.8
recommended_question_value = [1,2,3,4]
update_player_ability_and_recommendation(db, player_id, ability_value, recommended_question_value)

