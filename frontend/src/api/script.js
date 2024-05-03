

import axiosClient from "./axiosClient";

const scriptAPI = {
  get_recommended_questions: (playerId) => {
    const url = `/get_recommended_questions/${playerId}`;
    return axiosClient.get(url);
  },
  insertData: (token) => {
    const url = `/insertData`;
    return axiosClient.get(url,{
      headers: {
        token: `Bearer ${token}`,
      },
    })
  },
  get_nearest_player: (player_id) => {
    const url = `/get_nearest`;
    return axiosClient.post(url, {player_id})
  },
  run: () => {
    const url = `/process_batch`;
    return axiosClient.get(url)
  },
  get_infor: (playerId) => {
    const url = `/get_infor/${playerId}`;
    return axiosClient.get(url)
  },
  get_id: (number) => {
    const url = `/get_id`;
    return axiosClient.post(url, {number: number})
  }
};

export default scriptAPI;
