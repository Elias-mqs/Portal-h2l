//src/pages/_app.jsx
import { ChakraProvider } from "@chakra-ui/react";
import { RouteNavigation } from "@/components";
import Head from 'next/head';

export default function App({ Component, ...pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>Portal H2L</title>
        <link rel='icon' type='image/png' href='/img/LOGO-H2L.png' />
      </Head>
      <RouteNavigation>
        <Component {...pageProps} />
      </RouteNavigation>
    </ChakraProvider>
  )
}
