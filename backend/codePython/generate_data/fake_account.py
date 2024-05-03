from pymongo import MongoClient
from faker import Faker
import random
import bcrypt

# Connect to MongoDB
# client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  
account_collection = db['accounts']  
player_collection = db['players']  
player_ids = [doc['_id'] for doc in player_collection.find({}, {'_id': 1})]

# Function to generate fake account data
def generate_fake_account_data():
    fake_accounts = []
    fake = Faker()
    for i in range(1000):
        password = "123456"
        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        fake_account = {
            "user_id": random.choice(player_ids),
            "username": fake.user_name(),
            "password": hashed_password.decode('utf-8'),  # Convert bytes to string
            "role": "player"
        }
        fake_accounts.append(fake_account)
    return fake_accounts


def insert_fake_account_data():
    try:
        fake_accounts = generate_fake_account_data()
        account_collection.insert_many(fake_accounts)
        print("Data inserted successfully")
    except Exception as e:
        print("Error:", e)

# Call insert_fake_account_data() to insert fake account data into the accounts collection
insert_fake_account_data()
