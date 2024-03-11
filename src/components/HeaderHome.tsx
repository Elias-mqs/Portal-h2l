
import { Flex, Box, Text, VStack } from '@chakra-ui/react'
import { ButtonHamburger } from '.'
import CaminhoHeader from './CaminhoHeader'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'


export default function HeaderHome() {
    return (
        <VStack
            bg='transparent'
            w='100%'
            h='80px'
            paddingTop='10px'
            align='stretch'
        >
            <Flex
                h='35px'
                alignItems='flex-start'
                justifyContent='space-between'
            >
                <Box color='#7B809A'>
                    <CaminhoHeader />
                    <ButtonHamburger />
                </Box>
                <Box
                    display='flex'
                    w='90px'
                    p='0 30px 0 0'
                    justifyContent='space-between'
                    color='#7B809A'
                >
                    <SettingsIcon />
                    <NotificationsIcon />
                </Box>
            </Flex>
            <Flex
                m='0px 30px'
                borderBottom='1px solid rgb(123, 128, 154, 0.4)'
            >
                <Text
                    marginLeft='95px'
                    p='0 30px'
                    color='#004B96'
                    borderBottom='1px solid #004B96'
                    fontWeight='500'
                    position='relative'
                    bottom='-1px'
                    zIndex='1'
                >
                    Home
                </Text>
             
            </Flex>
        </VStack >
    )
}