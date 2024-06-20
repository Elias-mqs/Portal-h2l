import { Button, Grid, useToast, Stack, Flex, Text, ModalCloseButton, } from "@chakra-ui/react";
import { FormInput, InputSrc, SearchEmpresa, cript } from '@/components'
import { useForm, Controller } from 'react-hook-form';
import { useSearchCli } from "../context/ResearchesContext";
import { zodResolver } from '@hookform/resolvers/zod';
import { MdSearch } from "react-icons/md";
import { api } from '../utils/api'
import { z } from 'zod';


const schema = z.object({
    name: z.coerce.string().min(5, 'Mínimo de 5 caracteres'),
    email: z.coerce.string().email('Formato de e-mail inválido').min(3, 'Mínimo de caracteres não permitido'),
    nomeCli: z.coerce.string(),
    codCli: z.coerce.string(),
    loja: z.coerce.string(),
    setor: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    username: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
})

function CadastroOp() {


    const toast = useToast();

    const { modal } = useSearchCli()

    const { control, handleSubmit, setValue, resetField, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: '', email: '', nomeCli: '', codCli: '', loja: '', setor: '', username: '', },
    })



    const handleForm = async (data) => {

        const dataCrypt = cript({...data, admin: 4})

        try {

            const result = await api.post('cadastroAdm', dataCrypt)

            resetField('name');
            resetField('email');
            resetField('nomeCli');
            resetField('setor');
            resetField('username');

            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

        } catch (error) {
            toast({ position: 'top', title: "Atenção", description: error?.response?.data?.message, status: 'info', duration: 2000, isClosable: true, })
        }
    }



    const handleOpen = (e) => {
        e.preventDefault()
        e.stopPropagation()
        resetField('')
        modal.onOpen()
    }



    const dataEmpresa = (data) => {
        setValue('nomeCli', data.nome || '');
        setValue('codCli', data.codCli || '');
        setValue('loja', data.loja || '');
    };



    return (

        <Stack as='form' onSubmit={handleSubmit(handleForm)} w='100%' h='100%' maxH='auto' bg="#EDF2FF" borderRadius={{ base: '0', md: "10px" }}
            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px 50px" }} transition={{ base: 'max-width 0.3s ease' }}        >
            <ModalCloseButton m={4} />

            <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Novo Operador H2L</Text>
            </Flex>
            
            <Grid gap={8} mb={5} >

                {/* /////////////////// NOME ///////////////////// */}
                <Flex direction='column'>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormInput value={value} variant={'flushed'} label={'Nome'} placeholder={'Ex: (Diogo Silva Pereira)'} onChange={onChange}
                                _placeholder={{ color: '#b0c0d4' }} isInvalid={errors.name} />
                        )}
                    />
                    {errors.name && <Text color='red' pt={1} pl={2} >{errors.name.message}</Text>}
                </Flex>



                {/* /////////////////// EMAIL ///////////////////// */}
                <Flex direction='column'>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormInput value={value} type={'email'} variant={'flushed'} label={'E-mail'} placeholder={'Ex: (email@email.com)'} onChange={onChange}
                                _placeholder={{ color: '#b0c0d4' }} isInvalid={errors.email} />
                        )}
                    />
                    {errors.email && <Text color='red' pt={1} pl={2} >{errors.email.message}</Text>}
                </Flex>



                {/* /////////////////// EMPRESA ///////////////////// */}
                <Controller
                    name='nomeCli'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputSrc value={value || ''} typeBtn='button' icon={<MdSearch title='pesquisar' size='24px' color='#7B809A' />} onClick={handleOpen}
                            variant={'flushed'} label={'Empresa'} placeholder={'Ex: (H2L Soluções para documentos )'} onChange={onChange}
                            _placeholder={{ color: '#b0c0d4' }} readOnly={true} pointerEvents={'none'} tabIndex={'-1'} />
                    )}
                />


                {/* /////////////////// SETOR ///////////////////// */}
                <Flex direction='column'>
                    <Controller
                        name='setor'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormInput value={value} variant={'flushed'} label={'Setor'} placeholder={'Ex: (Recursos humanos)'} onChange={onChange}
                                _placeholder={{ color: '#b0c0d4' }} isInvalid={errors.setor} />
                        )}
                    />
                    {errors.setor && <Text color='red' pt={1} pl={2} >{errors.setor.message}</Text>}
                </Flex>


                {/* /////////////////// USERNAME ///////////////////// */}
                <Controller
                    name='username'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormInput w='100%' flex='1' value={value} type={'text'} variant={'flushed'} label={'Usuário'} placeholder={'Ex: (diogo.pereira)'}
                            onChange={(e) => onChange(e.target.value.trim().toLowerCase())} _placeholder={{ color: '#b0c0d4' }} />

                    )}
                />


            </Grid>


            <Button type='submit' bg='#6699CC' mt={5} color='#FFF' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500'
                _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} >
                Cadastrar
            </Button>


            <Text pt={3} pl={2} fontSize='14' fontWeight={600} >Usuário receberá a senha no e-mail cadastrado.</Text>


            {modal.isOpen &&
                <SearchEmpresa setValue={dataEmpresa} />
            }

        </Stack>

    )
}

export { CadastroOp };
