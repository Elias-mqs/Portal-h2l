///src/components/UpdateData.jsx
import {
    Button,
    useToast,
    Alert,
    AlertIcon,
    Stack,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    Box,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FormInput } from '.'

function UpdatePass({ isOpen, onClose, setPassword, formData }) {

    const toast = useToast()
    const [formPass, setFormPass] = useState({ password: '' })
    const [confirmPass, setConfirmPass] = useState({ confirmPass: '' })
    const [passwordError, setPasswordError] = useState('');

    const handleFormEdit = (e) => {
        let novaConfirm = { ...confirmPass };
        let novaPass = { ...formPass };
        const { name, value } = e.target;

        novaConfirm[name] = value
        novaPass[name] = value
        if (name === 'password') {
            novaPass.password = value.trim()
        } else if (name === 'confirmPass') {
            novaConfirm.confirmPass = value.trim()
        }    
        setConfirmPass(novaConfirm)
        setFormPass(novaPass)
    }

    const validatePassword = (password) => {
        const isLengthValid = password.length >= 10;;
        const hasUppercase = /[A-Z]/.test(password)
        const hasLowercase = /[a-z]/.test(password)
        const hasNumber = /[0-9]/.test(password)
        const hasSpecialChar = /[-!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!isLengthValid) {
            setPasswordError('A senha deve ter pelo menos 10 caracteres.');
            return false;
        }
        if (!hasUppercase) {
            setPasswordError('A senha deve conter pelo menos uma letra maiúscula.');
            return false;
        }
        if (!hasLowercase) {
            setPasswordError('A senha deve conter pelo menos uma letra minúscula.');
            return false;
        }
        if (!hasNumber) {
            setPasswordError('A senha deve conter pelo menos um número.');
            return false;
        }
        if (!hasSpecialChar) {
            setPasswordError('A senha deve conter pelo menos um caractere especial.');
            return false;
        }
        setPasswordError('')
        return true;
    };

    const handlePassUpdate = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setPasswordError('')

        if (!validatePassword(formPass.password)) {
            return
        }

        if (formPass.password !== confirmPass.confirmPass) {
            toast({ title: "Erro!", description: "As senhas não coincidem.", status: 'error', duration: 2000, isClosable: true, });
            return;
        }

        setPassword({...formData, password: formPass.password})
        setFormPass({ password: `` })
        setConfirmPass({ confirmPass: `` })
        onClose()
    }

    return (

        <Modal isOpen={isOpen} size={'2xl'} onClose={onClose} >
            <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            <ModalContent h='auto' maxH='90vh' overflow='auto' m='auto' >
                <Stack as='form'
                    onSubmit={handlePassUpdate}
                    w='100%'
                    h='100%'
                    maxH='auto'
                    bg="#EDF2FF"
                    borderRadius={{ base: '0', md: "10px" }}
                    boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                    p={{ base: '35px', md: "30px 35px" }}
                    transition={{ base: 'max-width 0.3s ease' }}
                >
                    <ModalCloseButton m={4} />
                    <Flex w='100%' h={{ base: '220px', md: '180px' }} mt='1rem' aligin='center' justify={{ base: 'space-around', md: 'space-between' }} direction='column' >

                        <Flex justify='flex-start' direction='column' >
                            <FormInput name={'password'} type={'password'} value={formPass.password} variant={'flushed'} label={'Nova senha:'} onChange={handleFormEdit} placeholder={'Digie a nova senha'} required={true} />
                            {passwordError && (
                                <Stack w='100%' fontSize='xs' gap='0' justify='flex-start' >
                                    <Alert p='0' bg='transparent' color='#C53030' status='error' >
                                        <AlertIcon w='13px' />
                                        {passwordError}
                                    </Alert>
                                </Stack>
                            )}
                        </Flex>
                        <Box>
                            <FormInput direction='column' name={'confirmPass'} type={'password'} value={confirmPass.confirmPass} variant={'flushed'} label={'Confirmar Senha:'}
                                onChange={handleFormEdit} placeholder={'Confirme a nova senha'} required={true} />
                        </Box>
                    </Flex>
                    <Button type='submit' mt={{ base: 0, md: '2rem' }} bg='#6699CC' color='#FFF' w='100%' h={12} fontSize={20} _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }}
                        _active={{ transform: 'translateY(2px)' }} boxShadow='inset 0px 1px 4px 1px rgba(0, 0, 0, .2)' >Salvar</Button>
                </Stack>
            </ModalContent>
        </Modal>

    )
}

export { UpdatePass };