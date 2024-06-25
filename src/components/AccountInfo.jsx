//src/components/DadosUser.jsx
import {
    Button,
    Grid,
    useToast,
    Stack,
    Flex,
    Text,
    ModalCloseButton,
    Input
} from "@chakra-ui/react";
import { FormInput, UpdatePass, cript } from '@/components';
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchCli } from "@/context/ResearchesContext";
import { userContext } from "@/context/UserContext";
import { api } from "@/utils/api";



const schema = z.object({
    name: z.coerce.string().min(5, 'Mínimo de 5 caracteres'),
    email: z.coerce.string().email('Formato de e-mail inválido').min(3, 'Mínimo de caracteres não permitido'),
    setor: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    username: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    password: z.coerce.string()
})



function AccountInfo() {

    const toast = useToast();
    const { modal } = useSearchCli();

    const { data: { data: { [0]: [dataUser], [1]: info } }, data: { refetch } } = userContext();

    const { control, handleSubmit, setValue, resetField } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: dataUser.name, email: dataUser.email, setor: dataUser.setor, username: dataUser.username, password: '' },
    });

   

    const handleForm = async (data) => {

        const newFormData = { ...data, info: info };

        const formCript = cript(newFormData);

        try {
            const result = await api.post('updtUserPass', formCript);

            refetch();

            resetField('password');

            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, });

        } catch (error) {
            if (error.response.status === 400) {
                toast({ position: 'top', title: "Atenção!", description: 'Revise os campos.', status: 'info', duration: 2000, isClosable: true, });
                return
            }
            toast({ position: 'top', title: "Atenção!", description: 'Revise as informações ou contate o suporte', status: 'info', duration: 2000, isClosable: true, });
        }
    }



    const stopPropagation = (e) => {
        e.stopPropagation();
        handleSubmit(handleForm)(e);
    }

    

    const dataEmpresa = (data) => {
        setValue('password', data || '');
    };



    return (

        <Stack as='form' onSubmit={stopPropagation} w='100%' h='100v%' maxH='auto' bg="#EDF2FF" boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px" }} >

            <ModalCloseButton m={4} />


            <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Informações da conta user</Text>
            </Flex>


            <Grid gap={8} mb={5} >

                <Flex direction='column'>
                    <Text pl={2} pb={1} fontSize={14} fontWeight={500} >Nome</Text>
                    <Input w='100' variant='flushed' value={dataUser.name} color='gray.400' readOnly={true} tabIndex='-1' />
                </Flex>

                <Flex direction='column'>
                    <Text pl={2} pb={1} fontSize={14} fontWeight={500} >Email</Text>
                    <Input w='100' variant='flushed' value={dataUser.email} color='gray.400' readOnly={true} tabIndex='-1' />
                </Flex>

                <Flex direction='column'>
                    <Text pl={2} pb={1} fontSize={14} fontWeight={500} >Setor</Text>
                    <Input w='100' variant='flushed' value={dataUser.setor} color='gray.400' readOnly={true} tabIndex='-1' />
                </Flex>

                <Flex direction='column'>
                    <Text pl={2} pb={1} fontSize={14} fontWeight={500} >Usuário</Text>
                    <Input w='100' variant='flushed' value={dataUser.username} color='gray.400' readOnly={true} tabIndex='-1' />
                </Flex>

                <Controller
                    name='password'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Flex align='end'>
                            <FormInput w='100%' value={value} type={'password'} variant={'flushed'} label={'Senha'} placeholder={'**********'} onChange={onChange}
                                readOnly={true} pointerEvents={'none'} tabIndex={'-1'} autoComplete='new-password' />
                            <Button colorScheme='blue' mb={2} size='sm' onClick={modal.onOpen} >Atualizar</Button>
                        </Flex>
                    )}
                />

            </Grid>


            <Button type='submit' bg='#6699CC' color='#FFF' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500'
                _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} >
                Salvar
            </Button>


            <UpdatePass isOpen={modal.isOpen} onClose={modal.onClose} setValue={dataEmpresa} />
        </Stack>
    )
}

export default AccountInfo;