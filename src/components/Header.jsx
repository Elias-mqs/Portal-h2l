
import { Flex, Box, Stack } from '@chakra-ui/react'
import { MdMenu } from "react-icons/md"
import { SideBar, NavBar } from '.'
import { useRouter } from 'next/router'

export default function Header({isOpen, toggleSidebar}) {

    const router = useRouter();
    const transition = 'all .4s linear';


    return (
        <Flex justify='space-between' transition={transition} direction={{ base: 'column', md: 'row' }} >

            <Box transition={transition} >
                <SideBar alt='Sidebar' isOpen={isOpen} transition={transition} toggle={toggleSidebar} />
            </Box>

            <Stack alt='NavBar' w={{ base: '100%', md: `calc(100% - ${isOpen ? '200px' : '50px'})` }} transition={transition} pl={{ base: '0', md: '10px' }} >

                <NavBar router={() => { router.push('/') }} roadPage={'Home'} onClickToggle={toggleSidebar} iconToggle={<MdMenu />} navTab={'Home'} />

            </Stack>
        </Flex >
    )
}


















































// primeiro código
// import { Flex, Box, Text, VStack, IconButton, Stack, HStack, Button, Spacer } from '@chakra-ui/react'
// import { MdMenu, MdOutlineHome, MdOutlineSettings, MdNotifications } from "react-icons/md"
// import { SideBar } from '.'
// import { useState } from 'react'
// import { useRouter } from 'next/router'


// export default function HeaderHome() {

//     const [isOpen, setIsOpen] = useState(true);
//     const toggleSidebar = () => { setIsOpen(!isOpen); };
//     const router = useRouter();

//     return (
//         <Flex justify='space-between' h='100%' >

//             <Box>
//                 <SideBar isOpen={isOpen} maxW={isOpen ? '200px' : '50px'} transition='all .3s linear' toggle={toggleSidebar} />
//             </Box>

//             <Stack w={isOpen ? 'calc(100% - 200px)' : 'calc(100% - 50px)'} h='100%' transition='width .3s linear' p='0 10px' >

//                 <VStack h='100%' align='start' bg='#FFF' borderBottom='2px solid rgb(123, 128, 154, 0.4)'>
//                     <HStack justify='space-between' w='100%' h='50%'>

//                         <VStack align='start'>
//                             <Flex align='center' >
//                                 <IconButton aria-label='btnIconHome' bg='transparent' borderRadius='20px' mt='1px' icon={<MdOutlineHome size={22} />} _hover={{ bg: 'transparent' }} onClick={() => router.push('/')} color='#7B809A' />
//                                 <Text color='#7B809A' cursor='default'>/</Text>
//                                 <Button bg='transparent' p='0' ml='12px' color='#7B809A' _hover={{ bg: 'transparent' }}>Home</Button>
//                             </Flex>
//                         </VStack>
//                         <HStack align='start' wrap='wrap' >
//                             <IconButton bg='transparent' icon={<MdOutlineSettings size={22} />} borderRadius='20px' color='#7B809A' />
//                             <IconButton bg='transparent' icon={<MdNotifications size={22} />} borderRadius='20px' color='#7B809A' />
//                         </HStack>

//                     </HStack>
//                     <Flex align='center' objectFit={'cover'} justify='space-between' h='50%' w='30%' >
//                         <IconButton aria-label="Toggle Sidebar" bg='transparent' borderRadius='20px' icon={<MdMenu />} onClick={toggleSidebar} color='#7B809A' />
//                         <Text color='#004B96' borderBottom='1px solid #004B96'>Home</Text>
//                     </Flex>
//                 </VStack>




//             </Stack>
//         </Flex >
//     )
// }














{/*             <Flex w='100%' h='35px' alignItems='flex-start' justifyContent='space-between' >
                    <Box color='#7B809A' >
                        <CaminhoHeader />
                        <IconButton aria-label="Toggle Sidebar" bg='transparent'  borderRadius='20px' w={5} icon={<MdMenu />} onClick={toggleSidebar} color='#7B809A' />
                    </Box>

                    <Box display='flex' w='90px' p='0 30px 0 0' justifyContent='space-between' color='#7B809A' >
                        <SettingsIcon />
                        <NotificationsIcon />
                    </Box>
                </Flex>

                <Flex m='0px 30px' borderBottom='1px solid rgb(123, 128, 154, 0.4)' >
                    <Text marginLeft='95px' p='0 30px' color='#004B96' borderBottom='1px solid #004B96' fontWeight='500' position='relative' bottom='-1px' zIndex='1' >
                        Home
                    </Text>
                </Flex> */}