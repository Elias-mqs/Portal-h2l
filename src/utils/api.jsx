
//src/utils/api.js
import axios from 'axios';
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: '/api/'
});
const api2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URLAPI
});



api.interceptors.request.use((config) => {
  const token = Cookies.get('ssn');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

}, function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  return response;
},
  (error) => {
    if (error.response.status === 401) {
      Cookies.remove('token');
    }
    return Promise.reject(error);
  }
);


export {api, api2 };
