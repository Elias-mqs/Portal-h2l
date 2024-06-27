//src/components/SearchUser.jsx
import {
    useToast,
    Stack,
    Flex,
    Text,
    ModalCloseButton,
    useDisclosure,
    Input,
    Button,
    IconButton,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { FormInputBtn, IconButtonHeader, DadosUser, cript, InputSrc, decript } from '@/components'
import { api } from '@/utils/api'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { userContext } from "@/context/UserContext";

function SearchUser() {

    // NESSA TELA O MARCELO FALOU PARA QUE JÁ APAREÇA TODOS OS USUÁRIOS VINCULADOS A CONTA DO GESTOR DAQUELE DEPARTAMENTO OU 'LOJA'(NO BANCO) MAS DEIXE O CAMPO DE PESQUISA PARA
    // QUE O USUÁRIO POSSA PESQUISAR QUANDO TIVER MUITOS RESULTADOS

    // A PRIMEIRA IDEIA É CRIAR UM GET AQUI NESSE COMPONENTE PARA QUE BUSQUE OS USERS ASSIM QUE ABRIR A PÁGINA

    const { data: { data: { [0]: [dataUser], [1]: info } } } = userContext();

    console.log(dataUser)


    const toast = useToast();
    const [userResults, setUserResults] = useState([]);


    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            codCli: (dataUser.admin === '4' || dataUser.admin === '1') ? dataUser.codCli : '',
            nomeCli: dataUser.admin === '1' ? dataUser.nomeCli : '',
        }
    })





    useLayoutEffect(() => {
        const fetchData = async () => {


            if (dataUser.admin === '3' || dataUser.admin === '2') {
                console.log('if do admg e admb')
                return;
            }


            if (dataUser.admin === '4' || dataUser.admin === '1') {

                try {
                    console.log('enviando get');
                    const encryptedParams = cript({ codCli: dataUser.codCli, loja: dataUser.loja, admin: dataUser.admin });

                    const getUrl = `searchUserTeste?params=${encryptedParams.code}`;

                    const { data: { dtCli } } = await api.get(getUrl);

                    const data = decript(dtCli);

                    setUserResults(data);

                    return;

                } catch (error) {
                    // Erro GET
                    toast({ position: 'top', title: "Atenção", description: 'Abra novamente ou contate o suporte.', status: 'info', duration: 2000, isClosable: true, });
                    return;
                }
            }

            toast({ position: 'top', title: "Atenção", description: 'Contate um administrador.', status: 'error', duration: 2000, isClosable: true, });
            return;
        }

        console.log('Chegou aqui, verificar useEffect');

        fetchData();
    }, []);




    // MONTAR FILTRO DO OPERADOR E DO GESTOR QUE SERÁ SEM CODCLI OU LOJA 
    const handleFilter = (e) => {

        console.log(e)
    }



    const stopPropagation = (e) => {
        e.stopPropagation();
        handleSubmit(handleFilter)(e);
    }



    console.log('teste')

    return (

        <Stack w='100%' maxW='4xl' h='100%' maxH='auto' bg="#EDF2FF" borderRadius={{ base: '0', md: "10px" }} boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
            p={{ base: '35px', md: "30px 35px" }} transition={{ base: 'max-width 0.3s ease' }} overflow='hidden' >




            <Flex position='relative' top='-20px' right='-20px' >
                <ModalCloseButton m={4} />
            </Flex>
            <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Atualizar informações</Text>
            </Flex>




            <Flex as='form' onSubmit={stopPropagation} justify='center' mb='20px' >

                <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={{ base: 4, md: 4 }} >


                    {(dataUser.admin === '3' || dataUser.admin === '2' || dataUser.admin === '4' || dataUser.admin === '1') &&
                        <Controller
                            name='name'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Flex direction='column'>
                                    <Text fontSize={14} fontWeight={500} pb={1} pl={2} >Nome:</Text>
                                    <Input value={value} onChange={onChange} placeholder='Nome' variant='filled' border='1px solid #C0C0C0' bg='#ffffff8d' />
                                </Flex>
                            )}
                        />
                    }


                    {(dataUser.admin === '3' || dataUser.admin === '2') &&
                        <Controller
                            name='codCli'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Flex direction='column' >
                                    <Text fontSize={14} fontWeight={500} pb={1} pl={2} >Codigo cliente:</Text>
                                    <Input value={value} onChange={onChange} placeholder='999999' variant='filled' border='1px solid #C0C0C0' bg='#ffffff8d' />
                                </Flex>
                            )}
                        />
                    }


                    {(dataUser.admin === '3' || dataUser.admin === '2' || dataUser.admin === '4') &&
                        <Controller
                            name='nomeCli'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Flex direction='column'>
                                    <Text fontSize={14} fontWeight={500} pb={1} pl={2} >Local/Unidade:</Text>
                                    <Input value={value} onChange={onChange} placeholder='Ex: H2L Soluções' variant='filled' border='1px solid #C0C0C0' bg='#ffffff8d' />
                                </Flex>
                            )}
                        />
                    }

                    <Button title='Buscar' type='submit' rightIcon={<MdSearch size='24px' color='#fff' />} borderRadius='3rem' w={{ base: '100%', sm: '130px' }}
                        bg='blue.400' mt='auto' color='#FFF' _hover={{ bg: 'blue.500', transform: `translateY(-2px)`, cursor: 'pointer' }} ml={{ base: 0, md: '20px' }}
                        _active={{ transform: 'translateY(2px)' }} >
                        Buscar
                    </Button>


                </Grid>

            </Flex>




            <Flex flex={1} overflow='auto' >
                <Flex direction='column' minW='826px' gap={1} >

                    <Flex ml='61px' >

                        <Flex flex={2} fontWeight={500} justify='center' >Nome</Flex>
                        <Flex flex={1} fontWeight={500} justify='center' >Setor</Flex>
                        {(dataUser.admin === '3' || dataUser.admin === '2' || dataUser.admin === '4') &&
                            <Flex flex={2} fontWeight={500} justify='center' >Local/Unidade</Flex>
                        }

                    </Flex>

                    {userResults.map((user, index) => (
                        <Flex key={index} minW='826px' >
                            <UserRow user={user} handleSearch={handleFilter} />
                        </Flex>
                    ))}

                </Flex>
            </Flex>

        </Stack>
    )
}














