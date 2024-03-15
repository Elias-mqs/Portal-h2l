
import {
    Flex,
    Box,
    Button,
    Stack,
    VStack,
    Text,
    Image,
    FormControl,
    useToast
} from "@chakra-ui/react"
import styles from '../styles/PainelLogin.module.css'
import { InputPassword, InputUsername } from './index'
import Link from "next/link"
import axios from "axios"




export default function PainelLogin() {


    const toast = useToast()


    const handleLogin = (e) => {
        e.preventDefault()
        console.log(e)
        try {
            const formulario = { username: "", password: "" }
            const result: any = axios.post('/api/login', formulario)

            toast({
                title: "success",
                description: result?.data?.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            console.log(result)
        } catch (error: any) {
            console.log(error)
            toast({
                title: "error",
                description: error?.response?.data?.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

        }
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
                    <Stack  spacing='35px' top='30px' left='12.5%'>
                        <Stack spacing='30px'>
                            <Box >
                                <Text color='#003366'
                                    p='0 3px'
                                    fontSize={14}
                                    fontWeight={500}
                                >
                                    Username
                                </Text>
                                <InputUsername />
                            </Box>
                            <Box >
                                <Text color='#003366' p='0 3px' fontSize={14} fontWeight={500}>Password</Text>
                                <InputPassword />
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
                                <Button bg='transparent' fontWeight='500' color='#003366' fontSize={15} cursor='pointer' _hover={{ textDecoration: 'underline' }} >
                                    Esqueceu a senha?
                                </Button>
                            </Link>
                        </VStack>
                    </Stack>
                </FormControl>
            </form>

        </Flex >

        // meu banco de dados se chama: portal-h2l
        // tem 1 tabela chamada usuarios e 5 colunas: id_user, name, username, password e sit
        // a parte do sit é referente a situação do usuario.



    )
}