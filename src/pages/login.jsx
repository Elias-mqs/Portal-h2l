import PainelLogin from "@/components/PainelLogin"
import { Stack } from "@chakra-ui/react"
import Image from "next/image"

export default function Login() {
    return (
        <Stack align='center' justify='center' w='100%' h='100vh' position="relative">
            <Image src='/img/recepcaoh2l.jpg' alt='Recepcao H2L' layout="fill" priority={true} />
            <PainelLogin />
        </Stack>
    )
}