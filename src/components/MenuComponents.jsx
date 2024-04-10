function MenuItemComponent(label, onClick, isSelected) {
    return (
        <MenuItem
            bg='transparent'
            w='220px'
            h='50px'
            borderRadius='0.375rem'
            p='0 20px 0 15px'
            color='#000'
            _hover={{
                bg: '#99ccffac',
                boxShadow: 'inset 0px 0px 2px 1px rgba(0, 0, 0, 0.2)'
            }}
            onClick={onClick}
            style={isSelected ?
                { backgroundColor: '#99ccffac', boxShadow: 'inset 0px 0px 2px 1px rgba(0, 0, 0, 0.2)' }
                :
                { backgroundColor: 'transparent' }
            }
        >
            <Flex alignItems='center' fontSize='16px'>
                <Box p='0 10px 0 20px' >
                    <IconPointFilled width='20px' />
                </Box>
                {label}
            </Flex>
        </MenuItem>
    )
}

<Button
    bg='transparent'
    w='220px'
    h='50px'
    borderRadius='0.375rem'
    p='0 20px 0 15px'
    _hover={{
        bgGradient: 'linear(to-b, #63B3ED, #BEE3F8)', 
        boxShadow: 'inset 0px 0px 2px 1px rgba(66, 153, 225, 0.6)' 
    }}
    onClick={onClick}
    style={isSelected ?
        { backgroundColor: '#4299E1', boxShadow: 'inset 0px 0px 2px 1px rgba(66, 153, 225, 0.6)' }  
        :
        { backgroundColor: 'transparent' }
    }
>
    <Flex alignItems='center' fontSize='16px'>
        <Box p='0 10px 0 20px' >
            <IconPointFilled width='20px' />
        </Box>
        {label}
    </Flex>
</Button>