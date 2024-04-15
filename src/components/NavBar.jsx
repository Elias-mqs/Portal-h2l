import { HStack, VStack, Flex, Text, Button } from '@chakra-ui/react'
import { IconButtonHeader } from '.'
import { MdOutlineHome, MdOutlineSettings, MdNotifications } from 'react-icons/md'

function NavBar({ router, roadPage, onClickToggle, iconToggle, navTab }) {


    return (

        <VStack h='100%' align='start' bg='#FFF' borderBottom='2px solid rgb(123, 128, 154, 0.4)'>

            <HStack justify='space-between' w='100%' h='50%'>
                <VStack align='start'>
                    <Flex align='center' >
                        <IconButtonHeader ariaLabel='btnIconHome' icon={<MdOutlineHome size={22} />} onClick={router} />
                        <Text color='#7B809A' cursor='default'>/</Text>
                        <Button bg='transparent' p='0' ml='12px' color='#7B809A' _hover={{ bg: 'transparent' }}>{roadPage}</Button>
                    </Flex>
                </VStack>
                <HStack align='start' wrap='wrap' >
                    <IconButtonHeader icon={<MdOutlineSettings size={22} />} />
                    <IconButtonHeader icon={<MdNotifications size={22} />} />
                </HStack>
            </HStack>

            <Flex align='center' objectFit={'cover'} justify='space-between' h='50%' w='30%' >
                <IconButtonHeader alt="Toggle Sidebar" icon={iconToggle} onClick={onClickToggle} />
                <Text color='#004B96' p='7.6px' cursor='pointer' borderBottom='2px solid #004B96'>{navTab}</Text>
            </Flex>
        </VStack>
    )
}

export default NavBar;