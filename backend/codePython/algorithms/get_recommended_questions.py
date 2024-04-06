from pymongo import MongoClient
import sys
from bson import ObjectId

def main(player_id):
    client = MongoClient('mongodb://localhost:27017')
    db = client['dtu']  
    player_collection = db['players']
    result = player_collection.find_one({"_id": player_id}, {"_id": 0, "recommended_question": 1})
    if result:
        print(result.get('recommended_question'))
    else:
        print("Player not found or no recommended question found.")

if __name__ == "__main__":
    player_id = ObjectId(sys.argv[1]) if len(sys.argv) > 1 else None
    if player_id:
        main(player_id)
    else:
        print("Please provide a player ID.")
