//src/pages/_app.jsx
import { ChakraProvider } from "@chakra-ui/react";
import { RouteNavigation } from "@/components";

export default function App({ Component, ...pageProps }){
return (
  <ChakraProvider>
    <RouteNavigation>
      <Component {...pageProps} />
    </RouteNavigation>
  </ChakraProvider>
  )
}
