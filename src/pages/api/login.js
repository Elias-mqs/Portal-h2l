import { db } from '@/database'

export default async function handler(req, res) {



    if (req.method === 'POST') {
        // Extrai as credenciais do corpo da requisição
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(401).json({message: 'Necessario informar usuario e senha'})
        }
        try {
            const usuario = await db.selectFrom('usuarios')
                .select('password_hash') 
                .where('username', '=', username)
                .executeTakeFirst()
            console.log(usuario)

            if (!usuario) {
                return res.status(404).json({ message: 'usuário não encontrado' })
            }

            if (password === usuario.password_hash) {
                // Se as credenciais são válidas, retorna um token de autenticação (você pode usar JWT para isso)
                res.status(200).json({ token: 'token_de_autenticacao' });
            } else {
                // Se as credenciais não são válidas, retorna um erro de autenticação
                res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'não foi possivel autenticar' })
            return
        }

        // Verifica se as credenciais são válidas
        //    (você pode substituir isso pela lógica de validação do 
        //     seu banco de dados)
    } else {
        // Se o método HTTP não for POST, retorna um erro de método não permitido
        res.status(405).json({ message: 'Método não permitido' });
    }
}
