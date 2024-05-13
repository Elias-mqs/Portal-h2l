import { db } from '@/utils/database'
import { hashPassword } from '@/utils'

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { name, username, email, password, setor, info, deleteUser } = req.body

        if (!info) {
            return res.status(404).json({ message: 'Problema no cadastro, contate um superior!' })
        }

        try {

            if(deleteUser === true){
                await db
                .deleteFrom('usuarios')
                .where('usr_id', '=', info)
                .executeTakeFirst()

                res.status(200).json({ message: 'Usuário deletado!' });
            }

            const passwordHash = password ? hashPassword(password) : null;

            const dadosUser = await db.selectFrom('usuarios')
                .select(['username', 'email', 'nome', 'password_hash', 'setor'])
                .where('usr_id', '=', info)
                .executeTakeFirst();

            const nomesRemapeados = { name: 'nome', username: 'username', email: 'email', password: 'password_hash', setor: 'setor' };

            // Verifica se pelo menos um campo foi alterado e cria um objeto com os novos valores
            const updatedFields = Object.keys(dadosUser).reduce((acc, key) => {
                // Ignora a comparação de senha, pois ela é criptografada
                if (key === 'password_hash') return acc;
                // Se o valor foi alterado, adiciona ao objeto de atualização
                const fieldName = Object.keys(nomesRemapeados).find(fieldName => nomesRemapeados[fieldName] === key);
                if (dadosUser[key] !== req.body[fieldName]) {
                    acc[key] = req.body[fieldName];
                }
                return acc;
            }, {});

            if (Object.keys(updatedFields).length === 0 && !password) {
                return res.status(400).json({ message: 'Por favor, altere pelo menos um campo.' });
            }

            // Se a senha foi alterada, adiciona ao objeto de atualização
            if (password) {
                updatedFields.password_hash = passwordHash;
            }

            if (updatedFields.username || updatedFields.email) {
                const tratandoDados = await db.selectFrom('usuarios')
                    .select(['username', 'email'])
                    .where((eb) => eb.or([
                        eb('username', '=', username),
                        eb('email', '=', email),
                    ]))
                    .executeTakeFirst();

                if (tratandoDados) {
                    if (tratandoDados.username === username) {
                        return res.status(409).json({ message: 'Nome de usuário já cadastrado' });
                    } else if (tratandoDados.email === email) {
                        return res.status(409).json({ message: 'E-mail já cadastrado' });
                    }
                }
            }

            await db
                .updateTable('usuarios')
                .set(updatedFields)
                .where('usr_id', '=', info)
                .executeTakeFirst()

            res.status(201).json({ message: 'Informações atualizadas!' })

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