import { db } from '@/utils/database'
import { hashPassword } from '@/utils'

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { name, username, email, password, setor, info } = req.body

        if (!name || !username || !email || !setor || !password) {
            return res.status(404).json({ message: 'Necessario informar todos os dados' })
        }
        if (!info) {
            return res.status(404).json({ message: 'Problema no cadastro, contate um superior!' })
        }

        try {

            const dados = await db.selectFrom('usuarios')
                .select(['username', 'email'])
                .where('usr_id', '=', info)
                .executeTakeFirst();

            if (dados) {
                if (dados.username === username) {
                    return res.status(409).json({ message: 'Nome de usuário já cadastrado' });
                } else if (dados.email === email) {
                    return res.status(409).json({ message: 'E-mail já cadastrado' });
                }
            }

            const passwordHash = hashPassword(password)

            await db
                .updateTable('usuarios')
                .set({
                    nome: name,
                    username: username,
                    email: email,
                    setor: setor,
                    password_hash: passwordHash
                })
                .where('usr_id', '=', info)
                .executeTakeFirst()

            res.status(201).json({ message: 'Informações pessoais atualizadas!' })

        } catch (error) {
            console.error(error)
            res.status(400).json({ message: 'Não foi possivel autenticar' })
            return
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}