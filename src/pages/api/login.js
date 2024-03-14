export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Extrai as credenciais do corpo da requisição
      const { username, password } = req.body;
  
      // Verifica se as credenciais são válidas
    //    (você pode substituir isso pela lógica de validação do 
    //     seu banco de dados)
      if (username === 'admin' && password === 'admin') {
        // Se as credenciais são válidas, retorna um token de autenticação (você pode usar JWT para isso)
        res.status(200).json({ token: 'token_de_autenticacao' });
      } else {
        // Se as credenciais não são válidas, retorna um erro de autenticação
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    } else {
      // Se o método HTTP não for POST, retorna um erro de método não permitido
      res.status(405).json({ message: 'Método não permitido' });
    }
  }