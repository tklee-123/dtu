from pymongo import MongoClient
from bson.objectid import ObjectId
import random
import datetime

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Choose your database
answered_question_collection = db['answered_questions']  # Collection AnsweredQuestion
question_collection = db['questions']  # Collection Question
player_collection = db['players']
category = ['Math', 'Physics', 'Literature', 'Geography', 'History', 'Biology', 'Science']
difficulty = [1,2,3,4,5]

# Get data of questions and players from MongoDB
selected_questions = list(question_collection.find({}, {"_id": 1}))
selected_players = list(player_collection.find({}, {"_id": 1}))

# Function to generate fake data
def generate_fake_data():
    fake_data = []
    for _ in range(100000):  
        questions_data = []
        for _ in range(100):  # Generate 10 answered questions per player
            question_data = {
                "_id": random.choice(selected_questions)['_id'],  # Generate a new ObjectId for each question
                "timestamp": datetime.datetime.now(),  # Use the current timestamp
                "status": random.choice([0, 1]),  # Randomly set status to 0 or 1
                "timeForAnswer": random.randint(10, 39),  # Random time between 10 to 39 seconds
                "difficulty": random.choice(difficulty)  # Random difficulty level between 1 to 10
            }
            questions_data.append(question_data)
        
        player_id = random.choice(selected_players)['_id']
        fake_group_question = {
            "playerId": player_id,
            "questions": questions_data
        }
        fake_data.append(fake_group_question)
    return fake_data

# Function to insert fake data into MongoDB
def insert_fake_data():
    try:
        fake_data = generate_fake_data()
        answered_question_collection.insert_many(fake_data)
        print("Data inserted successfully.")
    except Exception as e:
        print("Error inserting data:", e)

# Call the function to insert fake data
insert_fake_data()
