import { db } from '@/utils/database';
import { criandotoken, generateToken, isTokenExpired } from '../../utils/index';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


export default async function handler(req, res) {

    // criar consts de acesso das chaves para os hashs e tokens
    const dbPassword = process.env.DB_PASSWORD;
    const apiKey = process.env.API_KEY;

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
            // console.log(username)

            const userid = await db.selectFrom('usuarios')
                .select('usr_id')
                .where('username', '=', username)
                .executeTakeFirst()

            // Tratamentos: //
            // Se for informado um usuario diferente do banco
            if (!usuario) {
                return res.status(404).json({ message: 'usuário não encontrado' })
            }

            // Comparar senha informada com a senha do banco
            // Ver com Erick se é aqui que eu tenho que converter a senha em hash
            // Erick falou que se for usar o Crypto, não precisa converter em hash
            const passwordHash = hashPassword(password);


            if (passwordHash === hashPassword(usuario.password_hash)) {


// esta gerando o token e o tempo, preciso dar um jeito de salvar no banco
                const token = await generateToken()

                db.updateTable('usuarios')
                    .set({ token: token })
                    .where('usr_id', '=', userid.usr_id)
                    .execute();

                // generateToken();

                // isTokenExpired();

                // if (isTokenExpired(createdAt)) {
                //     console.log('Token expirou');
                // } else {
                //     console.log('Token ainda é válido');
                // }





                //////////////////////////////////////////////////////////////////////
                ////////////////// ANTIGO FUNCIONANDO //////////////////////////////////////////////////
                //////////////////////////////////////////////////////////
                // Gerar token para o login com sucesso
                // const token = jwt.sign({ username: usuario.username, id: usuario.usr_id }, 'chave segura', { expiresIn: '1h' })

                // // Salvar o token no banco de dados
                // await db.updateTable('usuarios')
                //     .set({ token: token })
                //     .where('usr_id', '=', userid.usr_id)
                //     .execute();
                /////////////////////////////////////////////////////////////////////////////////

                // Buscar o usuário atualizado do banco de dados
                const usuarioAtualizado = await db.selectFrom('usuarios')
                    .select('token')
                    .where('usr_id', '=', userid.usr_id)
                    .executeTakeFirst()


                //Enviar resposta de autenticado com sucesso 
                res.status(200).json({ token });
                console.log(usuarioAtualizado.token)

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

function hashPassword(password) {
    try {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        return hashedPassword;
    } catch (error) {
        throw new Error('Erro ao gerar o hash da senha');
    }
}