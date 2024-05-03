import { Flex, Button, VStack } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

export default function HomePage() {
    const router = useRouter();

    const handleLogOut = () => {
        Cookies.remove('token')
        router.push('/login')
    }

    return (
        <VStack>
            <Flex gap={5}>
                <Button colorScheme="teal" size='lg' onClick={handleLogOut} >Sign out</Button>

                <Button colorScheme='teal' size='lg' onClick={() => router.push('/login')}>
                    Login
                </Button>
            </Flex>
        </VStack>
    );
}