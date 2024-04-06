import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1000,
  duration: '10s',
};
let rq = [{
    id: "65fd0f645f411276c47a0346"
},
{
    id: "65fd0f645f411276c47a0347"
},
{
    id: "65fd0f645f411276c47a0349"
},
{
    id: "65fd0f645f411276c47a034a"
},
{
    id: "65fd0f645f411276c47a034b"
}]
export default function() {
  let randomIndex = Math.floor(Math.random() * rq.length);
  let requestBody = rq[randomIndex];

  // Send HTTP request with parameters in the body
  let response = http.post('http://192.168.1.134:8000/updateAnsweredQuestion', JSON.stringify(requestBody), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response.body);

  // Sleep for 1 second between requests
  sleep(1);
}
