
import { Stack } from "@chakra-ui/react";
import { PageChamados } from "@/components";


export default function novo() {
    
    return (
        <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'auto'} transition='max-width 1s linear' p='30px' 
         borderRadius={{base: 0, md: '1rem'}} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} >
            <PageChamados/>
        </Stack>
        
    )
}

