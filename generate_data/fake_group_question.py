from pymongo import MongoClient
from faker import Faker
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['dtu']
group_question_collection = db['group_questions']
player_collection = db['players']  
question_collection = db['questions'] 
levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
categories = question_collection.distinct("category")

def generate_fake_data():
    fake_data = []
    
    category_questions = {}
    for category in categories:
        pipeline = [
            {"$match": {"category": category}},
            {"$project": {"_id": 1, "difficulty": 1}},
            {"$limit": 900}
        ]
        selected_questions = list(question_collection.aggregate(pipeline))
        category_questions[category] = selected_questions
    
    for _ in range(1000000):
        player_major = random.choice(categories)
        selected_questions = category_questions[player_major]
        fake_group_question = {
            "player_major": player_major,
            "player_level": random.choice(levels),
            "questions": selected_questions
        }
        fake_data.append(fake_group_question)

    return fake_data


def insert_fake_data():
    try:
        fake_data = generate_fake_data()
        group_question_collection.insert_many(fake_data)
        print("Data inserted successfully.")
    except Exception as e:
        print("Error inserting data:", e)


insert_fake_data()
