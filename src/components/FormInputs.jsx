import { Box, Input, Text, Stack, Flex, Textarea } from '@chakra-ui/react'

function FormInput({ label, w, maxW, name, type, variant, border, placeholder, required }) {
    return (
        <Flex direction='column' w={w} maxW={maxW} >
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <Input name={name} type={type} variant={variant} border={border} placeholder={placeholder} required={required} />
        </Flex>
    )
}

const FormTextarea = ({ w, maxW, label, name, variant, border, resize, placeholder, required }) => {
    return (

        <Flex direction='column' w={w} maxW={maxW}>
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <Textarea name={name} variant={variant} border={border} resize={resize} placeholder={placeholder} required={required} />
        </Flex>

    )
}
export { FormInput, FormTextarea };

// PARA O REQUIRED FUNCIONAR É SÓ DECLARAR TRUE OU FALSE NO COMPONENTE QUE RECEBER ESSA PROP