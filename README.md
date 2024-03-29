#HƯỚNG DẪN SỬ DỤNG
#Set up
1.Clone code về
2.Trong terminal, run lệnh npm install
3.Chạy các file trong folder generate_data 
Chạy theo thứ tự: question -> player/evaluator -> accounts/groupquestion/answeredquestion -> history
lệnh run trên terminal: node <tên file> (hoặc ấn luôn nút run trong vscode)
#Lưu các hàm vào MongoDB và test cơ sở dữ liệu
1. Chạy các file trong folder functions
2. Chạy các file trong folder query_js (ờm thật ra là mấy cái function em viết thành api hết rồi nên là hiện tại trong folder đấy chỉ có 1 file thôi, anh có thể test luôn api nhé)

#testapi
Test theo thứ tự: addplayer -> createAccount (trong body cái này em đang để truyền id vào nên anh nhớ lấy id ở respone api trước đấy, cái này em sửa sau) -> login (nhớ cop accesstoken để truyền vào api sau) 
okay sau khi mà login được thì chúng ta sẽ test các hàm truy vấn nè
- get_major_level: lấy ra major và level của người chơi đã đăng nhập
  cái accesstoken sau khi lấy ra được từ api login sẽ được truyền vào header trong api này (header này sẽ có key là token và value có dạng Bearer + " " + accesstoken)
  Sau khi add vào thì ấn send
- rồi sau đấy thì anh muốn test cái nào cũng được, em chưa test thử mấy cái khác nên cập nhật sau nhé!
