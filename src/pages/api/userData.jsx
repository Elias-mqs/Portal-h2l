//src/pages/api/levelAuth.jsx
import { authenticate } from "@/utils"

////// FUNÇÃO PARA CONFERIR NIVEL DE ACESSO DO USER
async function userData(req, res) {
    try {
        const token = req.headers.authorization
        const data = await authenticate(token)
        const user = [{ email: data.email, name: data.nome, setor: data.setor, username: data.username, admin: data.admin }];
        const info = data.usr_id
        res.status(200).json({ user: user[0], info })
    } catch (error) {
        console.error('Erro na autenticação do usuário:', error)
        res.status(500).json({ error: 'Erro na autenticação do usuário' })
    }
}

export default userData;
