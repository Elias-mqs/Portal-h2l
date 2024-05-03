import { Button, Stack, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'

function IconButtonHeader({ ariaLabel, icon, onClick, isOpen, sizeModal, onClose, option, labelBtn }) {
    return (
        <Stack w='100%'>
            <Button aria-label={ariaLabel} bg='transparent' mb={'1px'} borderRadius='20px' icon={icon} onClick={onClick} color='#7B809A' >{labelBtn}</Button>
            <Modal isOpen={isOpen} size={sizeModal} onClose={onClose}>
                <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
                <ModalContent h='auto' >
                    {option}
                </ModalContent>
            </Modal>

        </Stack>
    )
}

export default IconButtonHeader;
