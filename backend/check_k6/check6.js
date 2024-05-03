import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1000,
  duration: '1000s',
};
let rq = [
  {
    player_id: '66235b3fe513aab09b620b76',
  },
  {
    player_id: '66235b3fe513aab09b620b77',
  },
  {
    player_id: '66235b3fe513aab09b620b78',
  },
  {
    player_id: '66235b3fe513aab09b620b79',
  },
  {
    player_id: '66235b3fe513aab09b620b7a',
  },
  {
    player_id: '66235b3fe513aab09b620b7b',
  },
  {
    player_id: '66235b3fe513aab09b620b7c',
  }
];

export default function () {
  let randomIndex = Math.floor(Math.random() * rq.length);
  let requestBody = rq[randomIndex];
  let response = http.post('http://192.168.1.134:8000/get_recommended_questions', JSON.stringify(requestBody), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let questions = JSON.parse(response.body);
  if (response.status !== 200) {
    console.error(`Unexpected status code: ${response.status}`);
  } else {
    // Thực hiện mở từng câu hỏi
    questions.forEach(questionId => {
      let openQuestionResponse = http.post('http://192.168.1.134:8000/openVideo', JSON.stringify({ question_id: questionId }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Kiểm tra xem phản hồi có thành công không
      if (openQuestionResponse.status !== 200) {
        console.error(`Unexpected status code for opening question ${questionId}: ${openQuestionResponse.status}`);
      }
    });
  }
  sleep(0.1);
}
