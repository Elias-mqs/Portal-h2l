import {
    Button,
    Grid,
    useToast,
    Alert,
    AlertIcon,
    Stack,
    Flex,
    Text,
    ModalCloseButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
} from "@chakra-ui/react";
import { FormInput, UpdatePass } from '@/components'
import { useState } from "react";
import api from '../utils/api'
import Cookies from 'js-cookie'

function DadosUser({ formData, setFormData, isDisabled }) {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Estado do formulário e função para atualizá-lo
    // const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', setor: '', });
    
    // Estado para armazenar erros relacionados à senha
    const [passwordError, setPasswordError] = useState('');

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

    const validatePassword = (password) => {
        const isLengthValid = password.length >= 10;;
        const hasUppercase = /[A-Z]/.test(password)
        const hasLowercase = /[a-z]/.test(password)
        const hasNumber = /[0-9]/.test(password)
        const hasSpecialChar = /[-!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!isLengthValid) {
            setPasswordError('A senha deve ter pelo menos 10 caracteres.');
            return false;
        }
        if (!hasUppercase) {
            setPasswordError('A senha deve conter pelo menos uma letra maiúscula.');
            return false;
        }
        if (!hasLowercase) {
            setPasswordError('A senha deve conter pelo menos uma letra minúscula.');
            return false;
        }
        if (!hasNumber) {
            setPasswordError('A senha deve conter pelo menos um número.');
            return false;
        }
        if (!hasSpecialChar) {
            setPasswordError('A senha deve conter pelo menos um caractere especial.');
            return false;
        }
        setPasswordError('')
        return true;
    };

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
        setPasswordError('')

        // Verifica se algum campo do formulário está vazio 
        const isInvalid = Object.values(formData).some(value => value.trim() === '');
        if (isInvalid) {
            toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente. segundo", status: 'error', duration: 2000, isClosable: true, });
            return;
        }

        if (!validateEmail(formData.email)) {
            return;
        }
        if (!validatePassword(formData.password)) {
            return;
        }

        try {
            const result = await api.post('cadastro', formData)
            const token = result?.data?.token;
            Cookies.set('token', token);

            setFormData({ name: ``, username: ``, email: ``, password: ``, setor: `` })

            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

        } catch (error) {
            console.log(error)
            toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
        }
    }

    return (

        <Stack
            as='form'
            onSubmit={handleForm}
            w='100%'
            h='100%'
            maxH='auto'
            bg="#EDF2FF"
            borderRadius={{ base: '0', md: "10px" }}
            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
            p={{ base: '35px', md: "30px 35px 50px" }}
            transition={{ base: 'max-width 0.3s ease' }}
        >
            <ModalCloseButton m={4} />
            <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Informações da conta</Text>
            </Flex>
            <Grid gap={8} mb={5} >
                <FormInput name={'name'} value={formData.name} variant={'flushed'} label={'Nome'} placeholder={'Nome'} onChange={handleFormEdit} isDisabled={isDisabled} required={true} />
                <FormInput name={'email'} value={formData.email} type={'email'} variant={'flushed'} label={'Email'} placeholder={'Email'} onChange={handleFormEdit} isDisabled={isDisabled} required={true} />
                <FormInput name={'setor'} value={formData.setor} variant={'flushed'} label={'Setor'} placeholder={'Setor'} onChange={handleFormEdit} isDisabled={isDisabled} required={true} />
                <FormInput name={'username'} w='100%' flex='1' value={formData.username} type={'text'} variant={'flushed'} label={'Usuário'} placeholder={'Usuário'} onChange={handleFormEdit} isDisabled={isDisabled} required={true} />
                <Flex>
                    <FormInput name={'password'} w='100%' value={formData.password} type={'password'} variant={'flushed'} label={'Senha'} placeholder={'**********'} onChange={handleFormEdit} isDisabled={isDisabled} required={true} />
                    <Button colorScheme='blue' m='auto' onClick={onOpen} >Atualizar</Button>
                </Flex>
                {passwordError && (
                    <Stack w='100%' fontSize='xs' gap='0' justify='flex-start' >
                        <Alert p='0' bg='transparent' color='#C53030' status='error' >
                            <AlertIcon w='13px' />
                            {passwordError}
                        </Alert>
                    </Stack>
                )}
            </Grid>

            <Button type='submit' bg='#6699CC' color='#FFF' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500'
                _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} >
                Salvar
            </Button>

            <UpdatePass isOpen={isOpen} onClose={onClose} setPassword={(newPassword) => setFormData({ ...formData, password: newPassword })} />
        </Stack>
    )
}

export default DadosUser;