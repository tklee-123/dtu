import json
from pymongo import MongoClient

client = MongoClient('mongodb+srv://root:Vly.19952003@cluster0.jmil5cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
# client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  
player_collection = db['players']  

player_ids = player_collection.find({}, {"_id": 1})
with open("D:/dtu/backend/codePython/algorithms/a.txt", "w") as f:
    for player in player_ids:
        f.write(str(player["_id"]))
        f.write("\n")