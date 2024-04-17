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
        <Box w='100%' h='100vh' position={'fixed'} direction='column' bg='#F0F2F5' p={{ base: 0, md: '32px' }} >
          <Box>
            <Header isOpen={isOpen} toggleSidebar={toggleHeader} />
          </Box>
          <Flex justify={'flex-end'} >
            <Stack w={{ base: '100%', md: `calc(100% - ${isOpen ? '170px' : '50px'})` }}  pl={{ base: '0', md: '10px' }}  >
              <Component {...pageProps} />
            </Stack>
          </Flex>
        </Box>

      )}
    </ChakraProvider>
  )
}
