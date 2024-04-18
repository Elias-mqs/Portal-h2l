import { Stack } from "@chakra-ui/react";
import PageChamadosTeste from "@/components/PageChamadosTeste";


export default function chamados() {
    
    return (
        <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'auto'} max={'100%'} transition='max-width 1s linear' p='30px' 
         borderRadius={{base: 0, md: '1rem'}} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} >
            <PageChamadosTeste/>
        </Stack>
        
    )
}

