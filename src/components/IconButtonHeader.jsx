import { IconButton } from '@chakra-ui/react'

function IconButtonHeader ({ ariaLabel, icon, onClick }) {
    return (
        <IconButton
            aria-label={ariaLabel}
            bg='transparent'
            
            mb={'1px'}
            borderRadius='20px'
            icon={icon}
            // _hover={{ bg: 'transparent' }}
            onClick={onClick}
            color='#7B809A'
        />
    
    )
}

export default IconButtonHeader;