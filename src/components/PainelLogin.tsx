
import { Flex, Box, Button, Stack, VStack, Text, Image } from "@chakra-ui/react"
import styles from '../styles/PainelLogin.module.css'
import { InputPassword, InputUsername } from './index'




export default function PainelLogin() {
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


            <Stack className={styles.boxLogin} spacing='35px' top='20px'>
                
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
                    <Text fontWeight='500'
                        color='#003366'
                        fontSize={14}
                        cursor='pointer'
                    >
                        Esqueceu a senha?
                    </Text>
                </VStack>
            </Stack>


        </Flex >

    )
}