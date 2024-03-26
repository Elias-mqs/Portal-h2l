
//src/utils/api.js
import axios from 'axios';
// import dayjs from 'dayjs';
// import db from './database';

const api = axios.create({
  baseURL: '/api/'
});
// Interceptador de solicitação: 
// adiciona um cabeçalho 'Authorization' com o token JWT



api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
}
);



// Interceptador de resposta: lida com erros
//  de autenticação (401 não autorizado)
api.interceptors.response.use((response) => {
  return response;
},
  (error) => {
    if (error.response.status === 401) {
      // Redirecionar para a página de 
      // login ou fazer outras ações de tratamento de erro
      console.log('Usuário não autorizado. Redirecionando para a página de login.');
    }
    return Promise.reject(error);
  }
);



// async function authenticate(token) {
//   const now = dayjs().unix()
//   return await db
//     .selectFrom('usuarios')
//     .select(['usr_id', 'nome', 'username'])
//     .where('token', token)
//     .where('prazo', '>', now)
//     .executeTakeFirst()
// }

export { api };







