import {
    Button,
    Grid,
    useToast,
    Stack,
    Flex,
    Box,
    Text,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { MdEdit, MdSearch } from "react-icons/md";
import { FormInput, FormInputBtn, UpdatePass } from '@/components'
import api from '../utils/api'
import { useState } from "react";

function SearchUser({ formData, setFormData, display, isDisabled, onClick }) {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchUser, setSearchUser] = useState({ dados: '' });
    const [userResults, setUserResults] = useState([]);

    // Função para manipular a edição de campos do formulário
    const handleFormEdit = (e) => {
        let novosDados = { ...formData };
        let novaInfo = { ...searchUser }

        novaInfo[e.target.name] = e.target.value
        novosDados[e.target.name] = e.target.value
        if (e.target.name === 'username') {
            novosDados.username = e.target.value.toLowerCase().trim();
        }
        if (e.target.name === 'password') {
            novosDados.password = e.target.value.trim();
        }
        setFormData(novosDados);
        setSearchUser(novaInfo);
    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9]+(\.[a-z0-9]+)*@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente. primeiro", status: 'error', duration: 2000, isClosable: true, });
            return false;
        }
        return true;
    }

    const handleSearch = async (e) => {
        e.preventDefault()

        if (searchUser.dados.trim() === '') {
            toast({ position: 'top', title: "Erro", description: 'Digite uma informação para iniciar a busca!', status: 'error', duration: 3000, isClosable: true, })
            return
        }

        console.log('esta passando aqui')

        try {
            const resultSearch = await api.post('searchUser', searchUser)
            console.log(resultSearch.data.user)
            setUserResults(resultSearch.data.user)

        } catch (error) {
            console.log(error)
            toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
        }
    }

    const handleForm = async (event) => {
        event.preventDefault()

        const newFormData = { ...formData, info: formData.info }

        if (!validateEmail(formData.email)) {
            return;
        }

        try {
            console.log(newFormData)
            const result = await api.post('updateDataUser', newFormData)
            console.log(result)

            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })


        } catch (error) {
            console.log(error)
            toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
        }
    }

    console.log(userResults)

    return (

        <Stack
            w='100%'
            h='100%'
            maxH='auto'
            bg="#EDF2FF"
            borderRadius={{ base: '0', md: "10px" }}
            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
            p={{ base: '35px', md: "30px 35px" }}
            transition={{ base: 'max-width 0.3s ease' }}
        >
            <ModalCloseButton m={4} />
            <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Atualizar informações</Text>
            </Flex>

            <Flex as='form' onSubmit={handleSearch}>
                <FormInputBtn name='dados' value={searchUser.dados} icon={<MdSearch size='24px' color='#7B809A' />} variant='filled' bg='#ffffff8d'
                    label='Pesquisar usuário:' placeholder='Nome, usuário, email, setor' onChange={handleFormEdit} />
            </Flex>

            <Stack overflow='auto' >
                <Flex ml='61px' >
                    <Flex w='25%' fontWeight={500} justify='center' >Nome</Flex>
                    <Flex w='25%' fontWeight={500} justify='center' >Usuário</Flex>
                    <Flex w='20%' fontWeight={500} justify='center' >Setor</Flex>
                    <Flex w='30%' fontWeight={500} justify='center' >Email</Flex>
                </Flex>
                {userResults.map((user, index) => (
                    <Flex key={index}>
                        <Box as='button' w='65px' fontSize='sm' p={2} fontWeight={500} fontStyle='italic' _hover={{ fontWeight: 700 }} >editar</Box>
                        <Flex w='100%' bg='#D1D9FF' borderRadius='.5rem' >
                            <Flex name='nome' w='25%' maxW='25%' borderLeft='2px solid #63636342' borderLeftRadius='.5rem' p='0 10px' align='center' overflow='hidden' >{user.nome}</Flex>
                            <Flex name='usuario' w='25%' maxW='25%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.username}</Flex>
                            <Flex name='setor' w='20%' maxW='20%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.setor}</Flex>
                            <Flex name='email' w='30%' maxW='30%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.email}</Flex>
                        </Flex>
                    </Flex>
                ))}
            </Stack>

            <Stack aria-label='user' as='form' onSubmit={handleForm}>

                <Grid gap={8} mb={5} >
                    <Flex align='end' display='none'>
                        <FormInput name={'name'} w='100%' value={formData.name} variant={'flushed'} label={'Nome'} placeholder={'Nome'} onChange={handleFormEdit} isDisabled={isDisabled} required={true} pointerEvents={'none'} tabIndex={'-1'} />
                        <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={onOpen} display={display} ><MdEdit size='20px' /></Button>
                    </Flex>
                    <Flex align='end' display='none'>
                        <FormInput name={'email'} w='100%' value={formData.email} type={'email'} variant={'flushed'} label={'Email'} placeholder={'Email'} onChange={handleFormEdit} isDisabled={isDisabled} required={true} pointerEvents={'none'} tabIndex={'-1'} />
                        <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={onOpen} display={display} ><MdEdit size='20px' /></Button>
                    </Flex>
                    <Flex align='end' display='none'>
                        <FormInput name={'setor'} w='100%' value={formData.setor} variant={'flushed'} label={'Setor'} placeholder={'Setor'} onChange={handleFormEdit} isDisabled={isDisabled} required={true} pointerEvents={'none'} tabIndex={'-1'} />
                        <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={onOpen} display={display} ><MdEdit size='20px' /></Button>
                    </Flex>
                    <Flex align='end' display='none'>
                        <FormInput name={'username'} w='100%' value={formData.username} type={'text'} variant={'flushed'} label={'Usuário'} placeholder={'Usuário'} onChange={handleFormEdit} isDisabled={isDisabled} required={true} pointerEvents={'none'} tabIndex={'-1'} />
                        <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={onOpen} display={display} ><MdEdit size='20px' /></Button>
                    </Flex>
                    <Flex align='end' display='none'>
                        <FormInput name={'password'} w='100%' value={formData.password} type={'password'} variant={'flushed'} label={'Senha'} placeholder={'**********'} onChange={handleFormEdit} required={true} readOnly={true} pointerEvents={'none'} tabIndex={'-1'} />
                        <Button colorScheme='blue' mb={2} size='sm' onClick={onOpen} >Atualizar</Button>
                    </Flex>
                </Grid>

                <Button type='submit' bg='#6699CC' onClick={onClick} color='#FFF' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500'
                    _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} display='none' >
                    Salvar
                </Button>

                <UpdatePass isOpen={isOpen} onClose={onClose} setPassword={(newPassword) => setFormData({ ...formData, password: newPassword })} />
            </Stack>
        </Stack>
    )
}

export default SearchUser;

// {searchResults.map((user, index) => (
//     <div key={index}>
//         <h2>{user.nome}</h2>
//         <p>Email: {user.email}</p>
//         <p>Setor: {user.setor}</p>
//         <p>Username: {user.username}</p>
//     </div>
// ))}
