from pymongo import MongoClient
from bson import ObjectId
import random
import datetime
import faker

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['dtu']  # Chọn cơ sở dữ liệu của bạn
round_collection = db['session']  # Collection chứa thông tin về vòng chơi
player_collection = db['players']  # Collection chứa thông tin về người chơi
question_collection = db['questions']  # Collection chứa thông tin về câu hỏi

# Khởi tạo Faker
fake = faker.Faker()

# Lấy danh sách các IDs của players và questions từ MongoDB
def get_player_ids():
    return [doc['_id'] for doc in player_collection.find({}, {'_id': 1})]

def get_question_ids():
    return [doc['_id'] for doc in question_collection.find({}, {'_id': 1})]

# Hàm sinh dữ liệu giả mạo cho collection Round
def generate_fake_data():
    player_ids = get_player_ids()
    question_ids = get_question_ids()

    fake_data = []
    number_of_rounds = 100000  # Số lượng vòng chơi giả mạo

    for _ in range(number_of_rounds):
        round_data = {}  # Khởi tạo round_data trước khi gán giá trị
        round_data["player"] = random.choice(player_ids)
        
        # Thời gian bắt đầu vòng chơi
        start_time = fake.date_time_between(start_date="-1y", end_date="now")
        round_data["start_time"] = start_time
        
        # Thời gian kết thúc vòng chơi (cách thời gian bắt đầu khoảng 10 phút)
        end_time = start_time + datetime.timedelta(minutes=10)
        round_data["end_time"] = end_time
        
        # Chọn ngẫu nhiên 10 câu hỏi từ danh sách các câu hỏi
        round_data["questions"] = random.sample(question_ids, k=10)
        
        round_data["correct_ratio"] = random.randint(0, 10)  # Tỷ lệ câu trả lời đúng (giả mạo ngẫu nhiên)
        
        fake_data.append(round_data)

    return fake_data

# Hàm chèn dữ liệu giả mạo vào collection Round
def insert_fake_data():
    try:
        fake_data = generate_fake_data()
        round_collection.insert_many(fake_data)
        print("Data inserted successfully.")
    except Exception as e:
        print("Error inserting data:", e)

# Gọi hàm để thêm dữ liệu giả mạo
insert_fake_data()
