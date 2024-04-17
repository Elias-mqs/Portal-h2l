import { HStack, Stack, Flex } from "@chakra-ui/react";
import { PageChamados } from "@/components";
import styles from "@/styles/Home.module.css";


export default function chamados() {
    return (
        <Stack bg='#FFF' w='100%' maxW={'100%'} transition='max-width 1s linear' overflow='auto' p='30px'
         borderRadius={'1rem'} boxShadow={{ base: 'none', md: '0px 1px 4px 1px rgba(0, 0, 0, 0.2)' }} >
            <PageChamados/>
        </Stack>
    )
}

