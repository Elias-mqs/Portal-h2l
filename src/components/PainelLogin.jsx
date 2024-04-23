
import {
    Box,
    Button,
    Stack,
    VStack,
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
import { IconLock, IconEyeClosed, IconEye } from '@tabler/icons-react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useRouter } from 'next/router'
import { useState, useRef } from "react"
import { FormInputBtnL } from '@/components'
import api from '../utils/api'


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
            const result = await api.post('login', formulario)
            const token = result?.data?.token;
            localStorage.setItem('token', token);
            setFormulario({ username: ``, password: `` })

            toast({ title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

            router.push('/users');

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




    ////////////// TESTANDO MODAL DE RECUPERAÇÃO DE SENHA //////////////

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const handleInputPass = (e) => {

    }

    ////////////// TESTANDO MODAL DE RECUPERAÇÃO DE SENHA //////////////

    return (

        <VStack bg='#EDF2FF' borderRadius={{ base: 0, md: '2rem' }} w={{ base: '100%', md: '500px' }} h={{ base: '100%', md: 'lg' }} p='0px 50px'
            boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' justify='center' >
            <Stack w='100%' align='center' gap={{base: 20, md: 12 }}>

                <Image src='img/LOGO-H2L.png' fit='contain' w={{ base: '150px', md: '180px' }} />
                <Stack as='form' onSubmit={handleLogin} w='100%' maxW='100%' gap={10} >
                    <Stack spacing='30px'>

                        <FormInputBtnL name={'name'} value={formulario.username} fontSize={'18px'} variant={'flushed'} label={'Usuário'}
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

                    <VStack spacing={3}>

                        <Button type='submit' bg='#6699CC' color='#FFF' w='100%' h={12} fontSize={20}
                            _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-1px)` }} _active={{ transform: 'translateY(1px)' }} disabled={isLoading} >
                            {isLoading ?
                                (<Spinner thickness='3px' speed="0.65s" color="white" size="md" position="absolute" />)
                                :
                                ('Entrar')}
                        </Button>
                        <Box as='button' position='relative' maxW='85%' fontWeight={500} color='#003366' _hover={{ bg: `none`, textDecoration: `underline` }} onClick={onOpen} >
                            Esqueceu sua senha?
                        </Box>
                    </VStack>
                </Stack>
            </Stack>


            {/* ////////////// MODAL RECUPERAÇÃO DE SENHA ////////////// */}
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}            >
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

        </VStack>
    )
}