
//src/utils/api.js
import axios from 'axios';


const api = axios.create({
  baseURL: '/api/'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
},
 function (error) {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
}
);

api.interceptors.response.use((response) => {
  return response;
},
  (error) => {
    if (error.response.status === 401) {
      console.log('Usuário não autorizado. Redirecionando para a página de login.');
    }
    return Promise.reject(error);
  }
);




export default api;
