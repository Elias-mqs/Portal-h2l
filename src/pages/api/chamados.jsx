// src/pages/api/chamados.jsx

import { db } from '@/utils/database';

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const { serial, model, countPb, countCor, client, adress, officeHours, requester, sector, tel, incident, description, search } = req.body

        if (!serial) {
            return res.status(404).json({ message: 'Necessário informar uma série!' })
        }

        try {

            if (search) {
                const result = await db
                    .selectFrom('equipamentos')
                    .select(['equip_modelo', 'equip_contador_pb', 'equip_contador_cor'])
                    .where('equip_serie', '=', serial)
                    .execute();

                return res.status(201).json({ message: 'Sucesso na busca!', dados: result[0] })

            } else {

                // const busca = await db.selectFrom('chamados')
                //     .select(['contador_pb', 'contador_cor'])
                //     .where('serie', '=', serial)
                //     .executeTakeFirst()
                //     console.log(busca)

                // if (busca.contador_pb >= countPb && busca.contador_cor >= countCor) {
                //     return res.status(409).json({ message: 'Chamado já registrado para esse contador' })
                // } else {
                await db.insertInto('chamados')
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

                return res.status(201).json({ message: 'Chamado aberto com sucesso!' });
                // }

            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Não foi possivel autenticar!' })
            return
        }

    } else {
        res.status(405).json({ message: 'Método não permitido' })
    }
}
