import json
from pymongo import MongoClient
from faker import Faker
import random
import os

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Chọn cơ sở dữ liệu của bạn
question_collection = db['questions']  # Collection chứa các câu hỏi
evaluator_collection = db['evaluators']  # Collection chứa các thông tin của người đánh giá

# Lấy tập hợp các giá trị "field" từ schema Question
question_fields = question_collection.distinct("category")

# Tạo dữ liệu giả mạo cho schema Evaluator
def generate_fake_evaluator_data():
    fake_evaluators = []
    fake = Faker()
    for _ in range(1000000):
        fake_evaluator = {
            "field": random.choice(question_fields),
            "birth_year": random.randint(1970, 2005),
            "full_name": fake.name(),
            "email": fake.email()
        }
        fake_evaluators.append(fake_evaluator)
    return fake_evaluators

# Chèn dữ liệu giả mạo vào MongoDB
def insert_fake_evaluator_data():
    try:
        fake_evaluators = generate_fake_evaluator_data()
        evaluator_collection.insert_many(fake_evaluators)
        print("Data inserted sucessfully")
    except Exception as e:
        print("Error:", e)

insert_fake_evaluator_data()
