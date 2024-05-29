import { db } from '@/utils/database';
import { generateToken, hashPassword, decript } from '@/utils/index';

export default async function handler(req, res) {

    if (req.method === 'POST') {


        const secret = process.env.JWT_SECRET;
        const dados = decript(req.body.code)

        const { username, password } = dados;

        if (!username || !password) {
            return res.status(401).json({ message: 'Necessário informar usuario e senha' })
        }

        try {

            const usuario = await db.selectFrom('usuarios')
                .select(['password_hash', 'usr_id', 'username', 'admin'])
                .where('username', '=', username)
                .executeTakeFirst()

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' })
            }


            const passwordHash = hashPassword(password);

            if (passwordHash === usuario.password_hash) {
                const payload = {
                    id: usuario.usr_id,
                    username: usuario.username,
                    isAdmin: usuario.admin
                }
                const { ssn } = await generateToken(payload, secret)

                db.updateTable('usuarios')
                    .set({ token: ssn })
                    .where('usr_id', '=', usuario.usr_id)
                    .execute();
                res.status(200).json({ ssn }); // ssn de session

            } else {
                res.status(401).json({ message: 'Credenciais inválidas' });
            }

        } catch (error) {
            res.status(400).json({ message: 'não foi possivel autenticar' })
            console.log(error)
            return
        }

    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
