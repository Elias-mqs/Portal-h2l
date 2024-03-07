import { Flex, Text } from "@chakra-ui/react"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export default function CaminhoHeader() {
    return (
        <Flex alignItems='center'>
            <HomeOutlinedIcon sx={{ margin: `0 6px 0 8px` }} />
            <Text> /   Home</Text>

        </Flex>
    )
}