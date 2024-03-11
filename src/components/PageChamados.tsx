import {
    Stack,
    Grid,
    GridItem,
    Text,
    Flex,
    Input,
    Box,
    FormControl,
    FormLabel,
    Select,
    Textarea
} from "@chakra-ui/react";



export default function PageChamados() {
    return (
        <Stack >
            <Grid templateColumns='repeat(3, 1fr)' gap={6} p='50px 30px 0 30px'>

                <GridItem w='100%' h='10'>
                    <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                        Nº de Série do equipamento:
                    </Text>
                    <Input variant='filled' placeholder='Número de série' borderWidth='1px' borderColor='#C7CCD0' />
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                        Modelo do equipamento:
                    </Text>
                    <Input variant='filled' placeholder='Modelo' borderWidth='1px' borderColor='#C7CCD0' />
                </GridItem>

                <Flex w='100%' h='10' flexDirection='column'>
                    <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                        Contador:
                    </Text>
                    <Flex flexDirection='row' gap={2}>

                        <Flex alignItems='center' w='100%' gap={2}>
                            <Text fontSize='14px' fontWeight={500} color='#9fa1a7'>P/B:</Text>
                            <Input variant='filled' placeholder='Contador' borderWidth='1px' borderColor='#C7CCD0' />
                        </Flex>
                        <Flex alignItems='center' w='100%' gap={2}>
                            <Text fontSize='14px' fontWeight={500} color='#9fa1a7'>COR:</Text>
                            <Input variant='filled' placeholder='Contador' borderWidth='1px' borderColor='#C7CCD0' />
                        </Flex>

                    </Flex>
                </Flex>

                <GridItem w='100%' h='10' marginTop='30px'>
                    <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                        Cliente:
                    </Text>
                    <Input variant='filled' placeholder='Cliente' borderWidth='1px' borderColor='#C7CCD0' />
                </GridItem>

                <GridItem w='100%' h='10' marginTop='30px'>
                    <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                        Endereço
                    </Text>
                    <Input variant='filled' placeholder='Endereço' borderWidth='1px' borderColor='#C7CCD0' />
                </GridItem>

                <Flex w='100%' h='10' flexDirection='column' marginTop='30px'>
                    <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                        Horário de funcionamento:
                    </Text>
                    <Flex flexDirection='row' gap={2} >

                        <Flex alignItems='center' gap={2}>
                            <Text fontSize='14px' fontWeight={500} color='#9fa1a7'>De:</Text>
                            <Input variant='filled' placeholder='00:00' borderWidth='1px' borderColor='#C7CCD0' p='0px 3px' textAlign='center' />
                        </Flex>
                        <Flex alignItems='center' gap={2}>
                            <Text fontSize='14px' fontWeight={500} color='#9fa1a7'>à:</Text>
                            <Input variant='filled' placeholder='00:00' borderWidth='1px' borderColor='#C7CCD0' p='0px 3px' textAlign='center' />
                        </Flex>
                        <Flex alignItems='center' gap={2}>
                            <Text fontSize='14px' fontWeight={500} color='#9fa1a7' whiteSpace='nowrap'>e de</Text>
                            <Input variant='filled' placeholder='00:00' borderWidth='1px' borderColor='#C7CCD0' p='0px 3px' textAlign='center' />
                        </Flex>
                        <Flex alignItems='center' gap={2}>
                            <Text fontSize='14px' fontWeight={500} color='#9fa1a7'>à:</Text>
                            <Input variant='filled' placeholder='00:00' borderWidth='1px' borderColor='#C7CCD0' p='0px 3px' textAlign='center' />
                        </Flex>

                    </Flex>
                </Flex>

                <GridItem w='100%' h='10' marginTop='30px'>
                    <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                        Solicitante:
                    </Text>
                    <Input variant='filled' placeholder='Solicitante' borderWidth='1px' borderColor='#C7CCD0' />
                </GridItem>


                <Flex w='100%' h='10' marginTop='30px' flexDirection='row' gap='10px'>
                    <Box w='100%'>
                        <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                            Setor:
                        </Text>
                        <Input variant='filled' placeholder='Setor' borderWidth='1px' borderColor='#C7CCD0' />
                    </Box>

                    <Box w='100%'>
                        <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                            Telefone:
                        </Text>
                        <Input
                            variant='filled'
                            type='tel'
                            name='telefone'
                            pattern='\([0-9]{2}\) [0-9]{5}-[0-9]{4}'
                            placeholder='(XX) XXXXX-XXXX'
                            borderWidth='1px'
                            borderColor='#C7CCD0'
                            required
                        />
                    </Box>
                </Flex>

                <Flex />

                <GridItem >
                    <FormControl marginTop='30px' >
                        <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                            Ocorrência:
                        </Text>
                        <Select variant='filled' placeholder='Ocorrência' borderWidth='1px' borderColor='#C7CCD0' >
                            <option>teste</option>
                            <option>teste</option>
                            <option>teste</option>
                            <option>teste</option>
                            <option>teste</option>
                            <option>teste</option>
                        </Select>
                    </FormControl>
                </GridItem>

                <Flex />
                <Flex />


                <GridItem colSpan={2} rowSpan={4} >
                    <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                        Descrição:
                    </Text>
                    <Box>
                        <Textarea placeholder='Digite aqui' />
                        {/* <Input placeholder='Digite aqui' h='100px' width='100%' overflowWrap='break-word' /> */}
                    </Box>
                </GridItem>





            </Grid>
        </Stack>
    )
}
