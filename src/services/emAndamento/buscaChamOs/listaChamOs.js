import { cript, decript } from "@/components";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// BUSCA A LISTA DE OS CONFORME OS DADOS DO USUÁRIO(CODCLI E LOJA) //////////////////////////////
//////////////////////// ARMAZENA EM CACHE                                             ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getChamOs = async ({ queryKey }) => {

    const [_, data] = queryKey;
    const { codCli, loja, admin } = data;

    if (admin === '0' || admin === '1') {
        const getUrl = cript(`LISTA_CHAMADO_OS?ccliente=${codCli}&cloja=${loja}`);

        const response = await api.get(`srcListChamOs/${getUrl.code}`);

        const { dtCli } = response.data;

        const listChamOs = decript(dtCli);

        return listChamOs;
    }


    /// ADMIN G, ADMIN B E OPERADORES VÃO RECEBER TODOS OS CHAMADOS DO CLIENTE QUE INFORMAREM(A LOJA VAI SER FILTRADA NO CÓDIGO DA PAGE MESMO)
    if (admin === '2' || admin === '3' || admin === '4') {
        const getUrl = cript(`LISTA_CHAMADO_OS?ccliente=${codCli}`);

        const response = await api.get(`srcListChamOs/${getUrl.code}`);

        const { dtCli } = response.data;

        const listChamOs = decript(dtCli);

        return listChamOs;
    }

    return;

}

export const listChamOsquery = (data) => {
    console.log("Data received:", data); // Verifique o que está sendo passado como data
    return useQuery({
        queryKey: ['listChamOs', data], // Verifique se data está em um formato correto para queryKey
        queryFn: getChamOs,
        staleTime: 1000 * 60 * 60 * 4,
        gcTime: 1000 * 60 * 60 * 5,
    });
}




///////// OBSERVAÇÃO IMPORTANTE => O useQuery TEM UM REFETCH AUTOMATICO SE A REQUISIÇÃO FALHA
///////// DESSA FORMA EU JÁ TENHO UMA "CORREÇÃO" EM RELAÇÃO AS REQUISIÇÕES QUE DÃO PROBLEMA POR CAUSA DA CRIPTOGRAFIA