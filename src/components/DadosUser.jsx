//src/components/DadosUser.jsx
import {
    Button,
    Grid,
    useToast,
    Stack,
    Flex,
    Text,
    ModalCloseButton,
    useDisclosure,
    AlertDialog,
    AlertDialogCloseButton,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { FormInput, UpdatePass } from '@/components'
import api from '../utils/api'
import { useState } from "react";

function DadosUser({ formData, setFormData, display, displayNone, onClick, setUserDeleted, handleSearch }) {

    const toast = useToast();
    const [disableName, setDisableName] = useState(true);
    const [disableEmail, setDisableEmail] = useState(true);
    const [disableSetor, setDisableSetor] = useState(true);
    const [disableUsername, setDisableUsername] = useState(true);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const updateDialog = useDisclosure();
    const deleteDialog = useDisclosure();

    // Função para manipular a edição de campos do formulário
    const handleFormEdit = (e) => {
        let novosDados = { ...formData };

        novosDados[e.target.name] = e.target.value
        if (e.target.name === 'username') {
            novosDados.username = e.target.value.toLowerCase().trim();
        }
        if (e.target.name === 'password') {
            novosDados.password = e.target.value.trim();
        }
        setFormData(novosDados);
    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9]+(\.[a-z0-9]+)*@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente. primeiro", status: 'error', duration: 2000, isClosable: true, });
            return false;
        }
        return true;
    }

    const handleForm = async (event) => {
        event.preventDefault()

        const newFormData = { ...formData, info: formData.info }

        if (!validateEmail(formData.email)) {
            return;
        }

        try {
            const result = await api.post('updateDataUser', newFormData)
            setFormData({ ...formData, password: `` })

            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

        } catch (error) {
            console.log(error)
            toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        const userDelete = { ...formData, info: formData.info, deleteUser: true }
        try {
            const deleteResult = await api.post('updateDataUser', userDelete)

            toast({ position: 'top', title: "Sucesso!", description: deleteResult?.data?.message, status: 'success', duration: 2000, isClosable: true, })

            deleteDialog.onClose()
            setUserDeleted(true)
            handleSearch()

        } catch (error) {
            console.error(error)
            toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
        }
    }

    const clickDisableName = () => { setDisableName(!disableName); }
    const clickDisableEmail = () => { setDisableEmail(!disableEmail); }
    const clickDisableSetor = () => { setDisableSetor(!disableSetor); }
    const clickDisableUsername = () => { setDisableUsername(!disableUsername); }

    return (

        <Stack as='form' onSubmit={handleForm} w='100%' h='100v%' maxH='auto' bg="#EDF2FF" boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px" }} >

            <ModalCloseButton m={4} />
            <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Informações da conta</Text>
            </Flex>
            <Grid gap={8} mb={5} >
                <Flex align='end'>
                    <FormInput name={'name'} w='100%' value={formData.name} variant={'flushed'} label={'Nome'} placeholder={'Nome'} onChange={handleFormEdit} isDisabled={disableName} required={true} />
                    <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={clickDisableName} display={display} ><MdEdit size='20px' /></Button>
                </Flex>
                <Flex align='end'>
                    <FormInput name={'email'} w='100%' value={formData.email} type={'email'} variant={'flushed'} label={'Email'} placeholder={'Email'} onChange={handleFormEdit} isDisabled={disableEmail} required={true} />
                    <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={clickDisableEmail} display={display} ><MdEdit size='20px' /></Button>
                </Flex>
                <Flex align='end'>
                    <FormInput name={'setor'} w='100%' value={formData.setor} variant={'flushed'} label={'Setor'} placeholder={'Setor'} onChange={handleFormEdit} isDisabled={disableSetor} required={true} />
                    <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={clickDisableSetor} display={display} ><MdEdit size='20px' /></Button>
                </Flex>
                <Flex align='end'>
                    <FormInput name={'username'} w='100%' value={formData.username} type={'text'} variant={'flushed'} label={'Usuário'} placeholder={'Usuário'} onChange={handleFormEdit} isDisabled={disableUsername} required={true} />
                    <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={clickDisableUsername} display={display} ><MdEdit size='20px' /></Button>
                </Flex>
                <Flex align='end'>
                    <FormInput name={'password'} w='100%' value={formData.password} type={'password'} variant={'flushed'} label={'Senha'} placeholder={'**********'} onChange={handleFormEdit} required={true} readOnly={true} pointerEvents={'none'} tabIndex={'-1'} />
                    <Button colorScheme='blue' mb={2} size='sm' onClick={updateDialog.onOpen} >Atualizar</Button>
                </Flex>
            </Grid>

            <Button type='submit' bg='#6699CC' onClick={onClick} color='#FFF' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500'
                _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} >
                Salvar
            </Button>
            <Flex w='100%' mt={1} justify='center' display='none'>
                <Button w='50%' fontWeight='bold' bg='transparent' color='red' size='sm' onClick={deleteDialog.onOpen} display={displayNone}
                    _hover={{ bg: `red`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} >
                    Excluir
                </Button>
            </Flex>
            <AlertDialog motionPreset='slideInBottom' onClose={deleteDialog.onClose} isOpen={deleteDialog.isOpen} isCentered >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Excluir usuario?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Você irá excluir um usuário. Tem certeza?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={deleteDialog.onClose}>
                            Não
                        </Button>
                        <Button colorScheme='red' onClick={handleDelete} ml={3}>
                            Sim
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <UpdatePass isOpen={updateDialog.isOpen} onClose={updateDialog.onClose} setPassword={(newPassword) => setFormData({ ...formData, password: newPassword })} />
        </Stack>
    )
}

export default DadosUser;