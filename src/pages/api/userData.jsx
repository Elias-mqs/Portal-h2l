//src/pages/api/levelAuth.jsx
import { authenticate } from "@/utils"

////// FUNÇÃO PARA CONFERIR NIVEL DE ACESSO DO USER
async function userData(req, res) {
    try {
        const token = req.headers.authorization
        const user = await authenticate(token)
        res.status(200).json({ admin: user.admin, user: user })
    } catch (error) {
        console.error('Erro na autenticação do usuário:', error)
        res.status(500).json({ error: 'Erro na autenticação do usuário' })
    }
}

export default userData;
