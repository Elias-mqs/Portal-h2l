import { useState } from 'react'
import { IconLock, IconEyeClosed, IconEye } from '@tabler/icons-react';
import { Box, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"

export default function InputPassword() {
    const [show, setShow] = useState(false)
    const handleClick = () => { setShow(!show) }


    return (
        <InputGroup>
            <InputLeftElement>
                <IconLock color='#003366' />
            </InputLeftElement>
            <Input fontSize={17}
                variant='flushed'
                borderBottom='1px solid rgb(0, 51, 102, 0.5)'
                type={show ? 'text' : 'password'}
                placeholder='Password'
                color='#003366' />
            <InputRightElement>
                <Box as='button' onClick={handleClick}>
                    {show ? <IconEye color='#003366' />
                     : <IconEyeClosed color='#003366' />}
                </Box>
            </InputRightElement>
        </InputGroup>
    )
}