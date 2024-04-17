import { Input, Text, Flex, Textarea } from '@chakra-ui/react'

function FormInput({ label, w, maxW, name, value, type, variant, border, placeholder, onChange, required }) {
    return (
        <Flex direction='column' w={w} maxW={maxW} >
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <Input name={name} value={value} type={type} variant={variant} border={border} placeholder={placeholder} onChange={onChange} required={required} />
        </Flex>
    )
}

const FormTextarea = ({ w, maxW, label, name, value, variant, border, placeholder, onChange, required }) => {
    return (

        <Flex direction='column' w={w} maxW={maxW}>
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <Textarea name={name} value={value} variant={variant} border={border} resize={'none'} placeholder={placeholder} onChange={onChange} required={required} />
        </Flex>

    )
}
export { FormInput, FormTextarea };

// PARA O REQUIRED FUNCIONAR É SÓ DECLARAR TRUE OU FALSE NO COMPONENTE QUE RECEBER ESSA PROP