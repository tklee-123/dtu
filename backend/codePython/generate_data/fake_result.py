from pymongo import MongoClient
from bson.objectid import ObjectId
import random
import datetime

# Connect to MongoDB
# client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Choose your database
result_collection = db['results']  
question_collection = db['questions']  
player_collection = db['players']

players = list(player_collection.find({}, {'_id': 1}))  
questions = list(question_collection.find({}, {'_id': 1}))

def generate_fake_data():
    fake_data = []
    for player in players:
        question_ids = [question['_id'] for question in random.sample(questions, 10)]
        fake_group_question = {
            "_id": player['_id'], 
            "recommended_questions": question_ids,
            "player_ability": random.uniform(0, 1),  
            "recommendation_status": random.choice([0, 1])
        }
        fake_data.append(fake_group_question)

    return fake_data



# Function to insert fake data into MongoDB
def insert_fake_data():
    try:
        fake_data = generate_fake_data()
        result_collection.insert_many(fake_data)
        print("Data inserted successfully.")
    except Exception as e:
        print("Error inserting data:", e)

# Call the function to insert fake data
insert_fake_data()
