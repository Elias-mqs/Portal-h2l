import PainelLogin from "@/components/PainelLogin"
import { Stack } from "@chakra-ui/react"

export default function Login() {
    return (
        <Stack w="full" h="100vh" p={{ base: 0, md: '32px' }} align='center' justify='center'
            backgroundImage="url('/img/bgLogin.jpg')"
            backgroundSize="cover"
            bgRepeat='no-repeat'
            backgroundPosition="center" >
            <PainelLogin />
        </Stack>
    )
}