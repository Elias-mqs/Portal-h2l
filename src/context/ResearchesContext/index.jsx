import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { createContext, useContext, useState } from 'react';
import { api2 } from '@/utils/api'

const SearchCliContext = createContext();

export function SearchCliProvider({ children }) {

    const isOpenSearch = useDisclosure()
    const toast = useToast();
    const [filialCli, setFilialCli] = useState({ nome: '', codCli:'', loja:'' })


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
            const { data } = await api2.get('auxil_os?ccad=loja&ccliente=' + dataCli.codCli + '&cloja=' + dataCli.loja);
            setFilialCli({nome: data.filiais[0].nome, codCli: dataCli.codCli, loja: dataCli.loja})
            // return {nome: datafiliais[0].nome, codCli: dataCli.codCli, loja:dataCli.loja}

        } catch (error) {
            toast({ position: 'top', title: "", description: "Verifique os campos e tente novamente.", status: 'info', duration: 2000, isClosable: true, });
        }
    }


    return (
        <SearchCliContext.Provider value={{ modal: isOpenSearch, handleSearch, nomeCli: filialCli, setFilialCli }}>
            {children}
        </SearchCliContext.Provider>
    );
}

export const useSearchCli = () => useContext(SearchCliContext);
