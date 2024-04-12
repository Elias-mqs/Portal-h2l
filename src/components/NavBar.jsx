import { HStack, VStack, Flex, Text } from '@chakra-ui/react'
import { IconButtonHeader } from './IconButtonHeader'
import { useRouter } from 'next/router';

function NavBar ({ router, toggleSidebar }) {

    const router = useRouter();
    
    return(
    <HStack justify='space-between' w='100%' h='50%'>
        <VStack align='start'>
            <Flex align='center' >
                <IconButtonHeader ariaLabel='btnIconHome' icon={<MdOutlineHome size={22} />} onClick={() => router.push('/')} />
                <Text color='#7B809A' cursor='default'>/</Text>
                <Button bg='transparent' p='0' ml='12px' color='#7B809A' _hover={{ bg: 'transparent' }}>Home</Button>
            </Flex>
        </VStack>
        <HStack align='start' wrap='wrap' >
            <IconButtonHeader icon={<MdOutlineSettings size={22} />} />
            <IconButtonHeader icon={<MdNotifications size={22} />} />
        </HStack>
    </HStack>
    )
}

export default NavBar;