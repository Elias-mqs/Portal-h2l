
import {
    Box,
    Button,
    Stack,
    VStack,
    Container,
    Text,
    Image,
    FormControl,
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
import styles from '../styles/PainelLogin.module.css'
import axios from "axios"
import { IconLock, IconEyeClosed, IconEye } from '@tabler/icons-react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useRouter } from 'next/router'
import { useState, useRef } from "react"



// Componente PainelLogin
export default function PainelLogin() {
    //Estados

    const [show, setShow] = useState(false); // Estado para controlar visibilidade da senha
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o estado de carregamento
    const [formulario, setFormulario] = useState({ // Estado para armazenar dados do formulário
        username: '',
        password: ''
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
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    // Função para lidar com o envio do formulário de login
    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        if (isLoading) {
            return;
        }


        try {
            const result = await axios.post('/api/login', formulario)
            const token = result?.data?.token;
            console.log(result)
            console.log(token)
            localStorage.setItem('token', token);
            setFormulario({ username: ``, password: `` })

            toast({
                title: "Sucesso!",
                description: result?.data?.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            router.push('/users');


        } catch (error) {
            toast({
                title: "Erro!",
                description: error?.response?.data?.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false);
        }
        console.log(setFormulario)
        console.log(handleLogin)

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




    ////////////// TESTANDO MODAL DE RECUPERAÇÃO DE SENHA //////////////

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const handleInputPass = (e) => {

    }

    ////////////// TESTANDO MODAL DE RECUPERAÇÃO DE SENHA //////////////




    return (

        <Stack >
            <VStack className={styles.painel} overflow='auto'>

                <Image
                    src='img/LOGO-H2L.png'
                    fit='cover'
                    boxSize='86px'
                    w={{ md: '210px' }}
                    p='0 10px'
                    transform='translate(0,40%)'
                />

                <form onSubmit={handleLogin}>
                    <FormControl top='28%' >
                        <Stack spacing='35px' top='30px' left='12.5%'>
                            <Stack spacing='30px'>

                                <Box >
                                    <Text color='#003366' p='0 3px' fontSize={14} fontWeight={500}>Usuário</Text>
                                    <InputGroup>
                                        <InputLeftElement >
                                            <PersonOutlineOutlinedIcon sx={{ color: `#003366` }} />
                                        </InputLeftElement>
                                        <Input
                                            variant='flushed'
                                            placeholder='Nome de usuário'
                                            name='username'
                                            fontSize='18px'
                                            value={formulario.username}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </InputGroup>
                                </Box>

                                <Box >
                                    <Text color='#003366' p='0 3px' fontSize={14} fontWeight={500}>Senha</Text>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <IconLock color='#003366' />
                                        </InputLeftElement>
                                        <Input
                                            type={show ? 'text' : 'password'}
                                            name='password'
                                            fontSize='18px'
                                            variant='flushed'
                                            placeholder='Senha'
                                            value={formulario.password}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <InputRightElement>
                                            <Box as='button' onClick={handleClickEyes}>
                                                {show ? <IconEye color='#003366' />
                                                    : <IconEyeClosed color='#003366' />}
                                            </Box>
                                        </InputRightElement>
                                    </InputGroup>
                                </Box>
                            </Stack>

                            <VStack spacing={3}>
                                <Button
                                    type='submit'
                                    bg='#6699CC'
                                    color='white'
                                    w='100%' h='48px'
                                    fontSize={20}
                                    borderRadius='4px'
                                    alignItems='center'
                                    justifyContent='center'
                                    fontWeight='550'
                                    _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-1px)` }}
                                    _active={{ transform: 'translateY(1px)' }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Spinner
                                            thickness='3px'
                                            speed="0.65s"
                                            color="white"
                                            size="md"
                                            position="absolute"
                                        />
                                    ) : (
                                        'Entrar'
                                    )}
                                </Button>
                            </VStack>
                        </Stack>
                    </FormControl>
                </form>






                {/* ////////////// MODAL RECUPERAÇÃO DE SENHA ////////////// */}


                <Box
                    as='button'
                    position='relative'
                    maxW='85%'
                    top='14%'
                    fontWeight={500}
                    color='#003366'
                    _hover={{ bg: `none`, textDecoration: `underline` }}
                    onClick={onOpen}
                >
                    Esqueceu sua senha?
                </Box>

                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent >
                        <FormControl isRequired>
                            <ModalHeader>Informe seu e-mail</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormLabel>E-mail</FormLabel>
                                <Input type='email' placeholder='Digite seu e-mail' />
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3}>
                                    Recuperar senha
                                </Button>
                                <Button onClick={onClose}>Cancelar</Button>
                            </ModalFooter>
                        </FormControl>
                    </ModalContent>
                </Modal>


                {/* ////////////// MODAL RECUPERAÇÃO DE SENHA ////////////// */}



            </VStack>




        </Stack >


    )
}