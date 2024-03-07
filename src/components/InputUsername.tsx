
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


export default function InputUsername() {
    return (
        <InputGroup >
            <InputLeftElement >
                <PersonOutlineOutlinedIcon sx={{ color: `#003366` }} />
            </InputLeftElement>
            <Input fontSize={17}
                variant='flushed'
                placeholder='Username'
                color='#003366'
                borderBottom='1px solid rgb(0, 51, 102, 0.5)'
            />
        </InputGroup>
    )
}