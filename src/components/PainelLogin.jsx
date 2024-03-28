
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
import styles from '../styles/PainelLogin.module.css'
import axios from "axios"
import { IconLock, IconEyeClosed, IconEye } from '@tabler/icons-react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useRouter } from 'next/router'
import { useState, useRef } from "react"




export default function PainelLogin() {


    const [show, setShow] = useState(false) ///// CONTROLE DE ESTADO BUTTON EYES
    const [isLoading, setIsLoading] = useState(false); ///// CONTROLE DE ESTADO SPINNER LOADING
    const [formulario, setFormulario] = useState({ ///// CONTROLE DE ESTADO FORMULARIO PARA RECEBER DADOS DO USER
        username: '',
        password: ''
    })

    const toast = useToast() ///// INSTANCIA PARA FEEDBACKS AO TENTAR LOGAR (CARDS SUCCESS/ERRROR)
    const router = useRouter() ///// INSTANCIA PARA REDIRECIONAMENTO

    const handleClickEyes = (e) => { ///// CONTROLE DO EYE PARA NÃO SUBMIT AO MUDAR O ESTADO
        e.preventDefault(); //EVITA O SUBMIT AO CLICAR
        setShow(!show);
    };


    /////////////////// CONST RESPONSAVEL POR MANIPULAR O EVENTO SUBMIT
    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true); // INICIA O SPINNER ANTES DA VALIDAÇÃO

        if (isLoading) { // QUANTO ATIVO EVITA QUE O USUARIO EVIE O FORM NOVAMENTE ENQUANTO LOGIN EM ANDAMENTO
            return;
        }

        // TRY/CATCH VALIDAÇÃO DO USUARIO
        try {
            const result = await axios.post('/api/login', formulario)
            const token = result?.data?.token;

            localStorage.setItem('token', token);
            setFormulario({ username: ``, password: `` })

            toast({
                title: "Success",
                description: result?.data?.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            router.push('/users');


        } catch (error) {
            toast({
                title: "Error",
                description: error?.response?.data?.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false);
        }
    }


    const handleInputChange = (e) => {
        // Cria uma cópia do estado atual usando spread operator
        let novosDados = { ...formulario };

        // Atualiza o valor correspondente ao nome do campo do evento
        novosDados[e.target.name] = e.target.value
        if (e.target.name == 'username') {
            novosDados.username = e.target.value.toLowerCase()
        }

        // Define o novo estado com os dados atualizados
        setFormulario(novosDados);
    }




    ////////////// TESTANDO MODAL DE RECUPERAÇÃO DE SENHA //////////////

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const handleInputPass = (e) => {

    }

    ////////////// TESTANDO MODAL DE RECUPERAÇÃO DE SENHA //////////////




    return (

        //src/components/PainelLogin.jsx
        <Stack className={styles.painel} >
            <Image
                src='img/LOGO-H2L.png'
                w='176px'
                h='80px'
                position='relative'
                top='0'
                transform='translate(0,40%)'
                bgSize='cover'
                bgRepeat='no-repeat'
                bgPosition='center'
            />

            <form onSubmit={handleLogin}>
                <FormControl top='35%'>
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
                                _hover={{ bg: `#5c7da6`, color: `#FFF` }}
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


            <Button color='#003366' top='16%' bg='' _hover={{ bg: `none`, textDecoration: `underline` }} onClick={onOpen}>Esqueceu sua senha?</Button>

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







        </Stack >


    )
}