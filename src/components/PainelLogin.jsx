//src/components/PainelLogin.jsx
import {
    Box,
    Button,
    Stack,
    VStack,
    Text,
    Image,
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
import { useState, useRef, useEffect } from "react"
import { FormInputBtnL } from '@/components'
import api from '../utils/api'
import axios from 'axios'
import Cookies from 'js-cookie'


// Componente PainelLogin
export default function PainelLogin() {

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRec, setIsLoadingRec] = useState(false);
    const [formulario, setFormulario] = useState({
        username: '',
        password: ''
    })
    const [formRecPass, setFormRecPass] = useState({
        email: ''
    })

    // Hooks
    const toast = useToast() // Hook para exibir notificações na tela
    const router = useRouter() // Hook para manipular a navegação

    // Função para alternar a visibilidade da senha
    const handleClickEyes = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    // Impede o envio do formulário ao pressionar Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    ///////////// MINHA Função para lidar com o envio do formulário de login
    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        if (isLoading) {
            return;
        }

        try {
            const result = await api.post('login', formulario)
            const token = result?.data?.token;
            Cookies.set('token', token);
            setFormulario({ username: ``, password: `` })

            toast({ title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

            router.push('/')

        } catch (error) {
            toast({ title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })

        } finally {
            setIsLoading(false);
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

    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9]+(\.[a-z0-9]+)*@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente.", status: 'error', duration: 2000, isClosable: true, });
            return false;
        }
        return true;
    }

    const handleRecoverPass = async (e) => {
        e.preventDefault()
        setIsLoadingRec(true);

        if (!validateEmail(formRecPass.email)) {
            return;
        }
        if (isLoadingRec) {
            return;
        }

        try {
            const result = await axios.post('/api/recoveryPass', formRecPass)
            console.log(result)
            setFormRecPass({ email: '' })

            toast({ description: 'Se houver um e-mail cadastrado, você receberá uma mensagem com instruções de recuperação.', duration: 6000, isClosable: true, })

        } catch (error) {
            console.log(error)
            toast({ description: 'Se houver um e-mail cadastrado, você receberá uma mensagem com instruções de recuperação.', duration: 6000, isClosable: true, })
        } finally {
            onClose()
            setIsLoadingRec(false);
        }
    }
    const handleEmailChange = (e) => {
        setFormRecPass({ ...formRecPass, email: e.target.value })
    }


    return (

        <VStack bg='#EDF2FF' borderRadius={{ base: 0, md: '1.5rem' }} w={{ base: '100%', md: '500px' }} h={{ base: '100%', md: 'lg' }} p='0px 50px'
            boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' justify='center' position='fixed' overflow='auto' >

            <Stack w='100%' align='center' gap={{ base: 20, md: 12 }}>

                <Image src='img/LOGO-H2L.png' fit='contain' w={{ base: '150px', md: '180px' }} />

                <Stack w='100%' align='center' gap={4}>
                    <Stack as='form' onSubmit={handleLogin} w='100%' maxW='100%' gap={10} >
                        <Stack spacing={8}>

                            <FormInputBtnL name={'username'} value={formulario.username} fontSize={'18px'} variant={'flushed'} label={'Usuário'}
                                icon={<PersonOutlineOutlinedIcon sx={{ color: `#003366` }} />} placeholder={'Nome de usuário'} onChange={handleInputChange} />

                            <Box >
                                <Text pb={1} pl={2} fontSize={14} fontWeight={500}>Senha</Text>
                                <InputGroup>
                                    <InputLeftElement>
                                        <IconLock color='#003366' />
                                    </InputLeftElement>
                                    <Input type={show ? 'text' : 'password'} name='password' fontSize='18px' variant='flushed' placeholder='Senha'
                                        value={formulario.password} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                                    <InputRightElement>
                                        <Box as='button' onClick={handleClickEyes}>
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
