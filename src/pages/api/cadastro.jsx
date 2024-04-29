import { db } from '@/utils/database';
import { hashPassword } from '@/utils'

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const { name, username, email, setor, password } = req.body;


        // Validar se foi inserido o usuario e/ou a senha
        if (!name || !username || !email || !setor || !password) {
            return res.status(404).json({ message: 'Necessario informar todos os dados' })
        }

        // Criar as validações //
        try {

            const dados = await db.selectFrom('usuarios')
                .select(['nome', 'username', 'email'])
                .where((eb) => eb.or([
                    eb('nome', '=', name),
                    eb('username', '=', username),
                    eb('email', '=', email)
                ]))
                .executeTakeFirst();


            if (dados) {
                if (dados.nome === name) {
                    return res.status(409).json({ message: 'Nome já cadastrado' });
                } else if (dados.username === username) {
                    return res.status(409).json({ message: 'Nome de usuário já cadastrado' });
                } else if (dados.email === email) {
                    return res.status(409).json({ message: 'E-mail já cadastrado' });
                }
            }

            const passwordHash = hashPassword(password);

            db.insertInto('usuarios')
                .values({
                    nome: name,
                    username: username,
                    email: email,
                    setor: setor,
                    password_hash: passwordHash
                })
                .execute();

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });



            // se ocorrer algum erro de comunicação ou uma forma de cadastro errada
            // vai informar o erro
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Não foi possivel autenticar' })
            return
        }

    } else {
        // Se o método HTTP não for POST, retorna um erro de método não permitido
        res.status(405).json({ message: 'Método não permitido' });
    }
}
