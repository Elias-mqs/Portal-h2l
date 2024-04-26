import { VStack, Stack, Flex, Center, Box, Image, Button, Alert, AlertIcon, useToast } from '@chakra-ui/react'
import { FormInput } from '../components'
import { useState } from 'react';
import api from '../utils/api'

export default function RecoveryPass({ user }) {

    if (!user) {
        return null;
    }

    const toast = useToast()
    const [formPass, setFormPass] = useState({ password: '' })
    const [confirmPass, setConfirmPass] = useState({ confirmPass: '' })
    const [passwordError, setPasswordError] = useState('');

    const handleFormEdit = (e) => {
        if (e.target.name === 'password') {
            setFormPass({ password: e.target.value.trim() });
        } else if (e.target.name === 'confirmPass') {
            setConfirmPass({ confirmPass: e.target.value.trim() });
        }
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

    const verifyPass = () => {
        if (formPass.password === confirmPass.confirmPass) {
            return true
        } else {
            return false
        }
    }

    const handleForm = async (event) => {
        event.preventDefault()
        setPasswordError('')

        // Verifica se algum campo do formulário está vazio 
        const isInvalid = Object.values(formPass).some(value => value.trim() === '');
        if (isInvalid) {
            toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente.", status: 'error', duration: 2000, isClosable: true, });
            return;
        }
        if (!validatePassword(formPass.password) || formPass.password !== confirmPass.confirmPass) {
            toast({ title: "Erro!", description: "As senhas não coincidem.", status: 'error', duration: 2000, isClosable: true, });
            return;
        }
        if (!verifyPass()) {
            return;
        }

        try {
            const result = await api.post('recoveryPassword', formPass)
            const token = result?.data?.token;
            localStorage.setItem('token', token);

            setFormPass({ password: `` })

            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

        } catch (error) {
            console.log(error)
            toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
        }
    }

    return (
        <Stack bg='#F0F2F5' align='center' justify='center' h='100vh' w='100%' >
            <VStack as='form' onSubmit={handleForm} bg='#EDF2FF' borderRadius={{ base: 0, md: '1.5rem' }} w={{ base: '100%', md: '500px' }} h={{ base: '100%', md: 'lg' }} p='0px 50px'
                boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' justify='center' gap={{ base: 16, md: 12 }} >

                <Image src='img/LOGO-H2L.png' fit='contain' w='150px' />

                <Flex w='100%' h={{ base: '220px', md: '180px' }} aligin='center' justify='space-between' direction='column' >

                    <Flex justify='flex-start' direction='column' >
                        <FormInput name={'password'} type={'password'} value={formPass.password} variant={'flushed'} label={'Nova senha:'} onChange={handleFormEdit} placeholder={'Digie a nova senha'} required={true} />
                        {passwordError && (
                            <Stack w='100%' fontSize='xs' gap='0' justify='flex-start' >
                                <Alert p='0' bg='transparent' color='#C53030' status='error' >
                                    <AlertIcon w='13px' />
                                    {passwordError}
                                </Alert>
                            </Stack>
                        )}
                    </Flex>
                    <Box>
                        <FormInput direction='column' name={'confirmPass'} type={'password'} value={confirmPass.confirmPass} variant={'flushed'} label={'Confirmar Senha:'}
                            onChange={handleFormEdit} placeholder={'Confirme a nova senha'} required={true} />
                    </Box>
                </Flex>
                <Button type='submit' bg='#6699CC' color='#FFF' w='100%' h={12} fontSize={20} _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }}
                    _active={{ transform: 'translateY(2px)' }} boxShadow='inset 0px 1px 4px 1px rgba(0, 0, 0, .2)' >Salvar</Button>

            </VStack>
        </Stack>
    )
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { token } = req.query;
    console.log(token)

    try {
        // Verifica se o token é válido
        const user = await authenticate(token);

        // Se o token for válido, passa o usuário como prop para o componente
        return { props: { user } };
    } catch (err) {
        // Se o token não for válido, redireciona para a página de login
        res.writeHead(302, { Location: '/login' });
        res.end();
        return { props: {} };
    }
}