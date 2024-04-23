import { IconButtonHeader, Cadastro } from '.'
import { MdOutlineSettings } from 'react-icons/md'
import { Modal, ModalOverlay, ModalContent, useDisclosure, Stack } from '@chakra-ui/react'

export default function Settings({ option, icon, sizeModal, ariaLabel }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Stack >
            <IconButtonHeader ariaLabel={ariaLabel} onClick={onOpen} icon={icon} />
            <Modal isOpen={isOpen} size={sizeModal} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent h='auto' arialabel='content' >
                        {option}
                    </ModalContent>
            </Modal>
        </Stack>

    )
}

