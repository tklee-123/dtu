from pymongo import MongoClient
from bson.objectid import ObjectId
import random
import datetime

# Connect to MongoDB
client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['dtu']  # Choose your database
answered_question_collection = db['answered_questions']  # Collection AnsweredQuestion
question_collection = db['questions']  
player_collection = db['players']
category = ['Math', 'Physics', 'Literature', 'Geography', 'History', 'Biology', 'Science']
difficulty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

selected_questions = list(question_collection.aggregate([
    {"$project": {"_id": 1, "difficulty": 1}}
]))

selected_players = list(player_collection.aggregate([
    {"$project": {"_id": 1, "major": 1, "rank": 1}}
]))

def generate_fake_data():
    fake_data = []
    # Pre-generate sets of 100 questions
    question_sets = [random.sample(selected_questions, 100) for _ in range(10000)]
    for question_set in question_sets:
        for question in question_set:
            question["timestamp"] = datetime.datetime.now()
            question["outcome"] = random.choice([0, 1])
            question['timeForAnswer'] = random.randint(10, 39)
    random.shuffle(selected_players)

    for i, player in enumerate(selected_players):
        question_set = question_sets[i % len(question_sets)]
        fake_group_question = {
            "player": player,
            "questions": question_set,
            "status": 0
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
