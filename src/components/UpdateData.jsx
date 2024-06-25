///src/components/UpdateData.jsx
import {
    Button,
    useToast,
    Text,
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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchCli } from '@/context/ResearchesContext';
import { CloudDone } from '@mui/icons-material';



const schema = z.object({
    password: z
        .string()
        .min(10, 'A senha deve ter no mínimo 10 caracteres.')
        .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
        .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
        .regex(/[0-9]/, 'A senha deve conter pelo menos um número.')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caracter especial.'),
    confirmPass: z.coerce.string().min(10, 'Confirme a senha com no mínimo 10 caracteres.'),
});



function UpdatePass({ setValue }) {



    const { control, handleSubmit, formState: { errors }, resetField } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            password: '',
            confirmPass: '',
        }
    })

    const toast = useToast()
    const { modal } = useSearchCli();



    const handlePassUpdate = (data) => {

        
        if (data.password !== data.confirmPass) {
            toast({ title: "Erro!", description: "As senhas não coincidem.", status: 'error', duration: 2000, isClosable: true, });
            return;
        }

        setValue(data.password);

        handleClose();
    }

    const handleClose = () => {
        resetField('password');
        resetField('confirmPass');
        modal.onClose();
    }

    console.log('renderizou updatePass')

    return (

        <Modal isOpen={modal.isOpen} size={'2xl'} onClose={handleClose} >
            <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            <ModalContent h='auto' maxH='90vh' overflow='auto' m='auto' >
                <Stack as='form' onSubmit={handleSubmit(handlePassUpdate)} w='100%' h='100%' maxH='auto' bg="#EDF2FF" borderRadius={{ base: '0', md: "10px" }}
                    boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px" }} transition={{ base: 'max-width 0.3s ease' }} gap={8} >


                    <ModalCloseButton m={4} />
                    <Flex w='100%' h={{ base: '220px', md: '180px' }} aligin='center' justify={{ base: 'space-around', md: 'space-between' }} direction='column' >

                        <Controller
                            name='password'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <FormInput type={'password'} value={value} variant={'flushed'} label={'Nova senha:'} onChange={(e) => onChange(e.target.value.trim())}
                                    placeholder={'Digie a nova senha'} autoComplete='new-password' />

                            )}
                        />
                        {errors.password && <Text color='red' fontSize={14} pt={1} pl={2}>{errors.password.message}</Text>}


                        <Controller
                            name='confirmPass'
                            control={control}
                            render={({ field: { value, onChange } }) => (

                                    <FormInput type={'password'} value={value} variant={'flushed'} label={'Confirmar Senha:'}
                                        onChange={(e) => onChange(e.target.value.trim())} placeholder={'Confirme a nova senha'} autoComplete='new-password' />
                       
                            )}
                        />
                        {errors.confirmPass && <Text color='red' fontSize={14} pt={1} pl={2}>{errors.confirmPass.message}</Text>}

                    </Flex>


                    <Button type='submit' mt={{ base: 0, md: '2rem' }} bg='#6699CC' color='#FFF' w='100%' h={12} fontSize={20} _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }}
                        _active={{ transform: 'translateY(2px)' }} boxShadow='inset 0px 1px 4px 1px rgba(0, 0, 0, .2)' >Salvar</Button>
                </Stack>
            </ModalContent>
        </Modal>

    )
}

export { UpdatePass };