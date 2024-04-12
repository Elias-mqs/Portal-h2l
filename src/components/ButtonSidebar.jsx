
import { Button, Box, Icon, Text } from '@chakra-ui/react'

function ButtonSidebar({ btnIcon, btnText, isOpen, btnTransition }) {
    return (
        <Box>
            <Button w={'100%'} maxWidth={isOpen ? '100%' : '45px'}  borderRadius={'4rem'} bg='transparent' transition={btnTransition} h='50px' gap={2} >
                <Icon width={isOpen ? '40px' : '30px'} height={isOpen ? '40px' : '30px'} transition={'width .5s ease, height .5s ease'} ml={isOpen ? '0' : '.5rem'}>
                    {btnIcon}
                </Icon>

                <Box style={{ maxWidth: isOpen ? '100%' : 0, overflow: 'hidden', transition: 'max-width .5s ease' }}>
                    <Text>
                        {btnText}
                    </Text>
                </Box>
            </Button>
        </Box>
    )
}


export default ButtonSidebar