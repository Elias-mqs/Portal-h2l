import { Button, Stack, Modal, ModalOverlay, ModalContent, useDisclosure } from '@chakra-ui/react'

function IconButtonHeader({ ariaLabel, icon, sizeModal, conteudo, labelBtn, display, onOpen, isOpen, onClose, hover, fontWeight, fontStyle, fontSize }) {

    return (
        <Stack display={display} >
            <Button w='85%' aria-label={ariaLabel} bg='transparent' mb={'1px'} borderRadius='20px' icon={icon} onClick={onOpen} color='#7B809A'
                fontWeight={fontWeight} fontStyle={fontStyle} fontSize={fontSize} _hover={hover}
            >
                {labelBtn}
            </Button>
            <Modal isOpen={isOpen} size={sizeModal} onClose={onClose} >
                <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
                <ModalContent h='auto' maxH='90vh' overflow='auto' m='auto' >
                    {conteudo}
                </ModalContent>
            </Modal>

        </Stack>
    )
}

export default IconButtonHeader;
