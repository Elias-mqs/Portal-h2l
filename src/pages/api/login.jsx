import { db } from '@/utils/database';
import { generateToken } from '../../utils/index';
const crypto = require('crypto');


export default async function handler(req, res) {

    if (req.method === 'POST') {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(401).json({ message: 'Necessario informar usuario e senha' })
        }

        try {

            const usuario = await db.selectFrom('usuarios')
                .select('password_hash')
                .where('username', '=', username)
                .executeTakeFirst()
            // console.log(username)

            const userid = await db.selectFrom('usuarios')
                .select('usr_id')
                .where('username', '=', username)
                .executeTakeFirst()

            if (!usuario) {
                return res.status(404).json({ message: 'usuário não encontrado' })
            }

            const passwordHash = hashPassword(password);


            if (passwordHash === usuario.password_hash) {

                const { token, createdAt } = await generateToken()

                db.updateTable('usuarios')
                    .set({ token: token, prazo: createdAt })
                    .where('usr_id', '=', userid.usr_id)
                    .execute();

                res.status(200).json({ token });

            } else {
                res.status(401).json({ message: 'Credenciais inválidas' });
            }

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'não foi possivel autenticar' })
            return
        }

    } else {
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