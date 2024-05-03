import json
from pymongo import MongoClient
from faker import Faker
import random
import numpy as np

# Connect to MongoDB
client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
# client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Choose your database
player_collection = db['players']  # Choose your collection
question_collection = db['questions']  # Collection chứa các câu hỏi

fake = Faker('vi_VN')
question_categories = question_collection.distinct("category")
# Hàm sinh dữ liệu giả mạo cho người chơi
def generate_fake_player_data():
    fake_players = []
    for _ in range(20000):
        age = int(np.clip(np.random.normal(19, 4), 7, 40))
        if 10 <= age < 16:
            degree = 1
        elif 16 <= age < 18:
            degree = 2
        elif 18 <= age < 20:
            degree = 3
        elif 20 <= age < 23:
            degree = 4
        else:
            degree = 5
        
        fake_player = {
            "major": random.sample(question_categories, 4),
            "birth_year": 2024 - age,  
            "full_name": fake.name(),
            "email": fake.email(),
            "degree": degree  
        }
        fake_players.append(fake_player)
    return fake_players

# Hàm chèn dữ liệu giả mạo vào MongoDB
def insert_fake_player_data():
    try:
        fake_players = generate_fake_player_data()
        player_collection.insert_many(fake_players)
        print("Data inserted successfully.")
    except Exception as e:
        print("Error inserting data:", e)

# Gọi hàm để chèn dữ liệu giả mạo
insert_fake_player_data()
