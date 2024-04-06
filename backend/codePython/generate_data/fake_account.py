from pymongo import MongoClient
from faker import Faker
import random
import bcrypt
import hashlib
# Connect to MongoDB
client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['dtu']  # Choose your database
account_collection = db['accounts']  # Collection for accounts
player_collection = db['players']  # Collection for player information
evaluator_collection = db['evaluators']  # Collection for evaluator information
player_ids = [doc['_id'] for doc in player_collection.find({}, {'_id': 1})]
evaluator_ids = [doc['_id'] for doc in evaluator_collection.find({}, {'_id': 1})]

def generate_fake_account_data():
    fake_accounts = []
    fake = Faker()
    for i in range(10000):
        is_player = random.choice([True, False])
        if is_player:
            user_id = random.choice(player_ids)
            account_role = "player"
        else:
            user_id = random.choice(evaluator_ids)
            account_role = "evaluator"
        # Generate a salt and hash the password using bcrypt
        # salt = bcrypt.gensalt()
        # password = fake.password().encode('utf-8')
        hashed_password = hashlib.sha256(fake.password().encode()).hexdigest()
        fake_account = {
            "user_id": user_id,
            "username": fake.user_name(),
            "password": hashed_password,
            "role": account_role
        }
        fake_accounts.append(fake_account)
    return fake_accounts

# Function to insert fake account data into the accounts collection
def insert_fake_account_data():
    try:
        fake_accounts = generate_fake_account_data()
        account_collection.insert_many(fake_accounts)
        print("Data inserted successfully")
    except Exception as e:
        print("Error:", e)

# Call insert_fake_account_data() to insert fake account data into the accounts collection
insert_fake_account_data()
