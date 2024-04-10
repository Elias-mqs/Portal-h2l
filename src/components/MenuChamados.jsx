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
} from "@chakra-ui/react";
import { IconChevronDown, IconChevronUp, IconPointFilled } from "@tabler/icons-react";
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { useState } from "react";

// Componente para os itens do menu
const MenuItemComponent = ({ label, onClick, isSelected }) => (
    <Button
        bg='transparent'
        w='220px'
        h='50px'
        borderRadius='0.375rem'
        p='0 20px 0 15px'
        _hover={{
            bgGradient: 'linear(to-b, #63B3ED, #BEE3F8)',  
            boxShadow: 'inset 0px 0px 2px 1px rgba(66, 153, 225, 0.6)'  
        }}
        onClick={onClick}
        style={isSelected ?
            { backgroundColor: '#4299E1', boxShadow: 'inset 0px 0px 2px 1px rgba(66, 153, 225, 0.6)' }  
            :
            { backgroundColor: 'transparent' }
        }
    >
        <Flex alignItems='center' fontSize='16px'>
            <Box p='0 10px 0 20px' >
                <IconPointFilled width='20px' />
            </Box>
            {label}
        </Flex>
    </Button>
);

export default function MenuChamados() {
    const [isOn, setIsOn] = useState(false);
    const mudar = () => setIsOn(!isOn);

    const [novoChamado, setNovoChamado] = useState(false);
    const novoChamadoBg = () => setNovoChamado(!novoChamado);

    const [chamadoEmAndamento, setChamadoEmAndamento] = useState(false);
    const chamadoEmAndamentoBg = () => setChamadoEmAndamento(!chamadoEmAndamento);

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    <Container
                        _hover={{
                            bgGradient: 'linear(to-b, #96C6F5, #EDF2FF)',
                            transition: 'background 1s linear',
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
                            onClick={mudar}
                            rightIcon={
                                isOpen ?
                                    <IconChevronUp />
                                    :
                                    <IconChevronDown />
                            }
                            style={isOn ? stylesButtonOne : stylesButtonTwo}
                        >
                            <Flex alignItems='center' fontSize='16px'>
                                <Box p='0 20px 0 0px'>
                                    <SupportAgentOutlinedIcon sx={{ color: `#003366`, fontSize: '35px', }} />
                                </Box>
                                Chamados
                            </Flex>
                        </MenuButton>

                        <MenuList bg='transparent' boxShadow='none' border='0'>

                            <Stack spacing={3} >

                                <MenuItemComponent
                                    label="Novo Chamado"
                                    onClick={novoChamadoBg}
                                    isSelected={novoChamado}
                                />

                                <MenuItemComponent
                                    label="Chamados em andamento"
                                    onClick={chamadoEmAndamentoBg}
                                    isSelected={chamadoEmAndamento}
                                />
                            </Stack>
                        </MenuList>
                    </Container>
                </>
            )}
        </Menu>
    );
}

// Estilos dos botões
const stylesButtonOne = {
    background: 'linear-gradient(to bottom, #96C6F5, #EDF2FF)',
    width: '220px',
    height: '50px',
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '16px',
};

const stylesButtonTwo = {
    background: 'transparent',
    width: '220px',
    height: '50px',
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '16px'
};
