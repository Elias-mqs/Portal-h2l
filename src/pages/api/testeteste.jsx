import { db } from '@/utils/database'

export default async function handler(req, res) {

    if (req.method === 'GET') {

        const { nome } = req.body

        console.log(req)

        if (!nome) {
            return res.status(404)
        }

        try {
            const resposta = 'Tudo certo!!'
            console.log(resposta)
            res.status(200).json({ mensagem: 'tudo certo', resposta })
        } catch (error) {
            console.log(error)
        }



        // try{

        //     const chamados = await db
        //     .selectFrom('chamados')
        //     .select([ 'ordem_servico as os', 'chamado_id as chamado', 'status', 'serie', 'ocorrencia', 'tecnico', 'data_solicitacao as data' ])
        //     .where('chamado_id', 'like', `%${chamado}%`)
        //     .where('usr_id', '=', info )
        //     .execute()

        //     return res.status(200).json({ chamados })

        // }catch(error){
        //     console.error(error)
        //     res.status(400).json({ message: 'Não foi possivel autenticar' })
        //     return
        // }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}