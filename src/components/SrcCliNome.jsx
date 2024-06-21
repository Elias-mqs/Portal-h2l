import { Modal, ModalOverlay, ModalContent, ModalCloseButton, Stack, Flex, Text, IconButton, Input, Button, Box, Grid } from "@chakra-ui/react";
import { useSearchCli } from "../context/ResearchesContext";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdSearch } from 'react-icons/md';
import { FormInput } from '@/components';
import { useRef, useState, useEffect } from "react";
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


    const { modal } = useSearchCli();
    const { control } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            search: '',
        }
    })

    console.log(dataCliente)

    const handleSelect = (cliente) => {

        setValue(cliente);

        modal.onClose();

    }

    const [busca, setBusca] = useState('')

    console.log('renderizou o filho')



    return (
        <Modal isOpen={modal.isOpen} size='6xl' onClose={modal.onClose} >
            <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            <ModalContent h='auto' maxH='98vh' m='auto' >


                <Stack w='100%' bg="#EDF2FF" h='100%' maxH='70vh' borderRadius={{ base: '0', md: "10px" }} boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                    p={{ base: '35px', md: "30px 35px" }} transition={{ base: 'max-width 0.3s ease' }} >

                    <ModalCloseButton m={4} />
                    <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={3} >
                        <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Pesquisar Empresa</Text>
                    </Flex>

                    <Flex direction='column' align='center'>
                        <Flex w='100%' justify='start' gap={5} >
                            <Flex w='100%' direction='column' mb='auto'>

                                <Input name='search' value={busca} onChange={(e) => { const testandoo = e.target.value }} bg='#ffffff8d' variant='filled'
                                    border='1px solid #C0C0C0' placeholder='Nome da unidade/loja da empresa' />


                            </Flex>

                            <Flex >

                                <Button bg='blue.400' color='#FFF' rightIcon={<MdSearch size='24px' color='#FFF' />} _active={{ transform: 'translateY(2px)' }}
                                    _hover={{ bg: 'blue.500', transform: `translateY(-2px)`, cursor: 'pointer' }} borderRadius='1rem' >
                                    Buscar
                                </Button>

                                {/* <IconButton type='submit' icon={<MdSearch size='24px' color='#FFF' />} borderRadius='3rem' w='60px' bg='blue.400'
                                    _hover={{ bg: 'blue.500', transform: `translateY(-2px)`, cursor: 'pointer' }}
                                    _active={{ transform: 'translateY(2px)' }} /> */}

                            </Flex>

                        </Flex>
                    </Flex>


                    <Stack w='100%'>


                        <Flex direction="column" maxW="100%" maxH="40vh" py="20px" gap={5} >
                            {dataCliente[0]?.nome && (
                                <Flex overflowX='auto' direction='column' w='100%'>

                                    <Flex title='titulo' gap="150px">
                                        <Grid w='100%' templateColumns='repeat(3, 1fr)' p='10px' align='center' gap={5}>
                                            <Flex w='400px' fontWeight={500} justify="center">Nome</Flex>
                                            <Flex w='400px' fontWeight={500} justify="center">Endereço</Flex>
                                            <Flex w='180px' fontWeight={500} justify="center">Municipio</Flex>
                                        </Grid>
                                    </Flex>




                                        <Flex direction='column' w='100%' gap={3}>
                                            {dataCliente[0]?.nome &&
                                                dataCliente.map((cliente, index) => (
                                                    cliente.nome && (

                                                        <Stack key={index} title="resultadosClientes" onClick={() => handleSelect(cliente)}>
                                                            <Flex w='100%' _hover={{ cursor: "pointer" }}>
                                                                <Flex direction='column' bg='#D1D9FF' borderLeft='3px solid #636363a9' borderRadius=".5rem">

                                                                    <Grid templateColumns='repeat(3, 1fr)' p='12px' align='center' gap={5}>
                                                                        <Flex w='400px' pl='20px'>{cliente.nome}</Flex>
                                                                        <Flex w='400px' pl='20px' borderLeft='1px solid #636363a9'>{cliente.end}</Flex>
                                                                        <Flex w='180px' pl='20px' borderLeft='1px solid #636363a9'>{cliente.cid}</Flex>

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

const ListCli = () => {

    return (
        <>
            <IconButtonHeader sizeModal='xl' isOpen={isOpen} onOpen={handleOpenDadosUser} onClose={handleClose} conteudo={<DadosUser handleSearch={handleSearch} setUserDeleted={handleClose} formData={{ ...formData, password: '' }} onClick={handleSave} setFormData={setFormData} />} labelBtn='editar' fontSize='sm' fontWeight={500} fontStyle='italic' hover={{ fontWeight: 700, color: '#000' }} />
            <Flex w='100vw' bg='#D1D9FF' borderRadius='.5rem' >
                <Flex name='nome' w='25%' borderLeft='2px solid #63636342' p='0 10px' align='center' overflow='hidden' borderLeftRadius='.5rem' >{user.name}</Flex>
                <Flex name='usuario' w='25%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.username}</Flex>
                <Flex name='setor' w='20%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.setor}</Flex>
                <Flex name='email' w='30%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.email}</Flex>
            </Flex>
        </>
    )
}