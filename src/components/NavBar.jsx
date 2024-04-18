import { HStack, Flex, Text } from '@chakra-ui/react'
import { IconButtonHeader } from '.'
import { MdOutlineHome, MdOutlineSettings, MdNotifications } from 'react-icons/md'

function NavBar({ onClickToggle, iconToggle, navTab }) {


    return (

        <HStack h='100%' align='start'  justify={'space-between'} p={'0 20px'} borderBottom='2px solid rgb(123, 128, 154, 0.4)'>
             {/* mb={{base: 0, md:'10px'}} */}

            <Flex align='center' objectFit={'cover'} justify='space-between' h='100%' w={{base: '40%', md: '30%'}} >
                <IconButtonHeader alt="Toggle Sidebar" icon={iconToggle} onClick={onClickToggle} />
                <Text color='#004B96' p='7.6px' cursor='pointer' borderBottom='2px solid #004B96'>{navTab}</Text>
            </Flex>

                <HStack align='start' wrap='wrap' >
                    <IconButtonHeader icon={<MdOutlineSettings size={22} />} />
                    <IconButtonHeader icon={<MdNotifications size={22} />} />
                </HStack>

        </HStack>
    )
}

export default NavBar;