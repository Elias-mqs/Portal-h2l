
// src/components/SideBar.jsx
import { Box, Image, Stack, Text, Flex, Button, Collapse, Slide, Lorem, VStack, Icon } from "@chakra-ui/react";
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { ButtonSidebar } from ".";



const SideBar = ({ isOpen, maxW, transition, }) => {
    return (

        <Stack
            w={'100%'}
            transition={transition}
            h='calc(100% - 64px)'
            maxW={maxW}
            position='fixed'
            bg='#EDF2FF'
            alignItems='center'
            borderRadius='1.5rem'
            boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)'
        >
            <Stack align='center'>

                <Image w='90%' h='75px' m={isOpen ? '15px 0' : 0} maxW={isOpen ? '100%' : 0} maxH={isOpen ? '100%' : 0} src='img/LOGO-H2L.png' alt='Logo' transition={transition} />

                <Box align='center' direction='column'>
                    <ButtonSidebar isOpen={isOpen} btnText='Chamados' btnIcon={<SupportAgentOutlinedIcon />} btnTransition={transition} />
                    <ButtonSidebar isOpen={isOpen} btnText='Chamados' btnIcon={<SupportAgentOutlinedIcon />} btnTransition={transition} />
                    <ButtonSidebar isOpen={isOpen} btnText='Chamados' btnIcon={<SupportAgentOutlinedIcon />} btnTransition={transition} />
                </Box>

            </Stack>
        </Stack >
    )
};




export default SideBar;
