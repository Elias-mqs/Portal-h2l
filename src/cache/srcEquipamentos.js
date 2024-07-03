import { cript, decript } from '@/components';
import { api } from "@/utils/api";
import useSWR from "swr";



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// BUSCA OS DADOS DO EQUIPAMENTO PARA ABERTURA DE CHAMADO ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fetcher = async (url) => {
    const response = await api.get(url);
    const { dtCli } = response.data;
    console.log(response.data)
    return dtCli;
};

export function useSrcDataChamado(dados) {

    console.log(dados)

    const { codCli, loja } = dados;

    const getUrl = cript(`auxil_os?ccad=produtos&ccliente=${codCli}&cloja=${loja}`);


    const {data} = useSWR(`srcDataChamado/${getUrl.code}`, fetcher, {revalidateOnMount: false, revalidateOnFocus: false});

    console.log(data)

    return {
        data,
        // isLoading: !error && !data,
        // isError: error,
    };
}


// const srcDataChamado = async (data) => {

//     const { codCli, loja } = data;

//     try {

//         const getUrl = cript(`auxil_os?ccad=produtos&ccliente=${codCli}&cloja=${loja}`);

//         const response = await api.get(`srcDataChamado/${getUrl.code}`);

//         const { dtCli } = response.data;

//         const { produtos } = decript(dtCli);

//         return produtos;

//     } catch (error) {
//         console.error('Erro na requisição:', error);

//         let errorMessage = 'Verifique os campos e tente novamente.';
//         if (error.response) {
//             // Erro de resposta do servidor
//             errorMessage = error.response.data.message || errorMessage;
//         } else if (error.request) {
//             // Erro de requisição, sem resposta
//             errorMessage = 'Erro de rede, por favor, tente novamente mais tarde.';
//         }

//         toast({ position: 'top', title: "Erro", description: errorMessage, status: 'Info', duration: 2000, isClosable: true, });
//     }

// }