import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '2s',
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

export default function () {
  let randomIndex = Math.floor(Math.random() * rq.length);
  let requestBody = rq[randomIndex];
  let response = http.post('http://192.168.1.134:8000/login', JSON.stringify(requestBody), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let accessToken = JSON.parse(response.body).accessToken;

  console.log("Access Token:", accessToken);

  let headers = {
    headers: {
      'token': `Bearer ${accessToken}`,
    },
  };

  let majorLevelResponse = http.get('http://192.168.1.134:8000/get_major_level', headers);

  console.log("Response from get_major_level:", majorLevelResponse.body);
  sleep(1);
}
