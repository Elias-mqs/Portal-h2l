
// src/components/SideBar.jsx
import { Box, Image, Stack, Flex, VStack } from "@chakra-ui/react";
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { ButtonSidebar } from ".";



const SideBar = ({ isOpen, transition, maxW }) => {

    const maxHeight = isOpen ? '600px' : '0px';
    const mdImgWidth = isOpen ? '200px' : '0px';


    return (

        <Stack
            w={'100%'}
            transition={transition}
            h={{ base: '100%', md: 'calc(100% - 64px)' }}
            maxH={{ base: maxHeight, md: '100%' }}
            maxW={maxW}
            overflow={{ base: `${isOpen ? 'visible' : 'hidden'}`, md: 'visible' }}
            position={{ base: 'sticky', md: 'fixed' }}
            bg='#EDF2FF'
            alignItems='center'
            borderRadius={{base: '0', md: '1.5rem'}}
            boxShadow={{ base: 'none', md: '0px 1px 4px 1px rgba(0, 0, 0, 0.2)' }}
        >
            <Stack align='center' gap={{base: 0, md: isOpen ? 5 : 0}} >

                <Box align='center' h={{base: '0', md:'100%'}}>

                    <Image w='60%'  m={isOpen ? '15px 0' : 0} maxW={{ base: '0', md: mdImgWidth }}
                     maxH={{ base: '0', md: maxHeight }} transition={{base: 'all 0s linear', md: transition}} src='img/LOGO-H2L.png' alt='Logo' />

                </Box>

               <Box align='center'>
                    <ButtonSidebar isOpen={isOpen} m={'10px 0 0 0'} btnText='Chamados' btnIcon={<SupportAgentOutlinedIcon />} />
                    <ButtonSidebar isOpen={isOpen} m={'10px 0 0 0'} btnText='Chamados' btnIcon={<SupportAgentOutlinedIcon />} />
                    <ButtonSidebar isOpen={isOpen} m={'10px 0 10px 0'} btnText='Chamados' btnIcon={<SupportAgentOutlinedIcon />} />
               </Box>
               

            </Stack>
        </Stack >
    )
};




export default SideBar;
