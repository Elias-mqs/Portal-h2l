import { db } from '@/utils/database'
import { hashPassword, decript } from '@/utils'


export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { password, info } = decript(req.body.code);


        if (!info || !password) {
            return res.status(404).json({ message: 'Problema no cadastro, contate um superior!' });
        }


        try {

            const passwordHash = hashPassword(password);

            const dadosUser = await db.selectFrom('usuarios')
                .select(['password_hash'])
                .where('usr_id', '=', info)
                .executeTakeFirst();

            if (passwordHash === dadosUser.password_hash) {
                res.status(400).json({ message: 'Verifique o campo e tente novamente.' });
                return
            }


            await db
                .updateTable('usuarios')
                .set({
                    password_hash: passwordHash
                })
                .where('usr_id', '=', info)
                .executeTakeFirst();

            res.status(201).json({ message: 'Senha atualizada!' });



        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Não foi possivel autenticar' });
            return
        }


    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
