import { IconButtonHeader } from '.'
import { Modal, ModalOverlay, ModalContent, useDisclosure, Stack, Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react'

export default function Settings({ option, icon, sizeModal, ariaLabel }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
            <Menu _hover={{bg: 'white'}} >
                <MenuButton>
                    Actions
                </MenuButton>
                <MenuList _hover={{bg: 'white'}} >
                    <MenuItem _hover={{bg: 'white'}}><IconButtonHeader ariaLabel={ariaLabel} onClick={onOpen} icon={icon} isOpen={isOpen} sizeModal={sizeModal} onClose={onClose} option={option} labelBtn='Cadastro' /></MenuItem>
                    <MenuItem><IconButtonHeader ariaLabel={ariaLabel} onClick={onOpen} icon={icon} isOpen={isOpen} sizeModal={sizeModal} onClose={onClose} option={option} labelBtn='Teste 1' /></MenuItem>
                    <MenuItem><IconButtonHeader ariaLabel={ariaLabel} onClick={onOpen} icon={icon} isOpen={isOpen} sizeModal={sizeModal} onClose={onClose} option={option} labelBtn='Teste 2' /></MenuItem>
                    <MenuItem><IconButtonHeader ariaLabel={ariaLabel} onClick={onOpen} icon={icon} isOpen={isOpen} sizeModal={sizeModal} onClose={onClose} option={option} labelBtn='Teste 3' /></MenuItem>
                    <MenuItem><IconButtonHeader ariaLabel={ariaLabel} onClick={onOpen} icon={icon} isOpen={isOpen} sizeModal={sizeModal} onClose={onClose} option={option} labelBtn='Teste 4' /></MenuItem>
                </MenuList>
            </Menu>

    )
}

