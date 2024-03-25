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
    Textarea,
    Button,
} from "@chakra-ui/react";
import { HeaderChamados } from ".";



export default function PageChamados() {

        const handleSubmit = (event) => { // Aqui é pra não mandar por padrão
            // Aqui da pra fazer uma lógica pra manipular o envio do formulario
            event.preventDefault();
        }

    return (
        
        
        <Stack >
            <form>


                <Grid templateColumns='repeat(3, 1fr)' gap={6} p='50px 30px 0 30px'>

                    <GridItem w='100%' h='10'>
                        <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                            Nº de Série do equipamento:
                        </Text>
                        <Input type='text' name='serie' variant='filled' placeholder='Número de série' borderWidth='1px' borderColor='#C7CCD0' required />
                    </GridItem>

                    <GridItem w='100%' h='10'>
                        <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                            Modelo do equipamento:
                        </Text>
                        {/* Nesse input será pré definido um value que vai puxar as informações do banco de dados para 
                        auto-preencher o campo de acordo com a série */}
                        <Flex w='100%' h='100%' bg='#EDF2F7' color='#718096' alignItems='center' p='0px 16px' borderRadius='5px' borderWidth='1px' borderColor='#C7CCD0' >Modelo</Flex>
                    </GridItem>

                    <Flex w='100%' h='10' flexDirection='column'>
                        <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                            Contador:
                        </Text>
                        <Flex flexDirection='row' gap={2}>

                            <Flex alignItems='center' w='100%' gap={2}>
                                <Text fontSize='14px' fontWeight={500} color='#9fa1a7'>P/B:</Text>
                                <Input type='number' name='contadorPb' variant='filled' placeholder='Contador' borderWidth='1px' borderColor='#C7CCD0' />
                            </Flex>
                            <Flex alignItems='center' w='100%' gap={2}>
                                <Text fontSize='14px' fontWeight={500} color='#9fa1a7'>COR:</Text>
                                <Input type='number' name='contadorCor' variant='filled' placeholder='Contador' borderWidth='1px' borderColor='#C7CCD0' />
                            </Flex>

                        </Flex>
                    </Flex>

                    <GridItem w='100%' h='10' marginTop='30px'>
                        <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                            Cliente:
                        </Text>
                        {/* Nesse input será pré definido um value que vai puxar as informações do banco de dados para 
                        auto-preencher o campo de acordo com a série */}
                        <Flex w='100%' h='100%' bg='#EDF2F7' color='#718096' alignItems='center' p='0px 16px' borderRadius='5px' borderWidth='1px' borderColor='#C7CCD0' >Cliente</Flex>
                    </GridItem>

                    <GridItem w='100%' h='10' marginTop='30px'>
                        <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                            Endereço:
                        </Text>
                        {/* Nesse input será pré definido um value que vai puxar as informações do banco de dados para 
                        auto-preencher o campo de acordo com a série */}
                        <Flex w='100%' h='100%' bg='#EDF2F7' color='#718096' alignItems='center' p='0px 16px' borderRadius='5px' borderWidth='1px' borderColor='#C7CCD0' >Endereço</Flex>
                    </GridItem>

                    {/* Arrumar esse horario de funcionamento */}

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
                        <Input type='text' name='solicitante' variant='filled' placeholder='Solicitante' borderWidth='1px' borderColor='#C7CCD0' />
                    </GridItem>


                    <Flex w='100%' h='10' marginTop='30px' flexDirection='row' gap='10px'>
                        <Box w='100%'>
                            <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                                Setor:
                            </Text>
                            <Input type='text' name='setor' variant='filled' placeholder='Setor' borderWidth='1px' borderColor='#C7CCD0' />
                        </Box>

                        <Box w='100%'>
                            <Text fontSize='14px' paddingLeft='5px' fontWeight={600}>
                                Telefone:
                            </Text>
                            {/* Analisar esse input depois */}
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
                            <Select name='ocorrencia' variant='filled' placeholder='Ocorrência' borderWidth='1px' borderColor='#C7CCD0' >
                                <option value='oc1'>teste</option>
                                <option value='oc2'>teste</option>
                                <option value='oc3'>teste</option>
                                <option value='oc4'>teste</option>
                                <option value='oc5'>teste</option>
                                <option value='oc6'>teste</option>
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
                            <Textarea name='descricao' placeholder='Digite aqui' />
                        </Box>
                    </GridItem>
                </Grid>
            </form>

        </Stack>
    )
}
