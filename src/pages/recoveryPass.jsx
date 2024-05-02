import { VStack, Stack, Flex, Box, Image, Button, Alert, AlertIcon, useToast } from '@chakra-ui/react'
import { FormInput } from '../components'
import { useState } from 'react';
import api from '../utils/api';
import { authenticate } from '../utils'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

export default function RecoveryPass({ simpleUser }) {

    if (!simpleUser) {
        return null;
    }

    const router = useRouter()
    const toast = useToast()
    const [formPass, setFormPass] = useState({ password: '', id: simpleUser.usr_id })
    const [confirmPass, setConfirmPass] = useState({ confirmPass: '' })
    const [passwordError, setPasswordError] = useState('');

    const handleFormEdit = (e) => {
        if (e.target.name === 'password') {
            setFormPass(prevState => ({ ...prevState, password: e.target.value.trim() }));
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

        if (!validatePassword(formPass.password) || formPass.password !== confirmPass.confirmPass) {
            toast({ title: "Erro!", description: "As senhas não coincidem.", status: 'error', duration: 2000, isClosable: true, });
            return;
        }
        if (!verifyPass()) {
            return;
        }

        try {
            const result = await api.post('recoveryPass', formPass)
            const token = result?.data?.token;
            Cookies.set('token', token);

            setFormPass({ password: ``, id: `` })
            setConfirmPass({ confirmPass: `` })

            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })
            router.push('/login')
        } catch (error) {
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

export async function getServerSideProps({ query: { token }, res }) {

    try {
        const user = await authenticate(token);
        const simpleUser = JSON.parse(JSON.stringify(user))

        return { props: { simpleUser } };
    } catch (err) {
        res.writeHead(302, { Location: '/login' });
        res.end();
        return { props: {} };

    }
}