
import { Box, Flex, Image } from "@chakra-ui/react";
import ButtonHome from "./ButtonHome";
import { MenuPedidos, MenuChamados } from ".";



export default function SideBar() {
    return (

        // Fundo do painel
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
            {/* Logo */}
            <Box p='20px 20px 25px 20px'>
                <Image w='150px' h='75px' src='img/LOGO-H2L.png' alt='Logo' />
            </Box>

            {/* Barra de divisão com gradient */}
            <Box
                w='100%'
                h='1px'
                bgGradient={['linear(to-l, #EDF2FF, blue.500, #EDF2FF)']}
            />

            {/* Div do botão */}
            <Flex p='25px 0px 20px 0px' >
                <ButtonHome />
            </Flex>

            {/* Barra de divisão com gradient */}
            <Box
                w='100%'
                h='1px'
                bgGradient={['linear(to-l, #EDF2FF, blue.500, #EDF2FF)']}
            />

            <Flex p='25px 0px 20px 0px' >
                <MenuChamados />
                {/* Barra de divisão com gradient */}
            </Flex>
            <Box
                w='100%'
                h='1px'
                bgGradient={['linear(to-l, #EDF2FF, blue.500, #EDF2FF)']}
            />
            <Flex p='25px 0px 20px 0px' >
                <MenuPedidos />
                {/* Barra de divisão com gradient */}
            </Flex>




        </Flex >
    )
}