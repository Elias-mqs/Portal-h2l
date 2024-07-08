import { cript, decript } from '@/utils'


export default async function handler(req, res) {

    const getUrl = process.env.URLAPI;

    if (req.method === 'POST') {

        const dados = decript(req.body.code);

        if (!dados) {
            return res.status(404).json({ message: 'Verifique os dados.' })
        }

        const data = {
            CODCLI: dados.codCli,
            LOJA: dados.loja,
            ATEND: dados.atend,
            CONTATO: dados.contato,
            CONTADOR: dados.acumulador,
            TEL: dados.tel,
            CCHMOS: '1',
            ITEM: [
                {
                    ITEM: '01',
                    CODPRO: dados.codProd,
                    NUMSER: dados.numserie,
                    CODPRB: dados.incident,
                    MEMO1: dados.memo
                },
            ],
        };

        console.log(data)

        const dataJson = JSON.stringify(data);

        try {

            ////// variavel de teste abaixo
            let response = dataJson;
            

            //////// API FUNCIONANDO CERTINHO, VOU DEIXAR COMENTADO PARA NÃO ABRIR CHAMADO SEM QUERER
            //////// DEIXEI VARIÁVEIS DE TESTE PARA SIMULAR UMA ABERTURA DE CHAMADO

            // let response = await fetch(`${getUrl}CHAMADOS_H2L/INCLUIR/POST`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: dataJson
            // });
    
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
    
            // let result = await response.json();
            
            ////// variavel de teste abaixo            
            let result = response;


            console.log("Success:", result);
            return res.status(200).json({ message: 'Chamado aberto com sucesso!' })

        } catch (error) {
            console.error(error)
            res.status(400).json({ message: 'Não foi possivel autenticar!' })
            return
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}