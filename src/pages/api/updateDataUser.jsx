import { db } from '@/utils/database'
import { hashPassword } from '@/utils'

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { name, username, email, password, setor, info } = req.body
        const values = [name, username, email, password, setor]
        const valuesComparation = req.body

        if (!info) {
            return res.status(404).json({ message: 'Problema no cadastro, contate um superior!' })
        }

        if (values.some(value => value)) {
            try {

                const passwordHash = hashPassword(password)

                const dadosUser = await db.selectFrom('usuarios')
                    .select(['username', 'email', 'nome', 'password_hash', 'setor'])
                    .where('usr_id', '=', info)
                    .executeTakeFirst();

                    console.log(dadosUser)
                    console.log(valuesComparation)

                const dadosGeral = await db.selectFrom('usuarios')
                    .select(['username', 'email'])
                    .where((eb) => eb.or([
                        eb('username', 'like', dadosUser.username),
                        eb('email', 'like', dadosUser.email),
                    ]))
                    .executeTakeFirst();

                    console.log(dadosGeral)




















                    ///////TERMINAR LÓGICA PARA COMPARAR OS DADOS E VERIFICAR SE O USUÁRIO INFORMOU PELO MENOS UM DADO PARA ALTERAR
                    /////// O PROBLEMA QUE ESTÁ OCORRENDO É QUE O DADOSUSER É NOME E O VALUESCOMPARATION É NAME
                    if(dadosUser === valuesComparation){
                        console.log('retornar um res com mensagem dizendo para alterar pelo menos um dado')
                    }

                if (dadosUser) {
                    if (!dadosUser.username === username) {
                        if (dadosUser.username === dadosGeral.username) {
                            return res.status(409).json({ message: 'Nome de usuário já cadastrado' });
                        }
                    } else if (!dadosUser.email === email) {
                        if (dadosUser.email === dadosGeral.email) {
                            return res.status(409).json({ message: 'E-mail já cadastrado' });
                        }
                    }
                }


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
            return res.status(404).json({ message: 'Necessario informar ao menos 1 dado' })
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}