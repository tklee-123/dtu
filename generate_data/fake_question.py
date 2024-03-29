from bson import ObjectId
import faker
import random
from pymongo import MongoClient
from pymongo import MongoClient
from gridfs import GridFS
# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Choose your database
question_collection = db['questions']  # Choose your collection

fs = GridFS(db)
# Initialize Faker
fake = faker.Faker()

# Lưu trữ tệp video vào GridFS
with open('D:/dtu/gridfs/video2.mp4', 'rb') as video_file:
    video_id = fs.put(video_file, filename='video.mp4')
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

def generate_fake_question_data():
    fake_questions = []
    for _ in range(1000000):
        category = fake.random_element(list(categories.keys()))
        subcategory = fake.random_element(categories[category])
        fake_question = {
            "category": category,
            "subcategory": subcategory,
            "content": fake.sentence(),
            "answers": [fake.word() for _ in range(4)],
            "correct_answer": fake.word(),
            "difficulty": random.randint(1,5),  # Set difficulty level
            "language": random.randint(1, 2),
            "multimedia": video_id
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