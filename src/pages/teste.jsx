
import styles from "../styles/LoginPage.module.css"
import { ButtonSub, InputCustom } from '../components/FormCustom'
import { Button, Center, FormControl, HStack, Stack } from "@chakra-ui/react"
import { FormGroup } from "@mui/material"

export default function Login() {
    return (
        <HStack w="full" h="100vh" className={styles.bgLogin} >
            <form>
                <FormControl align='center' >
                    <Stack bg='#666666' boxSize='600px' justify='space-around' align='center' p='50px' >

                        <InputCustom label='Teste1' n='' ph='Testando Props' />

                        <InputCustom label='Teste2' n='teste2' ph='Segundo teste' />

                        <InputCustom label='Teste3' n='teste3' ph='Terceiro teste' />


               
                        <Button
                            type='submit'
                            bg='#6699CC'
                            color='white'
                            w='100%'
                            h='48px'
                            borderRadius='4px'
                            fontSize='lg'
                            fontWeight='500'
                            _hover={{ bg: `#5c7da6`, color: `#FFF` }}
                        >
                            Sign up
                        </Button>
                    </Stack>
                </FormControl>
            </form>
        </HStack>
    )
}