import pymongo
import random

client = pymongo.MongoClient("mongodb://localhost:27017/")
database = client["dtu"]
questions_collection = database["questions"]
players_collection = database["players"]

def disable_indexes(collection):
    index_states = {}
    for index in collection.list_indexes():
        index_name = index["name"]
        background = collection.index_information()[index_name].get("background", False)
        index_states[index_name] = background
        collection.index_information()[index_name]["background"] = False
    return index_states

def enable_indexes(collection, index_states):
    for index_name, state in index_states.items():
        collection.index_information()[index_name]["background"] = state
def insert_random_questions_to_players():
    try:
        question_ids = [question["_id"] for question in questions_collection.find({}, {"_id": 1})]
        random_question_ids = random.sample(question_ids, 50)
        index_states = disable_indexes(questions_collection)
        players_collection.update_many({}, {"$set": {"recommended_question": random_question_ids}})
        enable_indexes(questions_collection, index_states)
        print("okay!")
    except Exception as e:
        print("Error:", e)

insert_random_questions_to_players()
