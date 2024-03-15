// importar o db configurado
import { db } from '@/database'


export default async function handler(req, res) {


    // verificar se a requisição é do tipo POST do
    // protocolo HTTP (GET,POST, PUT/PATCH OU DELETE)
    if (req.method === 'POST') {

        // Criar a const req.body usando o username e password
        const { username, password } = req.body;

        // Validar se foi inserido o usuario e/ou a senha
        if (!username || !password) {
            return res.status(401).json({ message: 'Necessario informar usuario e senha' })
        }

        // Criar as validações //
        try {
            // definir uma const (usuario) para receber as
            // informações do banco de dados.
            // Essa const vai receber alguns comandos:
            // -selecionar a tabela
            // -selecionar a coluna de validação da hash ou do token
            // -na condição: se username salvo no banco bater 
            //  com username informado
            // -Console.log para saber o ocorrido (verificar com erick 
            //  se é necessario essa parte)
            const usuario = await db.selectFrom('usuarios')
                .select('password_hash')
                .where('username', '=', username)
                .executeTakeFirst()
            console.log(usuario)

            // Tratamentos: //
            // Se for informado um usuario diferente do banco
            if (!usuario) {
                return res.status(404).json({ message: 'usuário não encontrado' })
            }

            // Comparar senha informada com a senha do banco
            // Ver com Erick se é aqui que eu tenho que converter a senha em hash
            // Erick falou que se for usar o Crypto, não precisa converter em hash
            if (password === usuario.password_hash) {

                // Se as credenciais são válidas, retorna um 
                // token de autenticação (da para usar JWT para isso? qual a melhor forma?)
                // Talvez crypto gera hash que pode ser usada como token
                res.status(200).json({ token: 'token_de_autenticacao' });
            } else {

                // Se as credenciais não são válidas, retorna um erro de autenticação
                res.status(401).json({ message: 'Credenciais inválidas' });
            }

            // se ocorrer algum erro de comunicação ou uma forma de login errada
            // vai informar o erro
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'não foi possivel autenticar' })
            return
        }


        //Faltou ao logar , gerar o token de autenticação da api e salvar na tabela
        //
       
    } else {
        // Se o método HTTP não for POST, retorna um erro de método não permitido
        res.status(405).json({ message: 'Método não permitido' });
    }
}
