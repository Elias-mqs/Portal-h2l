import { Modal, ModalOverlay, ModalContent, ModalCloseButton, Stack, Flex, Text, IconButton, Input, Grid } from "@chakra-ui/react";
import { useSearchCli } from "../context/ResearchesContext";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiExpandUpDownFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { MdSearch } from 'react-icons/md';
import { z } from 'zod';



///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// ESSA FUNÇÃO É PARA FAZER A BUSCA DO NOME DA EMPRESA PESQUISANDO PELO NOME //////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// O INTUITO É QUE FIQUE NOS CAMPOS DE CADASTRO, MAS SE NECESSÁRIO, PODERÁ   //////////////
////////////// SER DIRECIONADO PARA OUTROS CAMPOS                                        //////////////             
///////////////////////////////////////////////////////////////////////////////////////////////////////



const schema = z.object({
    search: z.coerce.string(),
})


export default function SrcCliNome({ setValue, dataCliente }) {


    const [filteredNames, setFilteredNames] = useState([]);
    const { modal } = useSearchCli();
    const [isAscending, setIsAscending] = useState(true);
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            search: '',
        }
    })



    /////////// EFEITO PARA RENDERIZAR OS VALORES AO ABRIR O COMPONENTE
    useEffect(() => {
        if (modal.isOpen) {
            setFilteredNames(dataCliente || []);
        }
    }, [modal.isOpen, dataCliente]);




    /////////// FUNÇÃO PARA SETAR O VALOR ESCOLHIDO NO COMPONENTE PAI
    const handleSelect = (cliente) => {
        setValue(cliente);
        modal.onClose();
    }




    /////////// CRIADO PARA PARAR A PROPAGAÇÃO DO EVENTO CLICK
    const stopPropagation = (e) => {
        e.stopPropagation();
        handleSubmit(handleFilterName)(e);
    }




    /////////// É CHAMADO AO CLICAR NO BOTÃO DE BUSCA
    const handleFilterName = (data) => {
        const searchValue = data.search;
        const filtered = filterClient(searchValue);
        setFilteredNames(filtered);
    };




    /////////// FILTRA O NOME
    const filterClient = (searchValue) => {
        const dataNameUp = searchValue.toUpperCase();
        if (!dataCliente || !Array.isArray(dataCliente)) {
            // Data cliente não definido ou não é um array
            console.error("Tente novamente ou contate o suporte");
            return [];
        }
        return dataCliente.filter((obj) => obj.nome.toUpperCase().includes(dataNameUp));
    };




    /////////// ORDENA PELO NOME DA LOJA
    const handleOrder1 = () => {
        const sortedData = [...filteredNames].sort((a, b) => {
            if (isAscending) {
                return a.nome.trim().localeCompare(b.nome);
            } else {
                return b.nome.trim().localeCompare(a.nome);
            }
        });

        setFilteredNames(sortedData);
        setIsAscending(!isAscending);
    };



    /////////// ORDENA PELO ENDEREÇO
    const handleOrder2 = () => {
        const sortedData = [...filteredNames].sort((a, b) => {
            if (isAscending) {
                return a.end.trim().localeCompare(b.end);
            } else {
                return b.end.trim().localeCompare(a.end);
            }
        });

        setFilteredNames(sortedData);
        setIsAscending(!isAscending); 
    };



    /////////// ORDENA PELA CIDADE
    const handleOrder3 = () => {
        const sortedData = [...filteredNames].sort((a, b) => {
            if (isAscending) {
                return a.cid.trim().localeCompare(b.cid);
            } else {
                return b.cid.trim().localeCompare(a.cid);
            }
        });

        setFilteredNames(sortedData);
        setIsAscending(!isAscending); 
    };

    


    return (
        <Modal isOpen={modal.isOpen} size='6xl' onClose={modal.onClose} >
            <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            <ModalContent h='auto' maxH='98vh' m='auto' >


                <Stack w='100%' bg="#EDF2FF" h='100%' maxH='75vh' borderRadius={{ base: '0', md: "10px" }} boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                    p={{ base: '35px', md: "30px 35px" }} transition={{ base: 'max-width 0.3s ease' }} >

                    <ModalCloseButton m={4} />
                    <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={3} >
                        <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Pesquisar Empresa</Text>
                    </Flex>

                    <Flex direction='column' align='start'>
                        <Flex as='form' onSubmit={stopPropagation} w={{ base: '100%', md: '50%' }} justify='start' gap={5} >

                            <Controller
                                name='search'
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Flex w='100%' direction='column' mb='auto'>
                                        <Input value={value} onChange={onChange} bg='#ffffff8d' variant='filled' border='1px solid #C0C0C0' placeholder='Nome da loja/unidade' />
                                    </Flex>
                                )}

                            />


                            <Flex >
                                <IconButton title='Buscar' type='submit' icon={<MdSearch size='24px' color='#FFF' />} borderRadius='3rem' w='60px' bg='blue.400'
                                    _hover={{ bg: 'blue.500', transform: `translateY(-2px)`, cursor: 'pointer' }}
                                    _active={{ transform: 'translateY(2px)' }} />
                            </Flex>

                        </Flex>
                    </Flex>


                    <Stack w='100%'>


                        <Flex direction="column" maxW="100%" maxH="50vh" gap={5} >
                            {filteredNames[0]?.nome && (
                                <Flex overflowX='auto' pr='50px' direction='column' w='100%'>

                                    <Flex gap="150px">
                                        <Grid w='100%' templateColumns='repeat(3, 1fr)' p='10px' align='center' gap={5}>

                                            <Flex w='400px' fontWeight={500} justify="center" >
                                                <Flex justify="center" align='center' gap={.5} _hover={{ cursor: 'pointer' }} onClick={handleOrder1} >
                                                    <RiExpandUpDownFill size='12px' /> Loja/Unidade
                                                </Flex>
                                            </Flex>

                                            <Flex w='400px' fontWeight={500} justify="center" >
                                                <Flex justify="center" align='center' gap={.5} _hover={{ cursor: 'pointer' }} onClick={handleOrder2} >
                                                    <RiExpandUpDownFill size='12px' />Endereço
                                                </Flex>
                                            </Flex>

                                            <Flex w='180px' fontWeight={500} justify="center" >
                                                <Flex justify="center" align='center' gap={.5} _hover={{ cursor: 'pointer' }} onClick={handleOrder3} >
                                                    <RiExpandUpDownFill size='12px' />Municipio
                                                </Flex>
                                            </Flex>

                                        </Grid>
                                    </Flex>


                                    <Flex direction='column' w='100%' gap={3}>
                                        {filteredNames[0]?.nome &&
                                            filteredNames.map((cliente, index) => (
                                                cliente.nome && (

                                                    <Stack key={index} onClick={() => handleSelect(cliente)}>
                                                        <Flex w='100%' _hover={{ cursor: "pointer" }}>
                                                            <Flex direction='column' bg='#D1D9FF' borderLeft='3px solid #636363a9' borderRadius=".3rem">

                                                                <Grid templateColumns='repeat(3, 1fr)' p='12px' align='center' gap={5}>
                                                                    <Flex w='400px' pl='20px' textAlign='start' fontSize='14px' >{cliente.nome}</Flex>
                                                                    <Flex w='400px' pl='20px' textAlign='start' fontSize='14px' borderLeft='1px solid #636363a9'>{cliente.end}</Flex>
                                                                    <Flex w='180px' pl='20px' textAlign='start' fontSize='14px' borderLeft='1px solid #636363a9'>{cliente.cid}</Flex>

                                                                </Grid>
                                                            </Flex>
                                                        </Flex>
                                                    </Stack>
                                                )
                                            ))}
                                    </Flex>
                                </Flex>
                            )}
                        </Flex>

                    </Stack>



                </Stack>


            </ModalContent>
        </Modal>
    )
}