import { createContext, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from '@/utils/api'
import { decript } from "@/components";
import { useAuth } from "@/context/AuthContext";

export const DataUserContext = createContext(null)

export function UserProvider({ children }) {

    const { isAuthenticated, setRefetchFunction } = useAuth();
    const query = useQuery({

        queryKey: ['srcUser'],
        queryFn: async function srcUser() {

            const data = await api.get('userData');
            const result = decript(data.data);
            return result

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

export const userContext = () => useContext(DataUserContext);