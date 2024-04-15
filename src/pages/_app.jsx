//src/pages/_app.jsx
import { Header } from "@/components";
import { ChakraProvider, Stack, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const hideOnRoutes = ['/login'];
  const [isOpen, setIsOpen] = useState(true);
  const toggleHeader = () => { setIsOpen(!isOpen); };

  return (
    <ChakraProvider>
      {hideOnRoutes.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (

        <Stack w='100%' h='100vh' position='fixed' bg='#F0F2F5' p={{ base: 0, md: '32px' }}>
          <Header isOpen={isOpen} toggleSidebar={toggleHeader} />
          <Flex maxW={isOpen ? 'calc(100% - 200px)' : 'calc(100%-50px)'} align='end' justify={'flex-end'} position='relative' transition={'all .5 linear'} >
          <Component {...pageProps} />
          </Flex>
        </Stack>

      )}
    </ChakraProvider>
  )
}
