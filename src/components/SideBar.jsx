
// src/components/SideBar.jsx
import { Box, Image, Stack, Text, Flex } from "@chakra-ui/react";



const SideBar = ({ isOpen }) => {
    return (

        <Stack
            w={isOpen ? '100%' : '50px'}
            h='calc(100% - 64px)'
            maxW='200px'
            // maxH='90%'
            position='fixed'
            t='0'
            l='0'
            bg='#EDF2FF'
            alignItems='center'
            borderRadius='1.5rem'
            boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)'
            // transition='transform 1s linear'
        >

            <Box p='20px 20px 25px 20px'>
                <Image w='150px' h='75px' src='img/LOGO-H2L.png' alt='Logo' />
            </Box>

            <Box p="4">
                <Text>Item 1</Text>
                <Text>Item 2</Text>
                <Text>Item 3</Text>
            </Box>

        </Stack >
    )
}
export default SideBar;
