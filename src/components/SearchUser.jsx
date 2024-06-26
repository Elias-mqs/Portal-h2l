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
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { FormInputBtn, IconButtonHeader, DadosUser, cript, InputSrc } from '@/components'
import { api } from '@/utils/api'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { userContext } from "@/context/UserContext";

function SearchUser({ formData, setFormData, levelUser, openSrc }) {

    // NESSA TELA O MARCELO FALOU PARA QUE JÁ APAREÇA TODOS OS USUÁRIOS VINCULADOS A CONTA DO GESTOR DAQUELE DEPARTAMENTO OU 'LOJA'(NO BANCO) MAS DEIXE O CAMPO DE PESQUISA PARA
    // QUE O USUÁRIO POSSA PESQUISAR QUANDO TIVER MUITOS RESULTADOS

    // A PRIMEIRA IDEIA É CRIAR UM GET AQUI NESSE COMPONENTE PARA QUE BUSQUE OS USERS ASSIM QUE ABRIR A PÁGINA

    const { data: { data: { [0]: [dataUser], [1]: info } } } = userContext();

    // console.log(dataUser)


    const toast = useToast();
    const [searchUser, setSearchUser] = useState({ dados: '' });
    const [userResults, setUserResults] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [count, setCount] = useState(1)
  

    const { control, handleSubmit } = useForm({
        defaultValues: {
            dados: ''
        }
    })







//     useLayoutEffect(() => {
//         const fetchData = async () => {
// console.log('000000000000000000000000000')
//             if(dataUser.admin === 3){
//                 return;
//             }
//             if(dataUser.admin === 2){
//                 return;
//             }
//             if(dataUser.admin === 4){
//                 try {
//                     console.log('enviando get')
//                     // const encryptedParams = cript(`codCli=${dataUser.codCli}&admin=${dataUser.admin}`);
//                     const encryptedParams = cript({codCli: dataUser.codCli, admin: dataUser.admin});
//                     const getUrl = `searchUserTeste?params=${encryptedParams.code}`;

//                     const response = await api.get(getUrl);
// console.log('11111111111111111111111111111111')
//                     console.log(response);
//                 } catch (error) {
//                     console.error(error);
//                     toast({ position: 'top', title: "Atenção", description: 'Abra novamente ou contate o suporte.', status: 'info', duration: 2000, isClosable: true, })
//                     return;
//                 }
//             }
//             if(dataUser.admin === 1){
//                 console.log('chegou aqui, useEffect if do gestor')
//             }

//             console.log('Chegou aqui, verificar useEffect')

//         };
//             fetchData();
//     }, []);



  // useLayoutEffect(() => {
    //     fetchData();
    // }, [])

















    const fetchData = useCallback(async (e) => {

        e.preventDefault();
        e.stopPropagation();

        console.log('-----------------------------------------------------------------------------------------')

        if (dataUser.admin === 3 || dataUser.admin === 2) {
            return;
        }

        if (dataUser.admin === 4) {
            console.log('000000000000000000000000')
            try {
                console.log('11111111111111111111111111')
                console.log('enviando get');
                const encryptedParams = cript({ codCli: dataUser.codCli, admin: dataUser.admin });
                console.log('22222222222222222222222')
                const getUrl = `searchUserTeste?params=${encryptedParams.code}`;
                console.log('3333333333333333333333333333333')

                const response = await api.get(getUrl);

                console.log('444444444444444444444444444444444444')
                console.log(response);
console.log('55555555555555555555555555')
                return;
                // setUserResults(usersGet)

            } catch (error) {
                console.error(error);
                toast({
                    position: 'top',
                    title: "Atenção",
                    description: 'Abra novamente ou contate o suporte.',
                    status: 'info',
                    duration: 2000,
                    isClosable: true,
                });
                return;
            }
        }
        console.log('6666666666666666666666666666666666666666666666')

        if (dataUser.admin === 1) {
            console.log('chegou aqui, useEffect if do gestor');
        }

        console.log('Chegou aqui, verificar useEffect');
    }, [userResults]);



    // useLayoutEffect(() => {
    //     fetchData();
    // }, [])


    // useEffect(() => {
    //     fetchData();
    // }, []);

















    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true)

        if (searchUser.dados.trim() === '') {
            toast({ position: 'top', title: "Atenção", description: 'Digite uma informação para iniciar a busca!', status: 'error', duration: 3000, isClosable: true, })
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1500);
            return
        }

        const searchUserAuth = { ...searchUser, lU: levelUser }
        const searchCript = cript(searchUserAuth)

        try {

            const resultSearch = await api.post('searchUser', searchCript)
            setUserResults(resultSearch.data.user)
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1500);

            if (resultSearch.data.user.length === 0) {
                toast({ position: 'top', title: "Atenção", description: 'Nenhum resultado encontrado. Digite outra informação.', status: 'error', duration: 3000, isClosable: true, })
                return
            }


        } catch (error) {
            console.log(error)
            toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
        }
    }


    const handleFilter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e)
    }



    console.log('teste')

    return (

        <Stack w='100%' h='100%' maxH='auto' bg="#EDF2FF" borderRadius={{ base: '0', md: "10px" }} boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px" }} transition={{ base: 'max-width 0.3s ease' }} >

            <ModalCloseButton m={4} />
            <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Atualizar informações</Text>
                <Button onClick={fetchData} >chamar</Button>
            </Flex>

            <Flex as='form' onSubmit={() => console.log('teste')}>

                <Controller
                    name='dados'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <InputSrc value={value || ''} w='300px' typeBtn='submit' icon={<MdSearch title='pesquisar' size='24px' color='#7B809A' />} onClick={handleFilter} variant='filled'
                            border='1px solid #C0C0C0' label='Pesquisar usuário:' placeholder='Nome, usuário, email, setor' onChange={onChange} bg='#ffffff8d' />
                    )}
                />

            </Flex>

            <Stack overflow='auto' >
                <Flex ml='61px' >
                    <Flex w='25%' fontWeight={500} justify='center' >Nome</Flex>
                    <Flex w='25%' fontWeight={500} justify='center' >Usuário</Flex>
                    <Flex w='20%' fontWeight={500} justify='center' >Setor</Flex>
                    <Flex w='30%' fontWeight={500} justify='center' >Email</Flex>
                </Flex>
                {userResults.map((user, index) => (
                    <Flex key={index} >
                        <UserRow user={user} formData={formData} handleSearch={handleSearch} setFormData={setFormData} />
                    </Flex>
                ))}
            </Stack>

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

            <Flex w='100vw' bg='#D1D9FF' borderRadius='.5rem' >
                <Flex name='nome' w='25%' borderLeft='2px solid #63636342' p='0 10px' align='center' overflow='hidden' borderLeftRadius='.5rem' >{user.name}</Flex>
                <Flex name='usuario' w='25%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.username}</Flex>
                <Flex name='setor' w='20%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.setor}</Flex>
                <Flex name='email' w='30%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.email}</Flex>
            </Flex>
        </>
    );
}

export default SearchUser;

