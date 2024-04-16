import { Stack, HStack, VStack, Flex, Container, Box } from "@chakra-ui/react";
import PageChamadosTeste from "@/components/PageChamadosTeste";


export default function chamados() {
    
    return (
        <Stack bg='#FFF' w='100%' maxW={'100%'} transition='max-width 1s linear' overflow='auto' p='30px' >
            <PageChamadosTeste/>
        </Stack>
        
    )
}

