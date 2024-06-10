//src/pages/_app.jsx
import { ChakraProvider } from "@chakra-ui/react";
import { RouteNavigation } from "@/components";
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from "@tanstack/react-query";
import Head from 'next/head';

export default function App({ Component, ...pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Head>
          <title>Portal H2L</title>
          <link rel='icon' type='image/png' href='/img/LOGO-H2L.png' />
        </Head>
        <RouteNavigation>
          <Component {...pageProps} />
        </RouteNavigation>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
