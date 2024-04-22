import { Stack } from "@chakra-ui/react"

export default function Container({ children, isOpen }) {
    return (

        <Stack w='100%' maxW={{ base: '100%', md: `calc(100% - ${isOpen ? '170px' : '50px'})` }} transition={'max-width .4s linear'}
            h='auto' p={{ base: '0', md: '2px 0 0 10px' }}  >
            {children}
        </Stack>

    )
}
