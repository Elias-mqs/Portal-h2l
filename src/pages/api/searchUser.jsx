import { db } from '@/utils/database'

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const { dados, levelUser } = req.body

        if (!dados) {
            res.status(404).json({ message: 'Necessário digitar alguma informação' })
        }

        if(!levelUser){
            console.log('Nivel de usuário não permite essa ação')
            res.status(401).json({ message: 'Erro' })
        }

        let authLevel;

        if (levelUser === 1) {
            authLevel = 'NULL';
        } else if (levelUser === 2) {
            authLevel = 1;
        }

        try {

            let query = db
                .selectFrom('usuarios')
                .select(['nome as name', 'email', 'setor', 'username', 'usr_id as info'])
                .where((eb) => eb.or([
                    eb('nome', 'like', `%${dados}%`),
                    eb('username', 'like', `%${dados}%`),
                    eb('email', 'like', `%${dados}%`),
                    eb('setor', 'like', `%${dados}%`)
                ]))

            if (authLevel !== undefined) {
                query = query.where('admin', '=', authLevel);
            }

            const user = await query.execute();
            res.status(200).json({ user })

        } catch (error) {
            console.error(error)
            res.status(404).json({ message: 'Não foi possivel proseguir com a busca!' })
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}