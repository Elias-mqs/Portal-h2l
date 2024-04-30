import { Flex, Button, VStack } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";

export default function HomePage() {
    const router = useRouter();

    return (
        <VStack>
            <Flex>
                <Button colorScheme="teal" size='lg' onClick={() => signOut({callbackUrl: 'http://localhost:3000/login'})} >Sign out</Button>

                <Button colorScheme='teal' size='lg' onClick={() => router.push('/login')}>
                    Login
                </Button>
            </Flex>
        </VStack>
    );
}