import json
from pymongo import MongoClient
from faker import Faker
import hashlib
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Chọn cơ sở dữ liệu của bạn
password_collection = db['passwords']  # Chọn collection của bạn

# Tạo dữ liệu giả mạo cho schema Password
def generate_fake_password_data():
    fake_passwords = []
    fake = Faker()
    for _ in range(1000000):
        password = fake.password(length=random.randint(8, 12))
        # Hash mật khẩu để tránh lộ thông tin
        hashcode = hashlib.sha256(password.encode()).hexdigest()
        fake_password = {
            "password": password,
            "hashcode": hashcode
        }
        fake_passwords.append(fake_password)
    return fake_passwords

# Chèn dữ liệu giả mạo vào MongoDB
def insert_fake_password_data():
    try:
        fake_passwords = generate_fake_password_data()
        password_collection.insert_many(fake_passwords)
        print("Data inserted sucessfully")
    except Exception as e:
        print("Error:", e)

insert_fake_password_data()
