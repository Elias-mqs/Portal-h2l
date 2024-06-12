import { Input, Text, Flex, Textarea, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react'

function FormInput({ label, w, maxW, name, value, size, bg, border, type, variant, placeholder, onChange, pointerEvents, tabIndex, required, isDisabled,
     isInvalid, readOnly, _placeholder, display, maxLength }) {
    return (
        <Flex direction='column' w={w} maxW={maxW} justify='flex-end' h='100%' display={display} >
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <Input name={name} value={value} size={size} bg={bg} border={border} type={type} variant={variant} placeholder={placeholder}
                onChange={onChange} pointerEvents={pointerEvents} tabIndex={tabIndex} required={required} isDisabled={isDisabled}
                isInvalid={isInvalid} readOnly={readOnly} _placeholder={_placeholder} maxLength={maxLength} />
        </Flex>
    )
}

function InputSrc({ label, w, maxW, icon, name, value, size, bg, type, typeBtn, variant, placeholder, onChange, pointerEvents, tabIndex, required,
    border, onClick, disabled, boxSize, borderRadius, display, readOnly, _placeholder }) {

    return (
        <Flex direction='column' w={w} maxW={maxW} justify='flex-end' h='100%' display={display} >
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <InputGroup >

                <Input name={name} value={value} size={size} bg={bg} type={type} variant={variant} border={border} placeholder={placeholder}
                    onChange={onChange} pointerEvents={pointerEvents} tabIndex={tabIndex} required={required} borderRadius={borderRadius} readOnly={readOnly}
                    _placeholder={_placeholder} />

                <InputRightElement as='button' type={typeBtn} boxSize={boxSize} onClick={onClick} disabled={disabled}  >
                    {icon}
                </InputRightElement>

            </InputGroup>
        </Flex>
    )
}

function FormInputBtn({ label, w, maxW, icon, name, value, size, bg, type, variant, placeholder, onChange, pointerEvents, tabIndex, required, border, onClick, disabled, boxSize, borderRadius }) {
    return (
        <Flex direction='column' w={w} maxW={maxW} justify='flex-end' h='100%' >
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <InputGroup >
                <Input name={name} value={value} size={size} bg={bg} type={type} variant={variant} border={border} placeholder={placeholder}
                    onChange={onChange} pointerEvents={pointerEvents} tabIndex={tabIndex} required={required} borderRadius={borderRadius} />
                <InputRightElement as='button' type='submit' boxSize={boxSize} onClick={onClick} disabled={disabled}>
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

const FormTextarea = ({ w, h, maxW, label, name, value, variant, placeholder, onChange, required }) => {
    return (

        <Flex direction='column' w={w} h={h} maxW={maxW}>
            <Text fontWeight={500} fontSize={14} pl={2} pb={1}>{label}</Text>
            <Textarea name={name} value={value} variant={variant} h='100%' border={'1px solid #C7CCD0'} resize={'none'} placeholder={placeholder} onChange={onChange} required={required} />
        </Flex>

    )
}


export { FormInput, FormTextarea, FormInputBtn, FormInputBtnL, InputSrc };

// PARA O REQUIRED FUNCIONAR É SÓ DECLARAR TRUE OU FALSE NO COMPONENTE QUE RECEBER ESSA PROP