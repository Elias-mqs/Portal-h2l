import { db } from '@/utils/database';
import { generateToken, hashPassword } from '@/utils/index';


export default async function handler(req, res) {

    if (req.method === 'POST') {

        const USERADM = process.env.USERADM
        const PASSADM = process.env.PASSADM
        const USERNAMEADM = process.env.USERNAME_ADM
        const secret = process.env.JWT_SECRET;

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(401).json({ message: 'Necessário informar usuario e senha' })
        }

        try {

            if (username === USERADM && password === PASSADM) {
                const payload = {
                    username: USERNAMEADM
                }
                const { token } = await generateToken(payload, secret)
                console.log(token)

                res.status(200).json({ token });
            } else {
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
                        userId: usuario.usr_id,
                        username: usuario.username,
                        isAdmin: usuario.admin
                    }
                    const { token, createdAt } = await generateToken(payload, secret)
                    console.log(token)
                    console.log(createdAt)

                    db.updateTable('usuarios')
                        .set({ token: token, prazo: createdAt })
                        .where('usr_id', '=', usuario.usr_id)
                        .execute();

                    res.status(200).json({ token });

                } else {
                    res.status(401).json({ message: 'Credenciais inválidas' });
                }
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
