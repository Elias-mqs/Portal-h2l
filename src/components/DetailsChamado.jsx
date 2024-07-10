import { Badge, Flex, Grid, Input, ModalCloseButton, Stack, Text, Textarea, GridItem } from "@chakra-ui/react";



export default function DetailsChamado({ chamados }) {


    ////////////////// DEFININDO TIPOS DE STATUS RETORNADOS PELA API //////////////////
    let status = '';
    if (chamados.status_cham === 'A') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="blue"   >Aberto                </Badge>; }
    if (chamados.status_cham === 'E') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="green"  >Fechado               </Badge>; }


    ////////////////// FORMATANDO DATA //////////////////
    const formatarData = (data) => {
        const ano = data.slice(0, 4);
        const mes = data.slice(4, 6);
        const dia = data.slice(6, 8);
        return `${dia}/${mes}/${ano}`;
    }
    const dataFormatada = formatarData(chamados.emissao_cham);

    
    return (
        <Stack w='100%' h='100%' bg='#fff' p={30}>
            <ModalCloseButton m={3} />


            <Flex direction={{ base: 'column', md: 'row' }}>

                <Flex order={{ base: 2, md: 1 }}>

                    <Flex direction='column' p={5} flex='1'>

                        <Flex align='center' justify='space-between' gap={10} >
                            <Text fontSize={14} fontWeight={500} mr={2} flex='1'>Emissão:</Text>
                            <Text fontSize={16} fontWeight={600}>{dataFormatada}</Text>
                        </Flex>

                        <Flex align='center' justify='space-between' gap={10} >
                            <Text fontSize={14} fontWeight={500} mr={2} flex='1'>Chamado:</Text>
                            <Text fontSize={15} fontWeight={600}>{chamados.chamado}</Text>
                        </Flex>

                        <Flex align='center' justify='space-between' gap={10} >
                            <Text fontSize={14} fontWeight={500} mr={2} flex='1'>Status:</Text>
                            <Flex mt={1} justify='end' flex='1'>{status}</Flex>
                        </Flex>

                    </Flex>

                </Flex>

                <Flex order={{ base: 1, md: 2 }} flex='2' minW='237px' justify='center' ><Text fontWeight={600} fontSize={24} >Detalhes do chamado</Text></Flex>
                <Flex order={{ base: 3, md: 3 }} w='300px'></Flex>

            </Flex>




            <Flex direction='column' gap={5}>


                <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={5} p={4}
                    boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.1)' borderRadius='.5rem' >

                    <Flex direction='column'>
                        <Text fontSize={14} fontWeight={500} pb={1} pl={2}>Atendente:</Text>
                        <Input variant='filled' border='1px solid #c0c0c0' value={chamados.Atendente_ab1} readOnly />
                    </Flex> {/* Quem abriu a OS */}

                    <Flex direction='column'>
                        <Text fontSize={14} fontWeight={500} pb={1} pl={2}>Ocorrência:</Text>
                        <Input variant='filled' border='1px solid #c0c0c0' value={chamados.motivo_cham} readOnly />
                    </Flex>

                    {/* <Flex direction='column'>
                        <Text fontSize={14} fontWeight={500} pb={1} pl={2}>Técnico:</Text>
                        <Input variant='filled' border='1px solid #c0c0c0' value={chamados['nome_ tec']} readOnly />
                    </Flex> */}

                </Grid>


                <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={5} p={4}
                    boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.1)' borderRadius='.5rem' >

                    <Flex direction='column'>
                        <Text fontSize={14} fontWeight={500} pb={1} pl={2}>Equipamento:</Text>
                        <Input variant='filled' border='1px solid #c0c0c0' value={chamados.descri_pro} readOnly />
                    </Flex>

                    <Flex direction='column'>
                        <Text fontSize={14} fontWeight={500} pb={1} pl={2}>Série do equip.:</Text>
                        <Input variant='filled' border='1px solid #c0c0c0' value={chamados.serial} readOnly />
                    </Flex>

                    <Flex direction='column'>
                        <Text fontSize={14} fontWeight={500} pb={1} pl={2}>Contador:</Text>
                        <Input variant='filled' border='1px solid #c0c0c0' value={chamados.contador_cham} readOnly />
                    </Flex>

                </Grid>


                <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={5} p={4}
                    borderRadius='.5rem' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.1)' >

                    <Flex direction='column'>
                        <Text fontSize={14} fontWeight={500} pb={1} pl={2}>Cliente:</Text>
                        <Input variant='filled' border='1px solid #c0c0c0' value={chamados.nome_cli} readOnly />
                    </Flex>

                    <Flex direction='column'>
                        <Text fontSize={14} fontWeight={500} pb={1} pl={2}>Contato:</Text>
                        <Input variant='filled' border='1px solid #c0c0c0' value={chamados.contato_cham} readOnly />
                    </Flex>

                </Grid>


                <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} >

                    <GridItem colSpan={2} p={4} boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.1)' borderRadius='.5rem'>
                        <Flex direction='column' >
                            <Text fontSize={14} fontWeight={500} pb={1} pl={2}>Descrição:</Text>
                            <Textarea variant='filled' border='1px solid #c0c0c0' value={chamados.descri_cham} readOnly />
                        </Flex>
                    </GridItem>

                </Grid>
            </Flex>

        </Stack>
    )
}