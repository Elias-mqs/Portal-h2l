//src/pages/_app.jsx
import React from 'react'
import { Header, NavigationTabs, Container } from "@/components";
import { Stack, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { UserProvider } from '@/context/userContext'
import { AuthProvider } from '@/context/AuthContext';
import { SearchCliProvider } from '@/context/ResearchesContext';


export default function RouteNavigation({ children }) {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const toggleHeader = () => { setIsOpen(!isOpen); };
    const { navTabs, activeTab } = NavigationTabs();

    const hideOnRoutes = ['/login', '/recoveryPass'];
    const validRoutes = ['/novoChamado', '/teste', '/users', '/', '/emAndamento', '/pedidos', '/reqProtheus']

    return (
        <AuthProvider>
            <SearchCliProvider>

                <Stack>

                    {hideOnRoutes.includes(router.pathname) || !validRoutes.includes(router.pathname) ? (
                        children
                    ) : (

                        <UserProvider>
                            <Flex w='100%' h='100%' position={'fixed'} direction='column' bg='#F0F2F5' p={{ base: 0, md: '32px' }} >
                                <Box aria-label='container-header'>
                                    <Header isOpen={isOpen} toggleSidebar={toggleHeader} navTabs={navTabs} activeTab={activeTab} />
                                </Box>
                                <Flex aria-label='container-page' justify={'flex-end'} flex='1' sx={{ '&::-webkit-scrollbar': { display: 'none', 'msOverflowStyle': 'none', } }} overflow='auto'  >
                                    <Container isOpen={isOpen} >
                                        {children}
                                    </Container>
                                </Flex>
                            </Flex>
                        </UserProvider>

                    )}

                </Stack>
                
            </SearchCliProvider>
        </AuthProvider>
    )
}

