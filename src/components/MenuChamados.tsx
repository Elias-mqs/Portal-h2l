
import { Menu, MenuButton, MenuList, MenuItem, Button, Box, Flex, Container } from "@chakra-ui/react"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { useState } from "react";

export default function MenuChamados() {


    // Constantes para alterar a cor quando o botão estiver on ou off

    const [isOn, setIsOn] = useState(false);

    const mudar = () => {
        setIsOn(!isOn);
    }

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

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    <Container
                        _hover={{
                            bgGradient: 'linear(to-b, #96C6F5, #EDF2FF)',
                            transitionDelay: '0.5s',
                        }}
                        borderRadius='0.375rem'
                        w='220px'
                        h='50px'
                        p='0'
                        display='flex'
                        justifyContent='space-between'
                    >
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
                            <Flex alignItems='center' fontSize='16px'>
                                <Box p='0 15px 0 0'>
                                    <SupportAgentOutlinedIcon
                                        sx={{
                                            color: `#003366`,
                                            fontSize: '32px',
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

                            {/* Itens Sub-menu */}
                            <MenuItem
                                bg='transparent'
                            >
                                •  Download
                            </MenuItem>

                            <MenuItem
                                onClick={() => alert('Kagebunshin')}
                                bg='transparent'

                            >
                                •  Create a Copy
                            </MenuItem>
                        </MenuList>
                    </Container>
                </>
            )}
        </Menu>
    )
}

// estou tentando tirar a transition do botão para não vir do canto superior esquerdo