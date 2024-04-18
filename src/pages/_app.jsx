//src/pages/_app.jsx
import { Header } from "@/components";
import { ChakraProvider, Stack, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const hideOnRoutes = ['/login', ,];
  const [isOpen, setIsOpen] = useState(true);
  const toggleHeader = () => { setIsOpen(!isOpen); };


  return (
    <ChakraProvider>
      {hideOnRoutes.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Flex w='100%' h='100vh' position={'fixed'} direction='column' bg='#F0F2F5' p={{ base: 0, md: '32px' }} >
          <Box aria-label='container-header'>
            <Header isOpen={isOpen} toggleSidebar={toggleHeader} />
          </Box>
          <Flex aria-label='container-page' justify={'flex-end'} flex='1' sx={{ '&::-webkit-scrollbar': { display: 'none', '-ms-overflow-style': 'none', } }} overflow='auto'  >
            <Stack w={{ base: '100%', md: `calc(100% - ${isOpen ? '170px' : '50px'})` }} h='100%' p={{ base: '0', md: '5px 0 0 10px' }}  >
              <Component {...pageProps} />
            </Stack>
          </Flex>
        </Flex>

      )}
    </ChakraProvider>
  )
}
