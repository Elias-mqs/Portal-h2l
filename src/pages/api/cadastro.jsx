import { db } from '@/utils/database';
import { hashPassword } from '@/utils'

export default async function handler(req, res) {
    
    if (req.method === 'POST') {

        const { name, username, email, setor, password, admin, codCli, loja, nomeCli  } = req.body;

        if(!codCli || !loja){
            return res.status(404).json({ message: 'Nome da empresa inválido' })
        }

        if (!name || !username || !email || !setor || !password || !nomeCli) {
            return res.status(404).json({ message: 'Necessario informar todos os dados' })
        }
        

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
                    password_hash: passwordHash,
                    admin: admin,
                    usr_nomecli: nomeCli,
                    usr_codcli: codCli,
                    usr_loja: loja,
                })
                .execute();

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });

        } catch (error) {
            console.log(error)

            res.status(400).json({ message: 'Não foi possivel autenticar' })

            return
        }

    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
