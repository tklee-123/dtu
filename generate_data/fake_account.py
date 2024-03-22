
from pymongo import MongoClient
from faker import Faker
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Chọn cơ sở dữ liệu của bạn
account_collection = db['accounts']  # Collection chứa các tài khoản
player_collection = db['players'] # Collection chứa các thông tin của người chơi
player_id = player_collection.find({}, {'_id': 1})
evaluator_collection = db['evaluators']  # Collection chứa các thông tin của người đánh giá
password_collection = db['passwords']  # Collection chứa các mật khẩu
player_ids = [doc['_id'] for doc in player_collection.find({}, {'_id': 1})]
evaluator_ids = [doc['_id'] for doc in evaluator_collection.find({}, {'_id': 1})]
password_ids = [doc['_id'] for doc in password_collection.find({}, {'_id': 1})]

# Hàm tạo dữ liệu giả mạo cho collection accounts dựa trên schema account
def generate_fake_account_data():
    fake_accounts = []
    fake = Faker()
    for i in range(1000000):
        is_player = random.choice([True, False])
        if is_player:
            _id = random.choice(player_ids)
            account_role = "player"
        else:
            _id = random.choice(evaluator_ids)
            account_role = "evaluator"
        
        password_id = random.choice(password_ids)
        
        fake_account = {
            "id": _id,
            "username": fake.user_name(),
            "password": password_id,
            "role": account_role
        }
        fake_accounts.append(fake_account)
    return fake_accounts

# Hàm chèn dữ liệu giả mạo vào collection accounts
def insert_fake_account_data():
    try:
        fake_accounts = generate_fake_account_data()
        account_collection.insert_many(fake_accounts)
        print("Data inserted sucessfully")
    except Exception as e:
        print("Error:", e)

# Gọi hàm insert_fake_account_data() để thực hiện chèn dữ liệu giả mạo vào collection accounts
insert_fake_account_data()
