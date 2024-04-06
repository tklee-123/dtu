import axiosClient from "./axiosClient";


const loginAPI = {
  post: (email, password) => { 
    const url = "/login";
    return axiosClient.post(url, {email, password});
  },
};
export default loginAPI;

