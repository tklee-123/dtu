from pymongo import MongoClient
import sys
from bson import ObjectId

def main(player_id):
    client = MongoClient('mongodb://localhost:27017')
    db = client['dtu']  
    answered_question_collection = db['answered_questions']
    results = answered_question_collection.find({"playerId": ObjectId(player_id)}, {"_id": 0, "questions._id": 1})
    question_ids = [question['_id'] for result in results for question in result['questions']]
    print(question_ids)
if __name__ == "__main__":
    player_id = sys.argv[1] if len(sys.argv) > 1 else None
    main(player_id)
