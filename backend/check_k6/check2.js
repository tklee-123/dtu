import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1000,
  duration: '180s',
};
let rq = [{
  id: "6604e1d55327f48beaa2f445"
},
{
  id: "6604e1d35327f48bea9c86ef"
},
{
  id: "6604e1d35327f48bea9c86f0"
},
{
  id: "6604e1d35327f48bea9c86f1"
},
{
  id: "6604e1d35327f48bea9c86f2"
}]
export default function() {
  let randomIndex = Math.floor(Math.random() * rq.length);
  let requestBody = rq[randomIndex];

  // Send HTTP request with parameters in the body
  let response = http.post('http://192.168.1.134:8000/getQuestionInfo', JSON.stringify(requestBody), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response.body);
  sleep(1);
}
