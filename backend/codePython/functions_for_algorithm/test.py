from pymongo import MongoClient
client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['dtu']  
pipeline = [
    {"$project": {
        "_id": 1,
        "major": 1,
        "birth_year": 1,
        "occupation": 1,
        "full_name": 1,
        "email": 1,
        "level": 1,
        "current_assessment_score": 1,
        "correct_ratio": 1
    }},
    {"$group": {
        "_id": "$major",  # Grouping by major
        "players": {"$push": "$$ROOT"}  # Storing documents belonging to each major in an array
    }}
]
result = db['players'].aggregate(pipeline)
for group in result:
    major = group['_id']  # Major name
    players = group['players']  # Array of player documents for this major
    

