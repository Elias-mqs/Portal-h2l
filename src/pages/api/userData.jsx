//src/pages/api/levelAuth.jsx
import { authenticate, cript } from "@/utils"

////// FUNÇÃO PARA CONFERIR NIVEL DE ACESSO DO USER
async function userData(req, res) {

    if (req.method === 'GET') {

        try {

            const token = req.headers.authorization
            const data = await authenticate(token)
            const user = [{ email: data.email, name: data.nome, setor: data.setor, username: data.username, admin: data.admin }];
            const info = data.usr_id
            const dataCrypt = [user, info]
            const newData = cript(dataCrypt)

            res.status(200).json(newData.code)

        } catch (error) {
            console.error('Erro na autenticação do usuário:', error)
            res.status(500).json({ error: 'Erro' }) //Erro na autenticação do usuário
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default userData;


