import { cript, decript } from "@/components";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// BUSCA OS DADOS DO EQUIPAMENTO PARA ABERTURA DE CHAMADO E //////////////////////////////
//////////////////////// ARMAZENA EM CACHE                                        //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getEquip = async ({ queryKey }) => {

    const [_, data] = queryKey;
    const { codCli, loja } = data;

    const getUrl = cript(`auxil_os?ccad=produtos&ccliente=${codCli}&cloja=${loja}`);

    const response = await api.get(`srcDataChamado/${getUrl.code}`);

    const { dtCli } = response.data;

    const produtos = decript(dtCli);

    return produtos;

}

export const createEquipQuery = (data) => {
    return useQuery({
        queryKey: ['equipamentos', data],
        queryFn: getEquip,
        staleTime: 1000 * 60 * 60 * 4, // TEMPO ATÉ OS DADOS FICAREM OBSOLETOS E OCORRER UM REFETCH SE REINICIAR O COMPONENTE OU A PAGE
        gcTime: 1000 * 60 * 60 * 5, // TEMPO ATÉ OS DADOS SEREM EXCLUIDOS PERMANENTEMENTE
    });
}



///////// OBSERVAÇÃO IMPORTANTE => O useQuery TEM UM REFETCH AUTOMATICO SE A REQUISIÇÃO FALHA
///////// DESSA FORMA EU JÁ TENHO UMA "CORREÇÃO" EM RELAÇÃO AS REQUISIÇÕES QUE DÃO PROBLEMA POR CAUSA DA CRIPTOGRAFIA