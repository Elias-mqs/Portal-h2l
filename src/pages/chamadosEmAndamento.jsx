import { HStack, VStack, Flex } from "@chakra-ui/react";
import { SideBar, HeaderChamados, PageChamadosAndamento } from "@/components";


export default function chamados() {
    return (
        <HStack w="full" h="100vh" bg="#F0F2F5">
            <VStack w='100%' h='100%'>

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