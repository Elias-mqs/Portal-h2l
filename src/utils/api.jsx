
//src/utils/api.js
import axios from 'axios';
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: '/api/'
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('ssn');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

}, function (error) {
    console.error('Request interceptor error:', error);
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


export default api;
