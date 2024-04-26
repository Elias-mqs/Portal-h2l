//src/pages/_app.jsx
import { Header, NavigationTabs, Container } from "@/components";
import { Stack, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RouteNavigation({ children }) {

    const router = useRouter();
    const hideOnRoutes = ['/login', '/recoveryPass',];
    const [isOpen, setIsOpen] = useState(true);
    const toggleHeader = () => { setIsOpen(!isOpen); };

    const { navTabs, activeTab } = NavigationTabs();
    const xxxl = '1536px';

    return (
        <Stack >

            {hideOnRoutes.includes(router.pathname) ? (
                children
            ) : (

                <Flex w='100%' h='100%' position={'fixed'} align='center' direction='column' bg='#F0F2F5' p={{ base: 0, md: '32px' }} >
                    <Stack aria-label='teste' w='100%' maxW={xxxl} h='2000px' align='center' overflow='auto' >
                        <Stack aria-label='container-header' w='100%' >
                            <Header isOpen={isOpen} toggleSidebar={toggleHeader} navTabs={navTabs} activeTab={activeTab} />
                        </Stack>
                        <Flex aria-label='container-page' justify={'flex-end'} flex='1' sx={{ '&::-webkit-scrollbar': { display: 'none', 'msOverflowStyle': 'none', } }} overflow='auto'  >
                            <Container isOpen={isOpen}>
                                {children}
                            </Container>
                        </Flex>
                    </Stack>
                </Flex>

            )}
        </Stack>
    )
}
