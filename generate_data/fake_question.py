import os
import base64
import faker
import random
from pymongo import MongoClient

# Connect to MongoDB
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
            "image": "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAIVklEQVR4nC2P+3NU9R1AP9/HvXfvPpPsJlnygBASIAkQIJqgQQaJVAPlYSlvtGhFHShIx9pWq1gaEGGmUIsWxo6VdABrQ6VAUKBEIQTEBwQkCTEGsslm2WyS3exmX3fv4/vtD/gHnDnnIAYAoIn1z87S0iXOSeK63fBWOrGhS5gDF7wRS4oyzaK4E1BwLlxPAQCAQycMWwP5YBqOvV4QOev1O/vcg+MQ44JnQq4S4BanLzAmGkbwPQUA4IJ22WEPAZBIdMlTQ0JN3NM0e23d9SKiqhNHnO3l0YjF5aMUyyPKfYAMKiDfU0tDnS8+04+0qFRYxtRX97SMs3LVIAHVZ+fJTLtMxg90YgAAAEXlWRUPoIGNG0IUY9FQgqE4/v2UdsRs6QndiEj9YXcgMpKCLAwAwKCrXx7KyPFO2xDCGHOOqSiICn97bo9ZyBtyWO3D36p9gwG/Dnk/GmKKMGJopFjnmHGEgDHEaMJaY1XuelyVt7OT86WISRYB4j8a4iku+sB9NsZSHHHO75/pxPRdtVka/sFcl2XYuS9u4oUYADiBFuTSkrhvxOZ2CwwjQAAIoVRJ37QXbZG5DW8VtVp+yNHDPTyDAgCn0R6TGBfvSH+78Kltg0PFiCGGOdZdS2rOfLthrVn8krv6GM32gRsDAIfAgGCwnO7880pZOWYIACMMCHFl3dSB3/0CItGY4agwZbsJTKMAnIYPtLs5CJMeeCSPGIoBAAwDAOcghDebDCSR8a7+nFSeWcmRMXCc2Pqew08m61O2OLu6dZEBY4hTzLHFKohSSk1EkoVviLfbw8AkTgEZu/9dN/Xkaacns2N7572VvxUQ4ZT7TRb9dmQ4qbQlcNeUZY/MOOkciqWKKDJwf+WkWcLaJ9LNhAXYmMHKeQUixIS/rpzb+LxI7PaYZ"
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