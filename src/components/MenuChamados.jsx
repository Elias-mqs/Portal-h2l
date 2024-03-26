
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Box,
    Flex,
    Container,
    Text,
    Stack,
} from "@chakra-ui/react"
import { IconChevronDown, IconChevronUp, IconPointFilled } from "@tabler/icons-react"
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { useState } from "react";


export default function MenuChamados() {


    // Constantes para alterar a cor quando o botão estiver on ou off

    const [isOn, setIsOn] = useState(false);
    const mudar = () => { setIsOn(!isOn); }

    const stylesButtonOne = {
        background: 'linear-gradient(to bottom, #96C6F5, #EDF2FF)',
        width: '220px',
        height: '50px',
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: '16px',
    }
    const stylesButtonTwo = {
        background: 'transparent',
        width: '220px',
        height: '50px',
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: '16px'
    }


    const [novoChamado, setNovoChamado] = useState(false)
    const novoChamadoBg = () => { setNovoChamado(!novoChamado); }
    const [chamadoEmAndamento, setChamadoEmAndamento] = useState(false)
    const chamadoEmAndamentoBg = () => { setChamadoEmAndamento(!chamadoEmAndamento); }



    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    <Container
                        _hover={{
                            bgGradient: 'linear(to-b, #96C6F5, #EDF2FF)',
                        }}
                        borderRadius='0.375rem'
                        w='220px'
                        h='50px'
                        p='0'
                        display='flex'
                        justifyContent='space-between'

                    >

                        {/* Layout dos icons */}
                        <MenuButton
                            isActive={isOpen}
                            as={Button}
                            w='220px'
                            h='50px'

                            // Aqui define os icons quando
                            //  o elemento esta ativo ou não
                            rightIcon={
                                isOpen ?
                                    <IconChevronUp />
                                    :
                                    <IconChevronDown />
                            }
                            onClick={mudar}
                            style={isOn ? stylesButtonOne : stylesButtonTwo}
                        >

                            {/* Icons e text */}
                            <Flex alignItems='center' fontSize='16px'>
                                <Box p='0 20px 0 0px'>
                                    <SupportAgentOutlinedIcon
                                        sx={{
                                            color: `#003366`,
                                            fontSize: '35px',
                                        }}
                                    />
                                </Box>
                                Chamados
                            </Flex>
                        </MenuButton>

                        {/* Sub-Menu */}
                        <MenuList
                            bg='transparent'
                            boxShadow='none'
                            border='0'
                        >

                            {/* Container para o gap dos subitens */}
                            <Stack spacing={(3)} >


                                {/* Itens Sub-menu */}
                                {/* Button Chamados */}
                                <MenuItem
                                    bg='transparent'
                                    w='220px'
                                    h='50px'
                                    borderRadius='0.375rem'
                                    p='0 20px 0 15px'
                                    color='#000'
                                    _hover={{
                                        bg: '#99ccffac',
                                        boxShadow: 'inset 0px 0px 2px 1px rgba(0, 0, 0, 0.2)'
                                    }}
                                    onClick={novoChamadoBg}
                                    style={novoChamado ?
                                        { backgroundColor: '#99ccffac', boxShadow: 'inset 0px 0px 2px 1px rgba(0, 0, 0, 0.2)' }
                                        :
                                        { backgroundColor: 'transparent' }
                                    }
                                >
                                    <Flex alignItems='center' fontSize='16px'>
                                        <Box p='0 10px 0 20px' >
                                            <IconPointFilled width='20px' />
                                        </Box>
                                        Novo Chamado
                                    </Flex>


                                </MenuItem>
                                {/* Button Chamados em andamento */}

                                <MenuItem
                                    // usando esse onclick da para criar uma rota para outra page
                                    // onClick={() => alert('Kagebunshin')}
                                    bg='transparent'
                                    w='220px'
                                    h='50px'
                                    borderRadius='0.375rem'
                                    p='0 20px 0 15px'
                                    color='#000'
                                    _hover={{
                                        bg: '#99ccffac',
                                        boxShadow: 'inset 0px 0px 2px 1px rgba(0, 0, 0, 0.2)'
                                    }}
                                    onClick={chamadoEmAndamentoBg}
                                    style={chamadoEmAndamento ?
                                        { backgroundColor: '#99ccffac', boxShadow: 'inset 0px 0px 2px 1px rgba(0, 0, 0, 0.2)' }
                                        :
                                        { backgroundColor: 'transparent' }
                                    }
                                >
                                    <Flex alignItems='center' fontSize='16px'>
                                        <Box p='0 0px 0 20px' >
                                            <IconPointFilled width='20px' />
                                        </Box>
                                        <Text textAlign='center' >
                                            Chamados em andamento
                                        </Text>
                                    </Flex>
                                </MenuItem>                                        
                            </Stack>
                        </MenuList>
                    </Container>
                </>
            )}
        </Menu>
    )
}


//     <Box
//     w='100%'
//     h='1px'
//     bgGradient={['linear(to-l, #EDF2FF, blue.500, #EDF2FF)']}
// />