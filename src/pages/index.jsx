
// segundo código
import { SideBar, Header, HomePage } from "@/components";
import { HStack, VStack, Stack } from "@chakra-ui/react"


export default function Home() {
  return (
    <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'100%'} transition='max-width 1s linear' p='30px'
      borderRadius={{ base: 0, md: '1rem' }} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} overflow='auto'
      sx={{ '&::-webkit-scrollbar': { display: 'none', 'msOverflowStyle': 'none', } }} >
      <HomePage />
    </Stack>


  )
}
