import { Flex, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router';

export default function HomePage() {
    const router = useRouter();

    return (
        <Flex>
            <Button colorScheme='teal' size='lg' onClick={() => router.push('/login')}>
                Login
            </Button>
        </Flex>
    );
}