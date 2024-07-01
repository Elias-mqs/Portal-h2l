//src/components/SearchUser.jsx
import {
    useToast,
    Stack,
    Flex,
    Text,
    ModalCloseButton,
    useDisclosure,
    Input,
    Button, Grid
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { IconButtonHeader, cript, decript, EditUser } from '@/components';
import { api } from '@/utils/api';
import { useCallback, useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { userContext } from "@/context/UserContext";




function SearchUser() {


    const { data: { data: { [0]: [dataUser], [1]: info } } } = userContext();

    const toast = useToast();
    const [userResults, setUserResults] = useState([]);
    const [originalUser, setOriginalUser] = useState([]);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            codCli: (dataUser.admin === '4' || dataUser.admin === '1') ? dataUser.codCli : '',
            nomeCli: dataUser.admin === '1' ? dataUser.nomeCli : '',
        }
    })


    const [dataRefetch, setDataRefetch] = useState({ name: '', codCli: '', nomeCli: '' })



    ///////////// BUSCA A LISTA DE USUÁRIOS DOS ADMINS 4 E 1 /////////////
    const fetchData = useCallback(async () => {

        if (dataUser.admin === '3' || dataUser.admin === '2') {
            return;
        }

        if (dataUser.admin === '4' || dataUser.admin === '1') {

            try {

                const encryptedParams = cript({ codCli: dataUser.codCli, loja: dataUser.loja, admin: dataUser.admin });

                const getUrl = `searchUserTeste?params=${encryptedParams.code}`;

                const { data: { dtCli } } = await api.get(getUrl);

                const data = decript(dtCli);

                setUserResults(data);
                setOriginalUser(data);

                return;

            } catch (error) {
                // Erro GET
                toast({ position: 'top', title: "Atenção", description: 'Abra novamente ou contate o suporte.', status: 'info', duration: 2000, isClosable: true, });
                return;
            }
        }

        toast({ position: 'top', title: "Atenção", description: 'Contate um administrador.', status: 'error', duration: 2000, isClosable: true, });
        return;

    }, []);




    ///////////// CHAMA A BUSCA DE USUÁRIOS AO RENDERIZAR O COMPONENTE /////////////
    useLayoutEffect(() => {
        fetchData();
    }, []);




    ///////////// BUSCAR LISTA PARA ADMINS 3 E 2 /////////////
    const handleFilter = async (data) => {

        if (![1, 2, 3, 4].includes(parseInt(dataUser.admin))) {
            toast({ position: 'top', title: "Erro!", description: 'Contate um administrador.', status: 'error', duration: 2000, isClosable: true });
            return;
        }



        if (dataUser.admin === '3' || dataUser.admin === '2') {

            if (data.name === '' && data.nomeCli === '' && data.codCli === '') {
                toast({ position: 'top', title: "Atenção", description: 'Informe algum campo para a busca.', status: 'info', duration: 2000, isClosable: true, });
                setUserResults(originalUser);
                return;
            }

            setDataRefetch({ name: data.name, codCli: data.codCli, nomeCli: data.nomeCli });

            const encryptedParams = cript({ admin: dataUser.admin, name: data.name, nomeCli: data.nomeCli, codCli: data.codCli });

            const getUrl = `searchUserTeste?params=${encryptedParams.code}`;

            const { data: { dtCli } } = await api.get(getUrl);

            const userList = decript(dtCli);

            setUserResults(userList);

            return;
        }



        if (dataUser.admin === '4') {

            if (data.name === '' && data.nomeCli === '') {
                setUserResults(originalUser);
                return;
            }

            let userFilter = userResults;

            if (data.name !== '') {
                userFilter = userFilter.filter(user => user.name.includes(data.name));
            }

            if (data.nomeCli !== '') {
                userFilter = userFilter.filter(user => user.nomeCli.includes(data.nomeCli));
            }

            setUserResults(userFilter);

            return;
        }



        if (dataUser.admin === '1') {

            if (data.name === '') {
                setUserResults(originalUser);
                return;
            }

            const userFilter = userResults.filter(user => user.name.includes(data.name));

            setUserResults(userFilter);

            return;
        }

    }



    const stopPropagation = (e) => {
        e.stopPropagation();
        handleSubmit(handleFilter)(e);
    }



    // RECARREGA A LISTA DE USERS DO ADMIN APÓS ATUALIZAR ALGUM USER
    const refetchAdm = useCallback(async () => {

        if (dataUser.admin === '3' || dataUser.admin === '2') {
            const encryptedParams = cript({ admin: dataUser.admin, name: dataRefetch.name, nomeCli: dataRefetch.nomeCli, codCli: dataRefetch.codCli });

            const getUrl = `searchUserTeste?params=${encryptedParams.code}`;
            try {
                const { data: { dtCli } } = await api.get(getUrl);

                const userList = decript(dtCli);
                setUserResults(userList);

                return;
            } catch (error) {
                console.error(error)
            }
        }
    }, []);



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
                                    <Input value={value} type='number' onChange={(e) => onChange(e.target.value.trim().slice(0, 6))} placeholder='999999' variant='filled'
                                        border='1px solid #C0C0C0' bg='#ffffff8d' />
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
                                    <Input value={value} onChange={(e) => onChange(e.target.value.toUpperCase())} placeholder='Ex: H2L Soluções' variant='filled'
                                        border='1px solid #C0C0C0' bg='#ffffff8d' />
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
                            <UserRow user={user} dataUser={dataUser} refetch={fetchData} refetchAdm={refetchAdm} />
                        </Flex>
                    ))}

                </Flex>
            </Flex>

        </Stack>
    )
}





function UserRow({ user, dataUser, refetch, refetchAdm }) {

    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleClose = () => {
        refetch();
        refetchAdm();
        onClose();
    }


    return (
        <>
            <IconButtonHeader sizeModal='xl' isOpen={isOpen} onOpen={onOpen} onClose={handleClose} conteudo={<EditUser user={user} onClose={handleClose} />}
                labelBtn='editar' fontSize='sm' fontWeight={500} fontStyle='italic' hover={{ fontWeight: 700, color: '#000' }}
            />


            <Flex w='100%' bg='#D1D9FF' borderRadius='.5rem' >

                <Flex name='nome' flex={2} borderLeft='2px solid #63636342' p='0 10px' align='center' borderLeftRadius='.5rem' >{user.name}</Flex>
                
                <Flex name='setor' flex={1} borderLeft='1px solid #636363a9' p='0 10px' align='center' >{user.setor}</Flex>
                
                {(dataUser.admin === '3' || dataUser.admin === '2' || dataUser.admin === '4') &&
                    <Flex name='nomeCli' flex={2} borderLeft='1px solid #636363a9' p='0 10px' align='center' >{user.nomeCli}</Flex>
                }
                
            </Flex>
        </>
    );
}

export default SearchUser;





