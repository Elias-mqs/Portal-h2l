import { db } from '@/utils/database'

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const dados = req.body
        console.log(dados)

        if (!dados) {
            res.status(404).json({ message: 'Necessário digitar alguma informação' })
        }

        try {

            // const user = dados.dados
            const user = await db
                .selectFrom('usuarios')
                .select(['nome as name', 'email', 'setor', 'username', 'usr_id as info'])
                .where((eb) => eb.or([
                    eb('nome', 'like', `%${dados.dados}%`),
                    eb('username', 'like', `%${dados.dados}%`),
                    eb('email', 'like', `%${dados.dados}%`),
                    eb('setor', 'like', `%${dados.dados}%`)
                ]))
                .execute();

            console.log(user)

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