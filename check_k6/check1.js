import http from 'k6/http';
import { sleep, Random } from 'k6';

export let options = {
  vus: 100,
  duration: '100s',
};

let rq = [
  {
    email: 'taly@gmail.com',
    password: '123456'
  },
  {
    email: 'taly1@gmail.com',
    password: '123456'
  },
  {
    email: 'taly2@gmail.com',
    password: '123456'
  },
  {
    email: 'taly3@gmail.com',
    password: '123456'
  },
  {
    email: 'taly4@gmail.com',
    password: '123456'
  },
  {
    email: 'taly5@gmail.com',
    password: '123456'
  }
];

export default function() {
  let randomIndex = Math.floor(Math.random() * rq.length);
  let requestBody = rq[randomIndex];

  // Send HTTP request with parameters in the body
  let response = http.post('http://192.168.1.134:8000/login', JSON.stringify(requestBody), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Extract the accessToken from the response
  let accessToken = JSON.parse(response.body).accessToken;

  // Log the accessToken for verification
  console.log("Access Token:", accessToken);
  
  sleep(1);
}
