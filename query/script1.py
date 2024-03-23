from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Choose your database
answered_question_collection = db['answered_questions']  # Collection AnsweredQuestion
question_collection = db['questions']  # Collection Question

# Function to select unanswered questions for a player using aggregation pipeline
def select_unanswered_questions(player_id, majors, limit=10):
    pipeline = [
        # Match questions based on the player's majors
        {"$match": {"category": {"$in": majors}}},
        # Lookup to find answered questions by the player
        {
            "$lookup": {
                "from": "answered_questions",
                "let": {"question_id": "$_id"},
                "pipeline": [
                    {"$match": {"$expr": {"$eq": ["$playerId", player_id]}, "questions._id": "$$question_id"}}
                ],
                "as": "answered_questions"
            }
        },
        # Filter out questions that have been answered by the player
        {"$match": {"answered_questions": []}},
        # Project to output only the _id of the questions
        {"$project": {"_id": 1}},
        # Limit the number of questions to retrieve
        {"$limit": limit}
    ]

    # Execute the aggregation pipeline
    result = question_collection.aggregate(pipeline)

    # Extract question IDs from the result
    unanswered_question_ids = [q['_id'] for q in result]

    return unanswered_question_ids

# Example usage
player_id = ObjectId("65fd0f645f411276c47a0347")  
majors = ["Physics","Geography","Biology","Science"]  # Example majors

unanswered_questions = select_unanswered_questions(player_id, majors, limit=10)
print(f"Question pool for player {player_id} is", unanswered_questions)
