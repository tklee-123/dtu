import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '100s',
};

export default function () {
  let response = http.post('http://192.168.88.116:8000/openVideo', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // Kiểm tra xem phản hồi có thành công không
  if (response.status !== 200) {
    console.error(`Unexpected status code: ${response.status}`);
  }
  sleep(1);
}
