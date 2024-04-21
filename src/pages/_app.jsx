//src/pages/_app.jsx
import { Header, NavigationTabs, Container } from "@/components";
import { ChakraProvider, Stack, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const hideOnRoutes = ['/login', ,];
  const [isOpen, setIsOpen] = useState(true);
  const toggleHeader = () => { setIsOpen(!isOpen); };

  const { navTabs, activeTab } = NavigationTabs();

  return (
    <ChakraProvider>
      {hideOnRoutes.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (

        <Flex w='100%' h='100%' position={'fixed'} direction='column' bg='#F0F2F5' p={{ base: 0, md: '32px' }} >
          <Box aria-label='container-header'>
            <Header isOpen={isOpen} toggleSidebar={toggleHeader} navTabs={navTabs} activeTab={activeTab} />
          </Box>
          <Flex aria-label='container-page' justify={'flex-end'} flex='1' sx={{ '&::-webkit-scrollbar': { display: 'none', 'msOverflowStyle': 'none', } }} overflow='auto'  >
            <Container isOpen={isOpen}>
              <Component {...pageProps} isOpen={isOpen} />
            </Container>
          </Flex>
        </Flex>

      )}
    </ChakraProvider>
  )
}
