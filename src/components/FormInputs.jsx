import { Input, Text, Flex, Textarea, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react'

function FormInput({ label, w, maxW, name, value, type, variant, placeholder, onChange, pointerEvents, tabIndex, required, isDisabled, isInvalid }) {
    return (
        <Flex direction='column' w={w} maxW={maxW} justify='flex-end' h='100%' >
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <Input name={name} value={value} type={type}  variant={variant} placeholder={placeholder}
                onChange={onChange} pointerEvents={pointerEvents} tabIndex={tabIndex} required={required} isDisabled={isDisabled} isInvalid={isInvalid} />
        </Flex>
    )
}

function FormInputBtn({ label, w, maxW, icon, name, value, type, variant, placeholder, onChange, pointerEvents, tabIndex, required, onClick }) {
    return (
        <Flex direction='column' w={w} maxW={maxW} justify='flex-end' h='100%' >
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <InputGroup>
                <Input name={name} value={value} type={type} variant={variant} border={'1px solid #C7CCD0'} placeholder={placeholder}
                onChange={onChange} pointerEvents={pointerEvents} tabIndex={tabIndex} required={required} />
                <InputRightElement as='button' type='submit' onClick={onClick}>
                        {icon}
                </InputRightElement>
            </InputGroup>
        </Flex>
    )
}

function FormInputBtnL({ label, w, maxW, icon, name, value, fontSize, type, variant, placeholder, onChange, pointerEvents, tabIndex, required, border }) {
    return (
        <Flex direction='column' w={w} maxW={maxW} justify='flex-end' h='100%' >
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <InputGroup>
            <InputLeftElement>
                {icon}
            </InputLeftElement>
                <Input name={name} value={value} fontSize={fontSize} type={type} variant={variant} border={border} placeholder={placeholder}
                onChange={onChange} pointerEvents={pointerEvents} tabIndex={tabIndex} required={required} />
            </InputGroup>
        </Flex>
    )
}

const FormTextarea = ({ w, maxW, label, name, value, variant, placeholder, onChange, required }) => {
    return (

        <Flex direction='column' w={w} maxW={maxW}>
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <Textarea name={name} value={value} variant={variant} border={'1px solid #C7CCD0'} resize={'none'} placeholder={placeholder} onChange={onChange} required={required} />
        </Flex>

    )
}


export { FormInput, FormTextarea, FormInputBtn, FormInputBtnL };

// PARA O REQUIRED FUNCIONAR É SÓ DECLARAR TRUE OU FALSE NO COMPONENTE QUE RECEBER ESSA PROP