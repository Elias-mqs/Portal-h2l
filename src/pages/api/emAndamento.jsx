import { db } from '@/utils/database'

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const { chamado } = req.body

        if(!chamado){
           return res.status(401).json({ message: 'Erro' })
        }

        try{

            // adicionar tecnico no select

            const chamados = await db
            .selectFrom('chamados')
            .select([ 'ordem_servico as os', 'chamado_id as chamado', 'status', 'serie', 'ocorrencia', 'data_solicitacao as data' ])
            .where('chamado_id', '=', chamado)
            .execute()

            console.log(chamados[0].serie)

            return res.status(200).json({ chamados })

        }catch(error){
            console.error(error)
            res.status(400).json({ message: 'Não foi possivel autenticar' })
            return
        }


    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}