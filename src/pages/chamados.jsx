import { HStack, VStack, Flex } from "@chakra-ui/react";
import { SideBar, PageChamados, HeaderChamados } from "@/components";
import styles from "@/styles/Home.module.css";


export default function chamados() {
    return (
        <HStack w="full" h="100vh" bg="#F0F2F5" padding='32px 32px 0 32px'>
            <SideBar />
            <VStack w='100%' h='100%'>
                <HeaderChamados>
                    <Flex
                        as="main"
                        w='100%'
                        h='100%'
                        display='block'
                        bg='#FFF'
                        position='relative'
                        borderRadius='1.1rem'
                        boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)'
                    >
                        <PageChamados/>
                    </Flex>
                </HeaderChamados>
            </VStack>
        </HStack>
    )
}

