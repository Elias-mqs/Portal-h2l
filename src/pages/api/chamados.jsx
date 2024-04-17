import { db } from '@/utils/database';

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const { serial, model, countPb, countCor, client, adress, officeHours, requester, sector, tel, incident, description } = req.body

        try {

            db.insertInto('chamados')
                .values({
                    serie: serial,
                    modelo: model,
                    contador_pb: countPb,
                    contador_cor: countCor,
                    cliente: client,
                    endereco: adress,
                    horario_atendimento: officeHours,
                    solicitante: requester,
                    setor: sector,
                    telefone: tel,
                    ocorrencia: incident,
                    descricao: description,
                })
                .execute();

            return res.status(201).json({ message: 'Chamado aberto com sucesso' });

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Não foi possivel autenticar' })
            return
        }

    } else {
        res.status(405).json({ message: 'Método não permitido' })
    }
}