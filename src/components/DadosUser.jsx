//src/components/DadosUser.jsx
import {
    Button,
    Grid,
    useToast,
    Stack,
    Flex,
    Text,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { FormInput, UpdatePass, cript } from '@/components';
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchCli } from "@/context/ResearchesContext";
import { userContext } from "@/context/UserContext";






//// CRIAR LÓGICA PARA ENVIAR O FORM SOMENTE QUANDO FOR ALTERADO ALGUM CAMPO E ATIVAR E DESATIVAR OS CAMPOS




const schema = z.object({
    name: z.coerce.string().min(5, 'Mínimo de 5 caracteres'),
    email: z.coerce.string().email('Formato de e-mail inválido').min(3, 'Mínimo de caracteres não permitido'),
    setor: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    username: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    password: z.coerce.string()
})


function DadosUser({ onClick }) {

    const toast = useToast();
    const { modal } = useSearchCli();

    const { data: { data: { [0]: [dataUser], [1]: info } } } = userContext()

    const { control, handleSubmit, setValue } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: dataUser.name, email: dataUser.email, setor: dataUser.setor, username: dataUser.username, password: '' },
    })
    console.log(dataUser)


    const [isFieldModified, setIsFieldModified] = useState({ name: false, email: false, setor: false, username: false, password: false });


    const updateDialog = useDisclosure();
    const [disableName, setDisableName] = useState(true);
    const [disableEmail, setDisableEmail] = useState(true);
    const [disableSetor, setDisableSetor] = useState(true);
    const [disableUsername, setDisableUsername] = useState(true);





    const handleForm = async (data) => {
        console.log(data)
        console.log('enviu form pai')

        if (!Object.values(isFieldModified).some(modified => modified)) {
            toast({ position: 'top', title: "Sem alteração!", description: "Nenhum campo foi modificado.", status: 'info', duration: 2000, isClosable: true });
            return;
        }

        const newFormData = { ...data, info: info }
        const formCript = cript(newFormData)

        console.log('enviu form pai')

        // try {
        //     // const result = await api.post('updateDataUser', formCript)
        //     // setFormData({ ...formData, password: `` })


        //     toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

        // } catch (error) {
        //     toast({ position: 'top', title: "Atenção!", description: 'Revise as informações ou contate o suporte', status: 'error', duration: 2000, isClosable: true, })
        // }
    }



    const stopPropagation = (e) => {
        e.stopPropagation();
        handleSubmit(handleForm)(e);
    }



    const toggleFieldModified = (fieldName) => {
        console.log(fieldName)
        setIsFieldModified(prevState => ({
            ...prevState,
            [fieldName]: true
        }));
    };

    const clickDisableField = (fieldName) => {
        toggleFieldModified(fieldName);
        // Lógica para alternar a desativação do campo aqui
    };



    const dataEmpresa = (data) => {
        setValue('password', data || '');
    };



    console.log('renderizando pai')

    return (

        <Stack as='form' onSubmit={stopPropagation} w='100%' h='100v%' maxH='auto' bg="#EDF2FF" boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px" }} >

            <ModalCloseButton m={4} />

            <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Informações da conta</Text>
            </Flex>

            <Grid gap={8} mb={5} >

                <Controller
                    name='name'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Flex align='end'>
                            <FormInput w='100%' value={value} variant={'flushed'} label={'Nome'} placeholder={'Nome'} onChange={(e) => { onChange(e); toggleFieldModified('name'); }}
                            isDisabled={isFieldModified.name} />
                            {dataUser.admin === 3 &&
                                <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={() => clickDisableField('name')} ><MdEdit size='20px' /></Button>
                            }
                        </Flex>
                    )}
                />


                <Controller
                    name='email'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Flex align='end'>
                            <FormInput w='100%' value={value} type={'email'} variant={'flushed'} label={'Email'} placeholder={'Email'}
                                onChange={(e) => { onChange(e); toggleFieldModified('email'); }} />
                            {dataUser.admin === 3 &&
                                <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={() => clickDisableField('email')} ><MdEdit size='20px' /></Button>
                            }
                        </Flex>
                    )}
                />


                <Controller
                    name='setor'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Flex align='end'>
                            <FormInput w='100%' value={value} variant={'flushed'} label={'Setor'} placeholder={'Setor'} onChange={(e) => { onChange(e); toggleFieldModified('setor'); }}
                            />
                            {dataUser.admin === 3 &&
                                <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={() => clickDisableField('setor')} ><MdEdit size='20px' /></Button>
                            }
                        </Flex>
                    )}
                />


                <Controller
                    name='username'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Flex align='end'>
                            <FormInput name={'username'} w='100%' value={value} type={'text'} variant={'flushed'} label={'Usuário'} placeholder={'Usuário'}
                                onChange={(e) => { onChange(e.target.value.trim().toLowerCase()); toggleFieldModified('username'); }} />
                            {dataUser.admin === 3 &&
                                <Button title='editar' borderRadius='2rem' bg="#EDF2FF" onClick={() => clickDisableField('username')} ><MdEdit size='20px' /></Button>
                            }
                        </Flex>
                    )}
                />


                <Controller
                    name='password'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Flex align='end'>
                            <FormInput w='100%' value={value} type={'password'} variant={'flushed'} label={'Senha'} placeholder={'**********'} onChange={onChange}
                                readOnly={true} pointerEvents={'none'} tabIndex={'-1'} />
                            <Button colorScheme='blue' mb={2} size='sm' onClick={modal.onOpen} >Atualizar</Button>
                        </Flex>
                    )}
                />

            </Grid>


            <Button type='submit' bg='#6699CC' onClick={onClick} color='#FFF' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500'
                _hover={{ bg: `#5c7da6`, color: `#FFF`, transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} >
                Salvar
            </Button>


            <UpdatePass isOpen={updateDialog.isOpen} onClose={updateDialog.onClose} setValue={dataEmpresa} />
        </Stack>
    )
}

export default DadosUser;