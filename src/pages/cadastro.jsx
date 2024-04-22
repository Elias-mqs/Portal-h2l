import { Button, Grid, FormLabel, Input, VStack, useToast, GridItem, Alert, AlertIcon, Stack, Box } from "@chakra-ui/react";
import { FormInput } from '@/components'
import { useState } from "react";
import api from '../utils/api'

export default function cadastro() {

    const toast = useToast();

    // Estado do formulário e função para atualizá-lo
    const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', setor: '', });

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
        // const validationEmail = /\S+@\S+\.\S+$/.test(formData.email);
        const hasAtSymbol = /\S+@\S+/.test(email);
        const hasDot = /\S+\.\S+/.test(email);
        // O email é válido
        if (!hasAtSymbol) {
            // Email não contém pelo menos um "@"
            toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente.", status: 'error', duration: 2000, isClosable: true, });
            return false;
        }
        if (!hasDot) {
            // Email não contém pelo menos um "."
            toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente.", status: 'error', duration: 2000, isClosable: true, });
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
            toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente.", status: 'error', duration: 2000, isClosable: true, });
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
            localStorage.setItem('token', token);

            setFormData({ name: ``, username: ``, email: ``, password: ``, setor: `` })

            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

        } catch (error) {
            console.log(error)
            toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
        }
    }

    return (
        <Stack w='1000px' align='center'>

            <Stack
                as='form'
                onSubmit={handleForm}
                w="100%"
                maxW="500px"
                bg="#EDF2FF"
                borderRadius="10px"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.4)"
                p={{ base: '35px 20px', sm: "50px 35px" }}
                transition={{ base: 'max-width 0.3s ease' }}
            >

                <Grid gap={4}>
                    <FormInput name={'name'} value={formData.name} variant={'flushed'} label={'Name'} placeholder={'Nome'} onChange={handleFormEdit} required={true} />
                    <FormInput name={'email'} value={formData.email} type={'email'} variant={'flushed'} label={'Email'} placeholder={'Email'} onChange={handleFormEdit} required={true} />
                    <FormInput name={'setor'} value={formData.setor} variant={'flushed'} label={'Setor'} placeholder={'Setor'} onChange={handleFormEdit} required={true} />
                    <FormInput name={'username'} value={formData.username.trim()} type={'text'} variant={'flushed'} label={'Username'} placeholder={'Username'} onChange={handleFormEdit} required={true} />
                    <FormInput name={'password'} value={formData.password} type={'password'} variant={'flushed'} label={'Password'} placeholder={'Password'} onChange={handleFormEdit} required={true} />
                    {passwordError && (
                        <Stack w='100%' fontSize='xs' gap='0' justify='flex-start' >
                            <Alert p='0' bg='transparent' color='#C53030' status='error' >
                                <AlertIcon w='13px' />
                                {passwordError}
                            </Alert>
                        </Stack>
                    )}
                </Grid>

                <Button type='submit' bg='#6699CC' mt={8} color='#FFF' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500'
                    _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} >
                    Cadastro
                </Button>

            </Stack>
        </Stack>
    )
}