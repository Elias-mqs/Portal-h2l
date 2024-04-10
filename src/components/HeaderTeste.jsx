// src/components/HeaderTeste.jsx
import { useState } from "react"
import { Stack, IconButton, Flex, Box } from '@chakra-ui/react'
import { MdMenu } from "react-icons/md"
import { SideBar } from '.'


export default function Header() {


    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Stack>
            <IconButton aria-label="Toggle Sidebar" w='20px' icon={<MdMenu />} onClick={toggleSidebar} color='#7B809A' />
            <SideBar isOpen={isOpen} toggle={toggleSidebar} />
        </Stack>

    );
};