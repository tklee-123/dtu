from pymongo import MongoClient

def disable_indexes(collection):
    # Store the state of each index before disabling
    index_states = {}
    for index in collection.list_indexes():
        index_name = index["name"]
        background = collection.index_information()[index_name].get("background", False)
        index_states[index_name] = background
        collection.index_information()[index_name]["background"] = False

    return index_states

def enable_indexes(collection, index_states):
    # Re-enable indexes based on their previous state
    for index_name, state in index_states.items():
        collection.index_information()[index_name]["background"] = state

def remove_recommended_question(collection):
    collection.update_many({}, {"$unset": {"recommended_question": ""}})

def main():
    client = MongoClient('mongodb://localhost:27017')
    db = client['dtu']  
    player_collection = db['players']
    index_states = disable_indexes(player_collection)
    remove_recommended_question(player_collection)
    enable_indexes(player_collection, index_states)  

if __name__ == "__main__":
    main()
