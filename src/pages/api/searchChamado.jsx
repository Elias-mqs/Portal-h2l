

export default async function handler(res, req){

    console.log(req.body)

    if (req.method === 'POST') {

        const { usr_id } = req.body 
        console.log(usr_id)

        if(!usr_id){
            console.log(usr_id)
            console.log('Erro na api searchChamado')
        }

        try{

            const chamados = await db
            .selectFrom('chamados')
            .select([ 'ordem_servico as os', 'chamado_id as chamado', 'status', 'serie', 'ocorrencia', 'tecnico', 'data_solicitacao as data' ])
            .where('usr_id', '=', usr_id)
            .execute()

            console.log(chamados)

            // return res.status(200).json({ chamados })

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