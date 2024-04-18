import { HStack, Flex, Text, TabList, Tab, Tabs, Box, TabIndicator } from '@chakra-ui/react'
import { IconButtonHeader } from '.'
import { MdOutlineHome, MdOutlineSettings, MdNotifications } from 'react-icons/md'
import { useRouter } from 'next/router';

function NavBar({ onClickToggle, iconToggle, navTabs }) {

    const router = useRouter();

    const handleTabClick = (route) => {
        router.push(route);
    }

    return (

        <HStack h='100%' align='start' justify={'space-between'} pr={'20px'} borderBottom='2px solid rgb(123, 128, 154, 0.4)'>
            {/* mb={{base: 0, md:'10px'}} */}

            <Flex align='end' objectFit={'cover'} gap={5} h='100%' >
                <IconButtonHeader alt="Toggle Sidebar" icon={iconToggle} onClick={onClickToggle} />
                <Tabs>
                    <TabList gap={6}>
                        {navTabs && navTabs.map((navTab, index) => (
                            <Tab key={index} aria-label='Tab' fontSize={14} fontWeight={500} p='0 0 7.6px 0' onClick={() => handleTabClick(navTab.route)} >{navTab.label}</Tab>
                        ))}
                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
                </Tabs>
            </Flex>

            <HStack align='center' >
                <IconButtonHeader icon={<MdOutlineSettings size={22} />} />
                <IconButtonHeader icon={<MdNotifications size={22} />} />
            </HStack>

        </HStack>
    )
}

export default NavBar;

{/* <Text key={index} aria-label='Tab' color='#004B96' p='7.6px' cursor='pointer' borderBottom='2px solid #004B96'>{navTab}</Text> */ }