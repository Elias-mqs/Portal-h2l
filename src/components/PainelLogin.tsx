
import {
    Flex,
    Box,
    Button,
    Stack,
    VStack,
    Text,
    Image,
    FormControl,
    useToast,
    Input,
} from "@chakra-ui/react"
import styles from '../styles/PainelLogin.module.css'
// import { InputPassword, InputUsername } from './index'
import Link from "next/link"
import axios from "axios"
import { useRouter } from 'next/router'
import { useState } from "react"




export default function PainelLogin() {


    const toast = useToast()
    const router = useRouter()
    const [formulario, setFormulario] = useState({
        username: '',
        password: ''
    })




    const handleLogin = async (e: any) => {
        e.preventDefault()
        console.log(e)
        try {
            const result: any = await axios.post('/api/login', formulario)
            const token = result?.data?.token;

            localStorage.setItem('token', token);

            setFormulario({ username: ``, password: `` })

            toast({
                title: "success",
                description: result?.data?.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            router.push('/users');

            

            console.log(result)
        } catch (error: any) {
            console.log(error)

            toast({
                title: "error",
                description: error?.response?.data?.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })


        }
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Cria uma cópia do estado atual usando spread operator
        let novosDados: any = { ...formulario };

        // Atualiza o valor correspondente ao nome do campo do evento
        novosDados[e.target.name] = e.target.value
        if(e.target.name == 'username') {
            novosDados.username = e.target.value.toLowerCase()
        }

        // Define o novo estado com os dados atualizados
        setFormulario(novosDados);

        // Exibe os novos dados no console
        // console.log(novosDados);
    }




    return (

        <Flex className={styles.painel} >
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
                <FormControl top='30%' >
                    <Stack spacing='35px' top='30px' left='12.5%'>
                        <Stack spacing='30px'>
                            <Box >
                                <Text color='#003366' p='0 3px' fontSize={14} fontWeight={500}>Username</Text>
                                <Input
                                    variant='flushed'
                                    placeholder='Username'
                                    name='username'
                                    value={formulario.username}
                                    onChange={handleInputChange}

                                />

                            </Box>
                            <Box >
                                <Text color='#003366' p='0 3px' fontSize={14} fontWeight={500}>Password</Text>
                                <Input
                                    type='password'
                                    name='password'
                                    variant='flushed'
                                    placeholder='Password'
                                    value={formulario.password}
                                    onChange={handleInputChange}
                                />
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

                            >
                                Login
                            </Button>

                            <Link href='./recuperarSenha'>
                                <Button
                                    bg='transparent'
                                    fontWeight='500'
                                    color='#003366'
                                    fontSize={15}
                                    cursor='pointer'
                                    _hover={{ textDecoration: 'underline' }}
                                >
                                    Esqueceu a senha?
                                </Button>
                            </Link>
                        </VStack>
                    </Stack>
                </FormControl>
            </form>

        </Flex >


    )
}