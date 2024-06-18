import {
    Button,
    Grid,
    useToast,
    Alert,
    AlertIcon,
    Stack,
    Flex,
    Text,
    ModalCloseButton,
    RadioGroup,
    Radio,
} from "@chakra-ui/react";
import { FormInput, InputSrc, SearchEmpresa } from '@/components'
import { useSearchCli } from "../context/ResearchesContext";
import { useEffect, useState } from "react";
import { api } from '../utils/api'
import Cookies from 'js-cookie'
import { MdSearch } from "react-icons/md";
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    name: z.coerce.string().min(5, ),
    email: z.coerce.string().email(),
    empresa: z.coerce.string(),
    setor: z.coerce.string(),
    username: z.coerce.string().trim(),
    password: z.coerce.string()
})

function CadastroAdm() {


    const { control, handleSubmit, setValue, watch, resetField } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            empresa: '',
            setor: '',
            username: '',
            password: '',
        },
    })


    const toast = useToast();
    const { modal } = useSearchCli()
    // const [passwordError, setPasswordError] = useState('');


    const handleForm = (data) => {

        console.log({...data})
        if(!data){
            console.log('ta propagando')
            return
        }

        console.log('teste')

        
    // try {

    //     const result = await api.post('cadastro', {...formData, admin: 2})
    //     const token = result?.data?.token;
    //     Cookies.set('token', token);

        resetField('name');
        resetField('email');
        resetField('empresa');
        resetField('setor');
        resetField('username');
        resetField('password');

    //     toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

    // } catch (error) {
    //     console.log(error)
    //     toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
    // }

    }


    const handleOpen = (e) => {
        e.preventDefault()
        e.stopPropagation()
        modal.onOpen()
    }

    const dataEmpresa = (data) => {
        setValue('empresa', data.nome || '');
        setValue('codCli', data.codCli || '');
        setValue('loja', data.loja || '');
    };


    const empresaValue = watch('nomeCli')
    console.log(empresaValue)

    console.log('Renderizou cadastro ||||||||||||||||||||||||||||||||||||||||||||||||')

    return (

        <Stack as='form' onSubmit={handleSubmit(handleForm)} w='100%' h='100%' maxH='auto' bg="#EDF2FF" borderRadius={{ base: '0', md: "10px" }}
            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px 50px" }} transition={{ base: 'max-width 0.3s ease' }}        >
            <ModalCloseButton m={4} />

            <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Novo Administrador</Text>
            </Flex>
x
            <Grid gap={8} mb={5} >

                {/* /////////////////// NOME ///////////////////// */}
                <Controller
                    name='name'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormInput value={value} variant={'flushed'} label={'Nome'} placeholder={'Ex: (Diogo Silva Pereira)'} onChange={onChange} _placeholder={{ color: '#b0c0d4' }} />
                    )}
                />


                {/* /////////////////// EMAIL ///////////////////// */}
                <Controller
                    name='email'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormInput value={value} type={'email'} variant={'flushed'} label={'Email'} placeholder={'Ex: (email@email.com)'} onChange={onChange} _placeholder={{ color: '#b0c0d4' }} />
                    )}
                />


                {/* /////////////////// EMPRESA ///////////////////// */}
                <Controller
                    name='empresa'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputSrc value={value || ''} typeBtn='button' icon={<MdSearch title='pesquisar' size='24px' color='#7B809A' />} onClick={handleOpen}
                            variant={'flushed'} label={'Empresa'} placeholder={'Ex: (H2L Soluções para documentos )'} onChange={onChange}
                            _placeholder={{ color: '#b0c0d4' }} readOnly={true} pointerEvents={'none'} tabIndex={'-1'} />
                    )}
                />


                {/* /////////////////// SETOR ///////////////////// */}
                <Controller
                    name='setor'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormInput value={value} variant={'flushed'} label={'Setor'} placeholder={'Ex: (Recursos humanos)'} onChange={onChange} _placeholder={{ color: '#b0c0d4' }} />
                    )}
                />


                {/* /////////////////// USERNAME ///////////////////// */}
                <Controller
                    name='username'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormInput w='100%' flex='1' value={value} type={'text'} variant={'flushed'} label={'Usuário'} placeholder={'Ex: (diogo.pereira)'} onChange={onChange} _placeholder={{ color: '#b0c0d4' }} />

                    )}
                />


                {/* /////////////////// PASSWORD ///////////////////// */}
                <Controller
                    name='password'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormInput value={value} type={'password'} variant={'flushed'} label={'Senha'} placeholder={'Ex: (Senha@123#4)'} onChange={onChange} _placeholder={{ color: '#b0c0d4' }} />
                    )}
                />
                {/* {passwordError && (
                    <Stack w='100%' fontSize='xs' gap='0' justify='flex-start' >
                        <Alert p='0' bg='transparent' color='#C53030' status='error' >
                            <AlertIcon w='13px' />
                            {passwordError}
                        </Alert>
                    </Stack>
                )} */}



            </Grid>

            <Button type='submit' bg='#6699CC' color='#FFF' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500'
                _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} >
                Cadastrar
            </Button>
            
            {modal.isOpen &&
                <SearchEmpresa setValue={dataEmpresa} />
            }
        </Stack>
        

    )
}

export { CadastroAdm };



// const handleForm = (data) => {

//     console.log(data)

