from pymongo import MongoClient
from bson.objectid import ObjectId
import random
import datetime

# Connect to MongoDB
client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
# client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Choose your database
answered_question_collection = db['answered_questions']  # Collection AnsweredQuestion
question_collection = db['questions']  
player_collection = db['players']

selected_players = list(player_collection.find({}, {'_id': 1, 'major':1}))  # Lấy danh sách các người chơi với trường _id
pipeline = [
    {"$group": {"_id": "$category", "questions": {"$push": {"_id": "$_id"}}}}
]
result = question_collection.aggregate(pipeline)

# Khởi tạo một từ điển để lưu trữ kết quả
category_questions_dict = {}
for group in result:
    category = group["_id"]
    questions = group["questions"]
    category_questions_dict[category] = questions

def generate_fake_data():
    fake_data = []
    for category in category_questions_dict.keys():
        question_set = category_questions_dict[category]
        updated_question_set = []  # Tạo một bản sao của question_set để thực hiện các thay đổi
        for question in question_set:
            # Thực hiện các thay đổi cho mỗi câu hỏi
            question["timestamp"] = datetime.datetime.now()
            question["outcome"] = random.choice([0, 1])
            question['timeForAnswer'] = random.randint(10, 39)
            updated_question_set.append(question)  # Thêm câu hỏi đã cập nhật vào bản sao của question_set
        category_questions_dict[category] = updated_question_set 
    random.shuffle(selected_players)
    for i, player in enumerate(selected_players):
        major_questions = category_questions_dict[random.choice(player['major'])]
        sampled_questions = random.sample(major_questions, min(len(major_questions), 100))
        fake_group_question = {
            "player": player['_id'], 
            "questions": sampled_questions
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
