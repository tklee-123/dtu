from bson import ObjectId
import faker
import random
from pymongo import MongoClient
from pymongo import MongoClient
from gridfs import GridFS
import os
# Connect to MongoDB
# client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Choose your database
question_collection = db['questions']  # Choose your collection


# Initialize Faker
fake = faker.Faker()
categories = {
    'Math': ['Algebra', 'Math'],
    'Literature': ['Poetry', 'Drama', 'Prose', 'Literary Theory'],
    'Physics': ['Classical Mechanics', 'Quantum Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
    'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry', 'Biochemistry'],
    'Geography': ['Human Geography', 'Physical Geography', 'Geology', 'Cartography'],
    'Science': ['Environmental Science', 'Earth Science', 'Astronomy', 'Physics', 'Chemistry', 'Biology'],
    'Biology': ['Zoology', 'Botany', 'Microbiology', 'Genetics', 'Ecology'],
    'History': ['Ancient History', 'Medieval History', 'Renaissance History', 'Modern History', 'World History']
}

fs = GridFS(db)
# Lưu trữ tệp video vào GridFS
path = 'D:/dtu/backend/codePython/generate_data/video'
video_ids = []
for file in os.listdir(path):
    file_path = os.path.join(path, file) 
    with open(file_path, 'rb') as video_file:
        video_id = fs.put(video_file, filename=file)  
        video_ids.append(video_id)
    
def generate_fake_question_data():
    fake_questions = []
    for _ in range(20000):
        category = fake.random_element(list(categories.keys()))
        subcategory = fake.random_element(categories[category])
        answers = [fake.word() for _ in range(4)] 
        correct_answer = random.choice(answers) 
        difficulty = random.randint(1, 5)  
        lower_bound = max(1, difficulty - 1)
        upper_bound = min(10, difficulty + 1)
        required_rank = random.randint(lower_bound, upper_bound)
        fake_question = {
            "category": category,
            "subcategory": subcategory,
            "content": fake.sentence(),
            "answers": answers,
            "correct_answer": correct_answer,  
            "difficulty": difficulty,
            "required_rank": required_rank,  
            "language": random.randint(1, 2),
            "multimedia": random.choice(video_ids)
        }
        fake_questions.append(fake_question)
    return fake_questions

# Insert fake question data into MongoDB
def insert_fake_question_data():
    try:
        fake_questions = generate_fake_question_data()
        question_collection.insert_many(fake_questions)
        print("Data inserted successfully.")
    except Exception as e:
        print("Error inserting data:", e)

insert_fake_question_data()