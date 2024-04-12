import { IconButton } from '@chakra-ui/react'

function IconButtonHeader ({ ariaLabel, icon, onClick }) {
    return (
        <IconButton
            aria-label={ariaLabel}
            bg='transparent'
            borderRadius='20px'
            icon={icon}
            _hover={{ bg: 'transparent' }}
            onClick={onClick}
            color='#7B809A'
        />
    
    )
}


export default IconButtonHeader