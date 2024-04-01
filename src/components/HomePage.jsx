import { Flex, Button, Stack } from "@chakra-ui/react";
import { useRouter } from 'next/router';

export default function HomePage() {
    const router = useRouter();

    return (
        <VStack>
        <Flex>
            <Button colorScheme='teal' size='lg' onClick={() => router.push('/login')}>
                Login
            </Button>
        </Flex>

        <Flex>
            <Button colorScheme='teal' size='lg' onClick={() => router.push('/login')}>
                Login
            </Button>
        </Flex>
        </VStack>
    );
}