//     console.log('teste')

    // setPasswordError('')

    // // Verifica se algum campo do formulário está vazio 
    // const isInvalid = Object.values(formData).some(value => value.trim() === '');
    // if (isInvalid) {
    //     toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente.", status: 'error', duration: 2000, isClosable: true, });
    //     return;
    // }

    // if (!validateEmail(formData.email)) {
    //     return;
    // }
    // if (!validatePassword(formData.password)) {
    //     return;
    // }


    // try {

    //     const result = await api.post('cadastro', {...formData, admin: 2})
    //     const token = result?.data?.token;
    //     Cookies.set('token', token);

    //     setFormData({ name: ``, username: ``, email: ``, nomeCli: ``, password: ``, setor: `` })

    //     toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

    // } catch (error) {
    //     console.log(error)
    //     toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
    // }
//}

// <Stack
        //     as='form'
        //     onSubmit={handleForm}
        //     w='100%'
        //     h='100%'
        //     maxH='auto'
        //     bg="#EDF2FF"
        //     borderRadius={{ base: '0', md: "10px" }}
        //     boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
        //     p={{ base: '35px', md: "30px 35px 50px" }}
        //     transition={{ base: 'max-width 0.3s ease' }}
        // >
        //     <ModalCloseButton m={4} />

        //     <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
        //         <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Novo Administrador</Text>
        //     </Flex>

        //     <Grid gap={8} mb={5} >

        //         <FormInput name={'name'} value={formData.name} variant={'flushed'} label={'Nome'} placeholder={'Ex: (Diogo Silva Pereira)'} onChange={handleFormEdit} _placeholder={{ color: '#b0c0d4' }} />
        //         <FormInput name={'email'} value={formData.email} type={'email'} variant={'flushed'} label={'Email'} placeholder={'Ex: (email@email.com)'} onChange={handleFormEdit} required={true} _placeholder={{ color: '#b0c0d4' }} />

        //         <InputSrc name={'empresa'} value={formData.nomeCli} typeBtn='button' icon={<MdSearch title='pesquisar' size='24px' color='#7B809A' />} onClick={handleOpen}
        //             variant={'flushed'} label={'Empresa'} placeholder={'Ex: (H2L Soluções para documentos )'} onChange={handleFormEdit} required={true}
        //             _placeholder={{ color: '#b0c0d4' }} readOnly={true} pointerEvents={'none'} tabIndex={'-1'} />

        //         <FormInput name={'setor'} value={formData.setor} variant={'flushed'} label={'Setor'} placeholder={'Ex: (Recursos humanos)'} onChange={handleFormEdit} required={true} _placeholder={{ color: '#b0c0d4' }} />

        //         <FormInput name={'username'} w='100%' flex='1' value={formData.username} type={'text'} variant={'flushed'} label={'Usuário'} placeholder={'Ex: (diogo.pereira)'} onChange={handleFormEdit} required={true} _placeholder={{ color: '#b0c0d4' }} />
        //         <FormInput name={'password'} value={formData.password} type={'password'} variant={'flushed'} label={'Senha'} placeholder={'Ex: (Senha@123#4)'} onChange={handleFormEdit} required={true} _placeholder={{ color: '#b0c0d4' }} />
        //         {passwordError && (
        //             <Stack w='100%' fontSize='xs' gap='0' justify='flex-start' >
        //                 <Alert p='0' bg='transparent' color='#C53030' status='error' >
        //                     <AlertIcon w='13px' />
        //                     {passwordError}
        //                 </Alert>
        //             </Stack>
        //         )}



        //     </Grid>

        //     <Button type='submit' bg='#6699CC' color='#FFF' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500'
        //         _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} >
        //         Cadastrar
        //     </Button>

        //     <SearchEmpresa setFormData={setFormData} formData={formData} />
        // </Stack>

        // const validatePassword = (password) => {
        //     const isLengthValid = password.length >= 10;;
        //     const hasUppercase = /[A-Z]/.test(password)
        //     const hasLowercase = /[a-z]/.test(password)
        //     const hasNumber = /[0-9]/.test(password)
        //     const hasSpecialChar = /[-!@#$%^&*(),.?":{}|<>]/.test(password);
    
        //     if (!isLengthValid) {
        //         setPasswordError('A senha deve ter pelo menos 10 caracteres.');
        //         return false;
        //     }
        //     if (!hasUppercase) {
        //         setPasswordError('A senha deve conter pelo menos uma letra maiúscula.');
        //         return false;
        //     }
        //     if (!hasLowercase) {
        //         setPasswordError('A senha deve conter pelo menos uma letra minúscula.');
        //         return false;
        //     }
        //     if (!hasNumber) {
        //         setPasswordError('A senha deve conter pelo menos um número.');
        //         return false;
        //     }
        //     if (!hasSpecialChar) {
        //         setPasswordError('A senha deve conter pelo menos um caractere especial.');
        //         return false;
        //     }
        //     setPasswordError('')
        //     return true;
        // };

        // const validateEmail = (email) => {
        //     const emailRegex = /^[a-z0-9]+(\.[a-z0-9]+)*@[^\s@]+\.[^\s@]+$/;
        //     if (!emailRegex.test(email)) {
        //         toast({ position: 'top', title: "Erro!", description: "Por favor, preencha todos os campos corretamente.", status: 'error', duration: 2000, isClosable: true, });
        //         return false;
        //     }
        //     return true;
        // }

        // const handleFormEdit = (e) => {
        //     let novosDados = { ...formData };
    
        //     novosDados[e.target.name] = e.target.value
        //     if (e.target.name === 'username') {
        //         novosDados.username = e.target.value.toLowerCase().trim();
        //     }
        //     if (e.target.name === 'password') {
        //         novosDados.password = e.target.value.trim();
        //     }
        //     setFormData(novosDados);
    
        // }