//src/components/PainelLogin.jsx
import {
    Box,
    Button,
    Stack,
    VStack,
    Text,
    useToast,
    Input,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormLabel,
    ModalFooter,
    Spinner,
    InputLeftElement,
    InputRightElement,
    InputGroup,

} from "@chakra-ui/react"
import { IconLock, IconEyeClosed, IconEye } from '@tabler/icons-react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useRouter } from 'next/router'
import { useState, useRef } from "react"
import { FormInputBtnL, cript } from '@/components'
import { api } from '../utils/api'
import Cookies from 'js-cookie'
import { useAuth } from '@/context/AuthContext';
import Image from "next/image";



export default function PainelLogin() {

    const toast = useToast();
    const router = useRouter();
    const { login } = useAuth();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRec, setIsLoadingRec] = useState(false);
    const [formulario, setFormulario] = useState({
        username: '',
        password: ''
    });
    const [formRecPass, setFormRecPass] = useState({
        email: ''
    });


    // Função para alternar a visibilidade da senha
    const handleClickEyes = (e) => {
        e.preventDefault();
        setShow(!show);
    };


    //Função para lidar com o envio do formulário de login
    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        if (isLoading) {
            return;
        }

        if (formulario.username.trim() === '' || formulario.password.trim() === '') {
            toast({ title: "Atenção!", description: 'Necessário informar usuário e senha', status: 'error', duration: 2000, isClosable: true, })
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return
        }

        const newForm = cript(formulario)

        try {

            const result = await api.post('login', newForm)
            const token = result?.data?.ssn;
            Cookies.set('ssn', token);

            setFormulario({ username: ``, password: `` })

            toast({ title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

            login();
            router.push('/')

        } catch (error) {
            setTimeout(() => {
                toast({ title: "", description: 'Verifique seu usuário ou senha.', status: 'info', duration: 2000, isClosable: true, })
            }, 1500);

        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }


    // Função para lidar com a mudança nos campos de entrada do formulário
    const handleInputChange = (e) => {

        let novosDados = { ...formulario };
        novosDados[e.target.name] = e.target.value

        if (e.target.name == 'username') {
            novosDados.username = e.target.value.toLowerCase().trim()
        }
        if (e.target.name == 'password') {
            novosDados.password = e.target.value.trim()
        }
        setFormulario(novosDados);
    }


    // Modal Recuperação de senha
    const initialRef = useRef();
    const { isOpen, onOpen, onClose: chakraOnClose } = useDisclosure();
    const onClose = () => {
        setFormRecPass({ ...formRecPass, email: '' });
        chakraOnClose();
    }

    // Função para validação de email
    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9]+(\.[a-z0-9]+)*@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente.", status: 'error', duration: 2000, isClosable: true, });
            return false;
        }
        return true;
    }

    // Função para recuperação de senha
    const handleRecoverPass = async (e) => {
        e.preventDefault()
        setIsLoadingRec(true);

        if (!validateEmail(formRecPass.email)) {
            return;
        }
        if (isLoadingRec) {
            return;
        }

        const newRecPass = cript(formRecPass)

        try {

            const result = await api.post('recoveryPass', newRecPass)

            setFormRecPass({ email: '' })
            toast({ description: 'Se houver um e-mail cadastrado, você receberá uma mensagem com instruções de recuperação.', duration: 6000, isClosable: true, })

        } catch (error) {

            toast({ description: 'Se houver um e-mail cadastrado, você receberá uma mensagem com instruções de recuperação.', duration: 6000, isClosable: true, })

        } finally {

            onClose()
            setIsLoadingRec(false);
        }
    }
    const handleEmailChange = (e) => { setFormRecPass({ ...formRecPass, email: e.target.value }) }


    return (

        <VStack bg='#EDF2FF' borderRadius={{ base: 0, md: '1.5rem' }} w={{ base: '100%', md: '500px' }} h={{ base: '100vh', md: 'lg' }} p='0px 50px'
            boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' justify='center' position='fixed' overflow='auto' >

            <Stack w='100%' align='center' gap={{ base: 20, md: 12 }}>

                <Image width={150} height={150} alt='Imagem de page sem chamados' src='/img/LOGO-H2L.png' priority={true} quality={80} />

                <Stack w='100%' align='center' gap={4}>
                    <Stack as='form' onSubmit={handleLogin} w='100%' maxW='100%' gap={10} >
                        <Stack spacing={8}>

                            <FormInputBtnL name={'username'} value={formulario.username} fontSize={'18px'} variant={'flushed'} label={'Usuário'}
                                icon={<PersonOutlineOutlinedIcon sx={{ color: `#003366` }} />} placeholder={'Nome de usuário'} onChange={handleInputChange} autoComplete='username' />

                            <Box >
                                <Text pb={1} pl={2} fontSize={14} fontWeight={500}>Senha</Text>
                                <InputGroup>
                                    <InputLeftElement>
                                        <IconLock color='#003366' />
                                    </InputLeftElement>
                                    <Input type={show ? 'text' : 'password'} name='password' fontSize='18px' variant='flushed' placeholder='Senha'
                                        value={formulario.password} onChange={handleInputChange} autoComplete='new-password' />
                                    <InputRightElement>
                                        <Box onClick={handleClickEyes} _hover={{ cursor: 'pointer' }} >
                                            {show ? <IconEye color='#003366' />
                                                : <IconEyeClosed color='#003366' />}
                                        </Box>
                                    </InputRightElement>
                                </InputGroup>

                            </Box>
                        </Stack>

                        <Button type='submit' bg='#6699CC' color='#FFF' w='100%' h={12} fontSize={20} _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-1px)` }}
                            _active={{ transform: 'translateY(1px)' }} disabled={isLoading} >
                            {isLoading ?
                                (<Spinner thickness='3px' speed="0.65s" color="white" size="md" position="absolute" />)
                                :
                                ('Entrar')}
                        </Button>
                    </Stack>
                    <Box as='button' type='button' position='relative' maxW='85%' fontWeight={500} color='#003366' _hover={{ bg: `none`, textDecoration: `underline` }} onClick={onOpen} >
                        Esqueceu sua senha?
                    </Box>
                </Stack>
            </Stack>

            {/* ////////////// MODAL RECUPERAÇÃO DE SENHA ////////////// */}
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}            >
                <ModalOverlay />
                <ModalContent >
                    <Stack as='form' onSubmit={handleRecoverPass} >
                        <ModalHeader>Informe seu e-mail</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormLabel>E-mail</FormLabel>
                            <Input name='email' type='email' value={formRecPass.email} onChange={handleEmailChange} placeholder='Digite seu e-mail' required />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit' disabled={isLoadingRec}> Recuperar senha </Button>
                            <Button onClick={onClose} >Cancelar</Button>
                        </ModalFooter>
                    </Stack>
                </ModalContent>
            </Modal>

        </VStack>
    )
}
