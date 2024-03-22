import json
from pymongo import MongoClient
from faker import Faker
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Choose your database
player_collection = db['players']  # Choose your collection
question_collection = db['questions']  # Collection chứa các câu hỏi
# Generate data using Faker
fake = Faker('vi_VN')

# Lĩnh vực của các câu hỏi
question_categories = question_collection.distinct("category")


# Generate fake player data
def generate_fake_player_data():
    fake_players = []
    for _ in range(100000):
        fake_player = {
            "major": random.sample(question_categories, 4),
            "birth_year": random.randint(1970, 2005),
            "occupation": fake.job(),
            "full_name": fake.name(),
            "email": fake.email(),
            "level": random.randint(1, 10),
            "current_assessment_score": random.randint(0, 100),
            "correct_ratio": random.randint(0, 100),
            "played_round_count": random.randint(1, 100)
        }
        fake_players.append(fake_player)
    return fake_players

# Insert fake player data into MongoDB
def insert_fake_player_data():
    try:
        fake_players = generate_fake_player_data()
        player_collection.insert_many(fake_players)
        print("Data inserted successfully.")
    except Exception as e:
        print("Error inserting data:", e)

insert_fake_player_data()
