from pymongo import MongoClient
import random

# Kết nối đến MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['dtu']  
group_question_collection = db['group_questions']  
player_collection = db['players']  # Collection chứa thông tin về người chơi
question_collection = db['questions']  # Collection chứa thông tin về câu hỏi

levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
selected_questions = list(question_collection.find({}, {"_id": 1}))
majors = ['Math', 'Physics', 'Literature', 'Geo', 'His', 'Eng']

# Hàm tạo dữ liệu giả mạo cho schema groupQuestionSchema
def generate_fake_data():
    fake_data = []
    for _ in range(1000000):  
        questions_data = []
        for _ in range(random.randint(1, 10)): 
            random_question = random.choice(selected_questions)
            question_data = {
                "_id": random_question['_id'],
                "difficulty": random.choice(levels)
            }
            questions_data.append(question_data)
        
        fake_group_question = {
            "player_major": random.choice(majors),
            "player_level": random.choice(levels),
            "questions": questions_data
        }
        fake_data.append(fake_group_question)
        print(len(fake_data))
    return fake_data

# Hàm thêm dữ liệu giả mạo vào schema groupQuestionSchema
def insert_fake_data():
    try:
        fake_data = generate_fake_data()
        group_question_collection.insert_many(fake_data)
        print("Data inserted successfully.")
    except Exception as e:
        print("Error inserting data:", e)

# Gọi hàm để thêm dữ liệu giả mạo
insert_fake_data()
