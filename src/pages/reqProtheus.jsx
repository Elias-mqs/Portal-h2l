import { Box, Flex, Stack, Grid, Text } from "@chakra-ui/react";

export default function reqProtheus() {
    return (
        <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'100%'} transition='max-width 1s linear' p='30px'
            borderRadius={{ base: 0, md: '1rem' }} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} overflow='auto'
            sx={{ '&::-webkit-scrollbar': { display: 'none', 'msOverflowStyle': 'none', } }} >

            <Stack w='100%' h='100%'>

                <Grid templateColumns='repeat(7, 1fr)' border='2px solid #F0F0F0' borderRadius='8px' gap={2} >
                    <Flex justify='center'>Chamado</Flex>
                    <Flex justify='center'>Série</Flex>
                    <Flex justify='center'>Emissão</Flex>
                    <Flex justify='center'>Cliente</Flex>
                    <Flex justify='center'>Loja</Flex>
                    <Flex justify='center'>Nome Contato</Flex>
                    <Flex justify='center'><Text w='100%'>Nome Atendente</Text></Flex>
                </Grid>

                <Box w='100%' h='2px' bg='#B0B0B0' mb={2}></Box>

                <Grid templateColumns='repeat(7, 1fr)' pb={1} borderBottom='1px solid #E0E0E0' >
                    <Flex justify='center'>487503</Flex>
                    <Flex justify='center'>3AS516AS12</Flex>
                    <Flex justify='center'>16/05/2024</Flex>
                    <Flex justify='center'>002231</Flex>
                    <Flex justify='center'>04</Flex>
                    <Flex justify='center'>DENIS</Flex>
                    <Flex justify='center'>ELIAS MARQUES</Flex>
                </Grid>
                


            </Stack>

        </Stack>
    )
}