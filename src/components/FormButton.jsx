import { Button } from "@chakra-ui/react";



const FormButtonSave = ({type}) => {
    return (
        <Button type={type} color='white' w='80px' h='28px' borderRadius='20px' fontSize='15px'
            bgGradient='linear(to-l, #4863ec, #cdd5fd)'
            _hover={{ bgGradient: 'linear(to-l, #4863ec, #cdd5fd)', transform: 'translateY(-2px)' }}
            _active={{ transform: 'translateY(2px)' }}
        >
            Salvar
        </Button>
    )
}

const ButtonCancel = ({onClick}) => {
    return(
        <Button bg='transparent' p={0} _hover={{ bg: `none`, textDecoration: `underline` }} onClick={onClick} >cancelar</Button>
    )
}

export { FormButtonSave, ButtonCancel };




