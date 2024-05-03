from pymongo import MongoClient
import sys
from bson import ObjectId

def get_question_details(question_id, questions_collection):
    question_details = questions_collection.find_one({"_id": ObjectId(question_id)}, {"category": 1, "subcategory": 1, "difficulty": 1})
    return question_details

def main(player_id):
    client = MongoClient('mongodb://localhost:27017')
    db = client['dtu']  
    player_collection = db['players']
    result_collection = db['results']
    questions_collection = db['questions']
    
    player_info = player_collection.find_one({"_id": ObjectId(player_id)}, {"degree": 1, "major": 1})
    questions = result_collection.find_one({"_id": ObjectId(player_id)}, {"recommended_questions": 1})
    if player_info:
        degree = player_info.get('degree', '')
        major = player_info.get('major', '')
        recommended_questions = questions.get('recommended_questions', [])
        questions_array = []

        for question_id in recommended_questions:
            question_details = get_question_details(question_id, questions_collection)
            questions_array.append(question_details)

        print(f"Degree: {degree}")
        print(f"Major: {major}")
        print("Recommended Questions:")
        for question in questions_array:
            category = question.get('category', '')
            subcategory = question.get('subcategory', '')
            difficulty = question.get('difficulty', '')
            print(f"- Category: {category}, Subcategory: {subcategory}, Difficulty: {difficulty}")
    else:
        print("Player not found or no recommended questions found.")

if __name__ == "__main__":
    player_id = "6623acca3a33a2effd010dac"
    if player_id:
        main(player_id)
    else:
        print("Please provide a player ID.")
