
import PainelLogin from "@/components/PainelLogin"
import styles from "../styles/LoginPage.module.css"
import { HStack } from "@chakra-ui/react"

export default function Login() {
    return (
        <HStack w="full" h="100vh" className={styles.bgLogin}>
            <PainelLogin/>
        </HStack>
    )
}