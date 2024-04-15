
import { Button, Box, Icon, Text, Flex } from '@chakra-ui/react'

function ButtonSidebar({ btnIcon, btnText, isOpen, btnTransition }) {

    const iconBox = { base: '40px', md: isOpen ? '40px' : '30px' }

    return (
        <Box>
            <Button w={'100%'} h={'100%'} maxW={isOpen ? '100%' : '45px'} borderRadius={'4rem'} bg='transparent' transition={btnTransition} gap={2} >

                <Box>
                    <Icon w={iconBox} h={iconBox} transition={btnTransition} ml={isOpen ? '0' : '.5rem'} >
                        {btnIcon}
                    </Icon>
                </Box>
                <Flex overflow={'hidden'}>
                    <Box >
                        <Text >
                            {btnText}
                        </Text>
                    </Box>
                </Flex>
            </Button>
        </Box>
    )
}


export default ButtonSidebar