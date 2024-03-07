
import { Box, Flex, Image } from "@chakra-ui/react";
import ButtonHome from "./ButtonHome";



export default function SideBar() {
    return (
        <Flex
            w='100%'
            h='100%'
            maxW='250px'
            bg='#EDF2FF'
            alignItems='center'
            p='6px'
            flexDirection='column'
            borderRadius='1.5rem'
            boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)'
        >
            <Box p='20px' borderBottom='1px solid rgba(0, 75, 150, 0.4)'>
                <Image w='150px' h='75px' src='img/LOGO-H2L.png' alt='Logo' />
            </Box>
            <Flex p='30px 0'>
                <ButtonHome/>
            </Flex>
        </Flex >
    )
}