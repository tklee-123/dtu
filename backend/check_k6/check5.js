import { sleep, check } from 'k6';
import http from 'k6/http';
import { Trend } from 'k6/metrics';

export let options = {
  vus: 5,
  duration: '2s',
};

let rq = [
  {
    email: 'taly@gmail.com',
    password: '123456'
  },
  // Add more requests as needed
];

export let ids = [];

export default function () {
  let randomIndex = Math.floor(Math.random() * rq.length);
  let requestBody = rq[randomIndex];
  let response = http.post('http://192.168.88.116:8000/login', JSON.stringify(requestBody), {
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

  let majorLevelResponse = http.get('http://192.168.88.116:8000/get_major_level', headers);
  ids.push(majorLevelResponse.body.playerId);

  sleep(1);
}
