import { HStack, Flex, TabList, Tab, Tabs, TabIndicator, IconButton } from '@chakra-ui/react'
import { IconButtonHeader, Cadastro, Settings } from '.'
import { MdOutlineSettings, MdNotifications } from 'react-icons/md'
import { useRouter } from 'next/router';

function NavBar({ onClickToggle, iconToggle, navTabs }) {

    const router = useRouter();

    const handleTabClick = (route) => {
        router.push(route);
    }

    return (

        <HStack h='100%' align='start' justify={'space-between'} pr={'20px'} m={{ base: 0, md: '0 12px 2px 22px' }} borderBottom='2px solid rgb(123, 128, 154, 0.4)'>

            <Flex align='end' objectFit={'cover'} gap={5} h='100%' >
                <IconButton alt="Toggle Sidebar" bg='transparent' mb={'1px'} ml={{ base: 0, md: -2 }} borderRadius='20px' color='#7B809A' icon={iconToggle} onClick={onClickToggle} />
                <Tabs defaultIndex={navTabs.findIndex(tab => tab.route === router.pathname)}>
                    <TabList gap={6}>
                        {navTabs && navTabs.map((navTab, index) => (
                            <Tab key={index} aria-label='Tab' fontSize={14} fontWeight={500} p='0 0 7.6px 0' onClick={() => handleTabClick(navTab.route)} >{navTab.label}</Tab>
                        ))}
                    </TabList>
                </Tabs>
            </Flex>

            <HStack align='center' gap={6} >
                <Settings ariaLabel={'Settings'} />
                <IconButton title='Notificações' icon={<MdNotifications size={22} />} bg='transparent' mb={'1px'} borderRadius='20px' color='#7B809A' />
            </HStack>

        </HStack>
    )
}

export default NavBar;
