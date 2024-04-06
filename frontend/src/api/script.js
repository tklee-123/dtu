import axiosClient from "./axiosClient";

const scriptAPI = {
  run: (token) => {
    const url = `/run`;
    return axiosClient.get(url, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  insertData: (token) => {
    const url = `/insertData`;
    return axiosClient.get(url,{
      headers: {
        token: `Bearer ${token}`,
      },
    })
  },
  get_major: (playerId) => {
    const url = `/get_major_level`;
    return axiosClient.get(url, playerId)
  }

};

export default scriptAPI;
