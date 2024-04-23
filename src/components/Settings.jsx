import { IconButtonHeader } from '.'
import { Modal, ModalOverlay, ModalContent, useDisclosure, Stack } from '@chakra-ui/react'

export default function Settings({ option, icon, sizeModal, ariaLabel }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Stack >
            <IconButtonHeader ariaLabel={ariaLabel} onClick={onOpen} icon={icon} />
            <Modal isOpen={isOpen} size={sizeModal} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent h='auto' >
                        {option}
                    </ModalContent>
            </Modal>
        </Stack>

    )
}

