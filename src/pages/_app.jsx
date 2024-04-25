//src/pages/_app.jsx
import { ChakraProvider } from "@chakra-ui/react";
import { RouteNavigation } from "@/components";


export default function App({ Component, pageProps, isOpen }) {

  return (
    <ChakraProvider>
      <RouteNavigation>
      <Component {...pageProps} isOpen={isOpen} />
      </RouteNavigation>
    </ChakraProvider>
  )
}
