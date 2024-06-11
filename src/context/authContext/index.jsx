import React, { createContext, useState, useContext, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [refetch, setRefetch] = useState(null);

    const login = useCallback(() => {
        setIsAuthenticated(true);
        if (refetch) {
            refetch();
        }
    }, [refetch]);

    const setRefetchFunction = (refetchFn) => {
        setRefetch(() => refetchFn);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, setRefetchFunction }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
