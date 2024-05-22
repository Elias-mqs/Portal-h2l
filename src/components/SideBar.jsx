
// src/components/SideBar.jsx
import { Box, Image, Stack, Center, Flex } from "@chakra-ui/react";
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { ButtonSidebar } from ".";
import { useRouter } from "next/router";
import { MdOutlineHome } from "react-icons/md";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


const SideBar = ({ isOpen, transition, maxW }) => {

    const router = useRouter()

    const maxHeight = isOpen ? '600px' : '0px';
    const mdImgWidth = isOpen ? '200px' : '0px';

    const navButtons = [
        { route: '/', label: 'Pagina inicial', icon: <MdOutlineHome size='23px' />, title: 'Página inicial' },
        { route: '/novoChamado', label: 'Chamados', icon: <SupportAgentOutlinedIcon />, title: 'Chamados' },
        { route: '/pedidos', label: 'Pedidos', icon: <PlaylistAddIcon />, title: 'Pedidos' },
    ];

    const handleImg = () => {
        router.push('/')
    }

    return (

        <Stack
            w={'100%'}
            transition={transition}
            h={{ base: '100%', md: 'calc(100% - 64px)' }}
            maxH={{ base: maxHeight, md: '100%' }}
            maxW={maxW}
            overflowX={{ base: `${isOpen ? 'visible' : 'hidden'}`, md: 'auto' }}
            position={{ base: 'sticky', md: 'fixed' }}
            bg='#EDF2FF'
            boxShadow={{ base: 'none', md: '0px 1px 4px 1px rgba(0, 0, 0, 0.2)' }}
            borderRadius={{ base: 0, md: '1.5rem' }}
            sx={{ '&::-webkit-scrollbar': { display: 'none', 'msOverflowStyle': 'none', } }}
        >
            <Stack aria-label='Itens-Sidebar' align='center' w='100%' gap={{ base: 0, md: isOpen ? 5 : 0 }} >

                <Box align='center' h={{ base: '0', md: '100%' }}>
                    <Image w='60%' m={isOpen ? '15px 0' : 0} maxW={{ base: '0', md: mdImgWidth }} onClick={handleImg} _hover={{ cursor: 'pointer' }}
                        maxH={{ base: '0', md: maxHeight }} transition={{ base: 'all 0s linear', md: transition }} src='img/LOGO-H2L.png' alt='Logo' />
                </Box>

                <Box align='center'>
                    {navButtons.map((button, index) => (
                        <ButtonSidebar
                            key={index}
                            title={button.title}
                            isOpen={isOpen}
                            m={'10px 0 0 0'}
                            btnText={button.label}
                            isActive={router.pathname === button.route}
                            onClick={() => router.push(button.route)}
                            btnIcon={button.icon}
                        />
                    ))}
                </Box>

            </Stack>
        </Stack >
    )
};




export default SideBar;
