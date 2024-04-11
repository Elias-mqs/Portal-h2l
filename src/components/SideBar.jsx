
// src/components/SideBar.jsx
import { Box, Image, Stack, Text, Flex, Button, Collapse, Slide, Lorem, VStack, Icon } from "@chakra-ui/react";
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';



const SideBar = ({ isOpen, maxW, transition, }) => {
    return (

        <Stack
            w='200px'
            transition={transition}
            h='calc(100% - 64px)'
            maxW={maxW}
            position='fixed'
            bg='#EDF2FF'
            alignItems='center'
            borderRadius='1.5rem'
            boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)'
        >
{/* RESPONSIVIDADE AJUSTADA, AGORA É SÓ FAZER UM COMPONENTE DESSE BUTTON E VAPO */}
            <Stack w='200px' maxW={maxW} align='center'>

                <Image w='150px' h='75px' m='15px 0' maxW={isOpen ? '100%' : 0} src='img/LOGO-H2L.png' alt='Logo' transition={transition} />

                <Box align='center'>

                    <Button w='100%' maxWidth={isOpen ? '100%' : '40px'} bg='transparent' transition={transition} h='50px' gap={2} >
                        <Icon boxSize='40px'  ml={isOpen ? '0' : '10px'}>
                            <SupportAgentOutlinedIcon />
                        </Icon>

                        <Box style={{ maxWidth: isOpen ? '100%' : 0, overflow: 'hidden', transition: 'max-width .5s ease' }}>
                            <Text>
                                Chamados
                            </Text>
                        </Box>
                    </Button>

                    <Text>Item 2</Text>
                    <Text>Item 3</Text>

                </Box>

            </Stack>

        </Stack >
    )
};




export default SideBar;
