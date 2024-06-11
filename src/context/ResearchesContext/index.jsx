import { useDisclosure } from '@chakra-ui/react';
import React, { createContext, useState, useContext } from 'react';

const SearchCliContext = createContext();

export function SearchCliProvider({ children }) {
    
    const isOpenSearch = useDisclosure()

    // const searchEmpresa = async (e) => {
    //     e.preventDefault()

    //     try{

    //     }catch(error){

    //     }

    // }

    return (
        <SearchCliContext.Provider value={{ modal: isOpenSearch }}>
            {children}
        </SearchCliContext.Provider>
    );
}

export const useSearchCli = () => useContext(SearchCliContext);
