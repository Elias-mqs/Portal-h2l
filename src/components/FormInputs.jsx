import { Box, Input, Text, Stack, Flex } from '@chakra-ui/react'

function FormInput({ label, w, name, type, variant, placeholder, required }) {
    return (
        <Flex direction='column' >
                <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <Input w={w} name={name} type={type} variant={variant} placeholder={placeholder} required={required} />
        </Flex>
    )
}

export { FormInput };

// PARA O REQUIRED FUNCIONAR É SÓ DECLARAR TRUE OU FALSE NO COMPONENTE QUE RECEBER ESSA PROP