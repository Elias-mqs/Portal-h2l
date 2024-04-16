
import { Button, Box, Icon, Text, Flex } from '@chakra-ui/react'

function ButtonSidebar({ btnIcon, btnText, isOpen, m }) {

    const iconBox = { base: '40px', md: isOpen ? '40px' : '30px' }

    return (
        <Box>
            <Button w={'100%'} h={{base: '100%', md:'50px'}} maxW={isOpen ? '100%' : '45px'} borderRadius={'4rem'} p={{base: '0 16px', md: isOpen ? '0 16px' : '16px'}} m={m} bg='transparent' transition={'max-width .4s linear'} gap={2} >

                <Box>
                    <Icon w={iconBox} h={iconBox} transition={'width .5s linear, height .4s linear'} ml={isOpen ? '0' : '.5rem'} >
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