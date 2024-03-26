import { HStack, VStack, Flex, Text, Container } from "@chakra-ui/react";
import { SideBar, HeaderChamados, PageChamadosAndamento } from "@/components";


export default function chamados() {
    return (
        <HStack w="full" h="100vh" bg="#F0F2F5" padding='32px 32px 0 32px'>
            <SideBar />
            <VStack w='100%' h='100%'>
                <HeaderChamados />

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
                    <PageChamadosAndamento />
                </Flex>
            </VStack>
        </HStack>
    )
}

// display: flex;
// width: 100 %;
// height: 100 %;
// background - color: white;
// align - items: center;
// justify - content: center;
// flex - direction: column;
// position: relative;
// border - radius: 1.1rem;
// box - shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.2);