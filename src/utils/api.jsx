
//src/utils/api.js
import axios from 'axios';
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: '/api/'
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  console.log(token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(config.headers.Authorization)
  return config;
}, function (error) {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  // console.log(response)
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
