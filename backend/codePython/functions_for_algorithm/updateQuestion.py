from pymongo import MongoClient

# Function to update difficulty and question_discrimination fields in the question collection
def update_question(db, question_id, new_difficulty, new_question_discrimination):
    question_collection = db['questions']
    query = {"_id": question_id}
    update_data = {"$set": {"difficulty": new_difficulty, "question_discrimination": new_question_discrimination}}
    question_collection.update_one(query, update_data)

# Test
client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['dtu']  # Choose your database
question_id = "660d24b1df667f419cfc409e"  # Replace with the specific question_id
new_difficulty = 6  # New value for difficulty field
new_question_discrimination = 0.8  # New value for question_discrimination field

update_question(db, question_id, new_difficulty, new_question_discrimination)
