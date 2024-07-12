import { createContext, useContext, useEffect } from "react";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { api } from '@/utils/api'
import { decript } from "@/components";
import { useAuth } from "@/context/AuthContext";


export interface UserData {
    admin: string,
    codCli: string,
    loja: string,

}

export interface DataUserContextType {
    data: QueryObserverResult<UserData[], unknown>;
}

interface UserProviderProps {
    children: React.ReactNode;
}


export const DataUserContext = createContext<DataUserContextType | null>(null)

export function UserProvider({ children }: UserProviderProps) {

    const { isAuthenticated, setRefetchFunction } = useAuth();
    const query = useQuery({

        queryKey: ['srcUser'],
        queryFn: async function srcUser() {

            const data = await api.get('userData');
            const result = decript(data.data);
            return result as UserData[];

        },
        enabled: true,
        refetchOnWindowFocus: false

    });
    
        useEffect(() => {
            setRefetchFunction(query.refetch);
        }, [query.refetch, setRefetchFunction]);
    
        useEffect(() => {
            if (isAuthenticated) {
                query.refetch;
            }
        }, [isAuthenticated, query.refetch]);

    if (!query || !query.data) {
        return;
    }
    if (query.isLoading) {
        return;
    }
    if (query.isError) {
        return;
    }

    return (
        <DataUserContext.Provider value={{ data: query }}>
            {children}
        </DataUserContext.Provider>
    )
}

export const userContext = (): DataUserContextType | null => useContext(DataUserContext);