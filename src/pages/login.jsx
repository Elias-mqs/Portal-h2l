
import PainelLogin from "@/components/PainelLogin"
import { HStack } from "@chakra-ui/react"

export default function Login() {
    return (
        <HStack w="full" h="100vh" p={{base: 0, md: '32px'}} justify='center' >
            <PainelLogin/>
        </HStack>
    )
}