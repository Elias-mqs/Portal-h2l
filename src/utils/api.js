
import axios from 'axios';

const  api = axios.create({
  baseURL: '/api/'
});
// Interceptador de solicitação: 
// adiciona um cabeçalho 'Authorization' com o token JWT
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);





// Interceptador de resposta: lida com erros
//  de autenticação (401 não autorizado)
axios.interceptors.response.use(
  (response) => {
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

export default api;

// Agora, sempre que você fizer uma solicitação usando axios, 
// o interceptador de solicitação
// adicionará automaticamente um cabeçalho 'Authorization' com o token JWT,
//  e o interceptador de
// resposta lidará com erros de autenticação.







        // import axios from "axios";
        
        
        // const requisicoes = requis({
        //     api = axios.create({
        //         baseURL: `/`
        //     });
        
        //     api?.interceptors?.request.use(function (config)) {
        //         const cookies = parseCookies()
        //         config.headers['Authorization'] = `Bearer ${cookies.authToken || 'empty'}`
        //         return config;
        //     }, function (error) {
        //         console.error('Request interceptor error:', error);
        //         return Promisse.reject(error);
        //     });
        
        
        
        // });