function UserRow({ user, handleSearch }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userDeleted, setUserDeleted] = useState(false);
    const [formData, setFormData] = useState(user)
    const [isSaved, setIsSaved] = useState(false);
    const [originalData, setOriginalData] = useState({ name: '', username: '', email: '', password: '', setor: '', info: '' });

    useEffect(() => {
        setFormData(user)
    }, [user])

    const handleOpenDadosUser = () => {
        setOriginalData({ ...formData });
        onOpen();
    };

    const handleClose = () => {
        if (!isSaved) {
            setFormData({ ...originalData, password: '' });
        }
        setIsSaved(false);
        setUserDeleted(false);
        onClose();

    };

    const handleSave = () => {
        setIsSaved(true)
    };

    return (
        <>
            <IconButtonHeader sizeModal='xl' isOpen={isOpen} onOpen={handleOpenDadosUser} onClose={handleClose} conteudo={<DadosUser handleSearch={handleSearch}
                setUserDeleted={handleClose} formData={{ ...formData, password: '' }} onClick={handleSave} setFormData={setFormData} />} labelBtn='editar' fontSize='sm'
                fontWeight={500} fontStyle='italic' hover={{ fontWeight: 700, color: '#000' }}
            />

            <Flex w='100%' bg='#D1D9FF' borderRadius='.5rem' >
                <Flex name='nome' flex={2} borderLeft='2px solid #63636342' p='0 10px' align='center' borderLeftRadius='.5rem' >{user.name}</Flex>
                <Flex name='setor' flex={1} borderLeft='1px solid #636363a9' p='0 10px' align='center' >{user.setor}</Flex>
                <Flex name='nomeCli' flex={2} borderLeft='1px solid #636363a9' p='0 10px' align='center' >{user.nomeCli}</Flex>
            </Flex>
        </>
    );
}

export default SearchUser;

