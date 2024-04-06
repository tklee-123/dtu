import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1000, 
  duration: '110s', 
};
let rq = [{
    playerId: "65fd0fbe9c3b15834d173846"
},
{
    playerId: "65fd290c1ea60c7d93c4a707"
},
{
    playerId: "65fd2934cece4270c675ac9b"
},
{
    playerId: "65fd2934cece4270c675b5f6"
},
{
    playerId: "65fd0fa0bbc46ef9366c8d15"
}]
export default function() {
  let randomIndex = Math.floor(Math.random() * rq.length);
  let requestBody = rq[randomIndex];

  let response = http.post('http://192.168.1.134:8000/getAnsweredQuestion', JSON.stringify(requestBody), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // In ra nội dung phản hồi từ server
  console.log(response.body);
  sleep(1);
}
