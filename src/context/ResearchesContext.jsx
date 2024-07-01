import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { createContext, useContext } from 'react';
import { api } from '@/utils/api'
import { cript, decript } from '@/components';

const SearchCliContext = createContext();

export function SearchCliProvider({ children }) {

    const isOpenSearch = useDisclosure()
    const toast = useToast();


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////// ESSA FUNÇÃO É PARA FAZER A BUSCA DO NOME DA EMPRESA PESQUISANDO PELO codCli E loja //////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleSearch = async (datas) => {

        const dataCli = { ...datas }

        if (dataCli.codCli === '' || dataCli.loja === '') {
            toast({ position: 'top', title: "", description: "Verifique os campos e tente novamente.", status: 'info', duration: 2000, isClosable: true, });
            return
        }

        if (dataCli.codCli.length < 6 || dataCli.loja.length < 2) {
            dataCli.codCli = dataCli.codCli.padStart(6, '0');
            dataCli.loja = dataCli.loja.padStart(2, '0')
        }

        try {

            const getUrl = cript(`auxil_os?ccad=loja&ccliente=${dataCli.codCli}&cloja=${dataCli.loja.toUpperCase()}`);

            const response = await api.get(`srcNomeCliCod/${getUrl.code}`);

            const data = decript(response.data.dtCli)

            const filialCliente = { nome: data.filiais[0].nome, codCli: dataCli.codCli, loja: dataCli.loja }

            return filialCliente

        } catch (error) {
            toast({ position: 'top', title: "", description: "Verifique os campos e tente novamente.", status: 'info', duration: 2000, isClosable: true, });
        }

    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////// ESSA FUNÇÃO É PARA FAZER A BUSCA DO NOME DA EMPRESA PESQUISANDO PELO NOME ///////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const srcNomeCli = async (datas) => {


        if (!datas || !datas.codCli) {
            toast({ position: 'top', title: "Erro", description: "Código do cliente não fornecido.", status: 'error', duration: 2000, isClosable: true });
            return;
        }

        try {

            const getUrl = cript(`auxil_os?ccad=loja&ccliente=${datas.codCli}`);

            const response = await api.get(`srcNomeCli/${getUrl.code}`);

            const { dtCli } = response.data;

            const { filiais } = decript(dtCli);

            return filiais;

        } catch (error) {
            console.error('Erro na requisição:', error);

            let errorMessage = 'Verifique os campos e tente novamente.';
            if (error.response) {
                // Erro de resposta do servidor
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                // Erro de requisição, sem resposta
                errorMessage = 'Erro de rede, por favor, tente novamente mais tarde.';
            }

            toast({ position: 'top', title: "Erro", description: errorMessage, status: 'error', duration: 2000, isClosable: true, });
        }
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////// BUSCA OS DADOS DO EQUIPAMENTO PARA ABERTURA DE CHAMADO ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const srcDataChamado = async (serialNumber) => {

        if (!serialNumber) {
            toast({ position: 'top', title: "Atenção", description: "Número de série não fornecido.", status: 'info', duration: 2000, isClosable: true });
            return;
        }

        try {

            const getUrl = cript(`consulta?cserial=${serialNumber}`);

            const response = await api.get(`srcDataChamado/${getUrl.code}`);

            const { dtCli } = response.data;

            const { codequi } = decript(dtCli);

            return codequi[0];

        } catch (error) {
            console.error('Erro na requisição:', error);

            let errorMessage = 'Verifique os campos e tente novamente.';
            if (error.response) {
                // Erro de resposta do servidor
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                // Erro de requisição, sem resposta
                errorMessage = 'Erro de rede, por favor, tente novamente mais tarde.';
            }

            toast({ position: 'top', title: "Erro", description: errorMessage, status: 'error', duration: 2000, isClosable: true, });
        }

    }


    return (
        <SearchCliContext.Provider value={{ modal: isOpenSearch, handleSearch, srcNomeCli, srcDataChamado }}>
            {children}
        </SearchCliContext.Provider>
    );
}

export const useSearchCli = () => useContext(SearchCliContext);
