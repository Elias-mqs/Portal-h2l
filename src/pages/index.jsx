
// segundo código
import { SideBar, HeaderHome, HomePage } from "@/components";
import { HStack, VStack, Stack } from "@chakra-ui/react"


export default function Home() {
  return (

    <Stack w="100%" h="100vh" bg="#F0F2F5" padding='32px 32px 32px 32px'>
      <Stack>
        <HeaderHome />

      </Stack>
      {/* <VStack w='100%' h='100%'> */}
      {/* <Stack w='full' h='full' bg='#FFF' borderRadius='1rem' justify='center' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' >
        <HomePage />
      </Stack> */}
      {/* </VStack> */}
    </Stack>

  )
}
