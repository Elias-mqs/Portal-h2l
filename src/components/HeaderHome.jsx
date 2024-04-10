
// primeiro código
import { Flex, Box, Text, VStack, IconButton, Stack, HStack, Spacer } from '@chakra-ui/react'
import { MdMenu } from "react-icons/md"
import { SideBar } from '.'
import CaminhoHeader from './CaminhoHeader'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useState } from 'react'


// estou tentando sincronizar o width do header e da sidebar

export default function HeaderHome() {

    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => { setIsOpen(!isOpen); };

    return (
        <Flex bg='transparent' w='100%' justify='space-between' spacing={10} >
            <Stack w={isOpen ? '200px' : '50px'} h='100%' pb='32px' > //transition='transform 1s linear' aqui
                <SideBar isOpen={isOpen} toggle={toggleSidebar} />
            </Stack>
            <Stack w='100%' >
                <Flex h='35px' alignItems='flex-start' justifyContent='space-between' >
                    <Box color='#7B809A' >
                        <CaminhoHeader />
                        <IconButton aria-label="Toggle Sidebar" bg='transparent' w='20px' icon={<MdMenu />} onClick={toggleSidebar} color='#7B809A' />
                    </Box>

                    <Box display='flex' w='90px' p='0 30px 0 0' justifyContent='space-between' color='#7B809A' >
                        <SettingsIcon />
                        <NotificationsIcon />
                    </Box>
                </Flex>

                <Flex m='0px 30px' borderBottom='1px solid rgb(123, 128, 154, 0.4)' >
                    <Text marginLeft='95px' p='0 30px' color='#004B96' borderBottom='1px solid #004B96' fontWeight='500' position='relative' bottom='-1px' zIndex='1' >
                        Home
                    </Text>
                </Flex>
            </Stack>
        </Flex >
    )
}