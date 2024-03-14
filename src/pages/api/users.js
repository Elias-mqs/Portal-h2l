import { db } from '../../database'

export default async function handler(req, res) {

    try {
        const users = await db.query('SELECT * FROM usuarios');
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao consultar usuários:', error);
        res.status(500).json({ error: 'Erro ao consultar usuários' });
    }




}