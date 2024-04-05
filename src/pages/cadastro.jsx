import { Button, Flex, Grid, FormLabel, Input, VStack, useToast, FormControl, GridItem, Alert, AlertIcon, Stack, Text } from "@chakra-ui/react";
import { FormGroup } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import api from '../utils/api'

export default function cadastro() {

    const router = useRouter();
    const toast = useToast();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })

    const handleFormEdit = (event, name) => {
        let value = event.target.value;
        if (name === 'username') {
            value = value.toLowerCase();
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleForm = async (event) => {
        event.preventDefault()

        const isInvalid = Object.values(formData).some(value => value.trim() === '');

        if (isInvalid) {
            toast({
                title: "Erro!",
                description: "Por favor, preencha todos os campos corretamente.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        try {

            const result = await api.post('cadastro', formData)
            // const token = result?.data?.token;
            // localStorage.setItem('token', token);
            setFormData({ name: ``, username: ``, email: ``, password: `` })

            toast({
                title: "Sucesso!",
                description: result?.data?.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            // router.push('/login');

        } catch (error) {
            console.log(error)
            toast({
                title: "Erro!",
                description: error?.response?.data?.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const caract = false;
    const maius = true;
    const minus = false;
    const num = false;
    const esp = false;

    return (
        <>
            <VStack w='100%' h='100vh' justify='center' bg='#f0f0f0'>

                {/* Barra de navegação */}
                {/* <Flex direction='row' alignItems='flex-start' justify='space-between' w='100%' p='20px'>
                    <Button colorScheme='teal' size='lg' onClick={() => router.push('/login')}>
                        Login
                    </Button>
                    <Button colorScheme='teal' size='lg' onClick={() => router.push('/users')}>
                        Users
                    </Button>
                </Flex> */}

                {/* Formulário de cadastro */}
                <Flex
                // mexendo na responsividade da tela ao esticar
                    w={{ base:'100%',sm:'60%', md:'60%', lg:'45%'}}
                    h={{ base:'100%',sm:'80%', md:'80%', lg:'65%'}}
                    maxH={{ base:'100%', lg:'100%'}}
                    // maxW={{ base: '60%', lg: '100%' }}
                    
                    justify='center'
                    align='center'
                    bg='#EDF2FF'
                    borderRadius='10px'
                    boxShadow='0 0 10px rgba(0, 0, 0, 0.4)'
                    p='20px'
                >

                    <form onSubmit={handleForm} style={{ width: '100%', maxWidth: '600px' }}>

                        {/* Grid para organização dos campos */}
                        <Grid
                            templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
                            w={{ lg:'100%', md:'100%', sm:'100%', base:'90%' }}
                            align={{ lg:'stretch', md:'stretch', sm:'stretch', base:'center' }}
                            gap={8}
                            mb='20px'
                        >

                            {/* Campo Nome */}
                            <FormControl>
                                <FormLabel color='#003366' paddingBottom='5px'>Name</FormLabel>
                                <Input
                                    p='0 0 0 10px'
                                    variant='flushed'
                                    name='name'
                                    type='text'
                                    placeholder='Name'
                                    required
                                    value={formData.name}
                                    onChange={(e) => { handleFormEdit(e, 'name') }}
                                />
                            </FormControl>

                            {/* Campo Username */}
                            <FormControl>
                                <FormLabel color='#003366' paddingBottom='5px'>Username</FormLabel>
                                <Input
                                    p='0 0 0 10px'
                                    variant='flushed'
                                    name='username'
                                    type='text'
                                    placeholder='Username'
                                    required
                                    value={formData.username}
                                    onChange={(e) => { handleFormEdit(e, 'username') }}
                                />
                            </FormControl>

                            {/* Campo Email */}
                            <GridItem >
                                <FormLabel color='#003366' paddingBottom='5px'>Email</FormLabel>
                                <Input
                                    p='0 0 0 10px'
                                    variant='flushed'
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                    required
                                    value={formData.email}
                                    onChange={(e) => { handleFormEdit(e, 'email') }}
                                />
                            </GridItem>

                            {/* Campo Password */}
                            <GridItem rowSpan={2}>
                                <FormLabel color='#003366' paddingBottom='5px'>Password</FormLabel>
                                <Input
                                    p='0 0 0 10px'
                                    variant='flushed'
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    required
                                    value={formData.password}
                                    onChange={(e) => { handleFormEdit(e, 'password') }}
                                />
                            <Stack w='100%' fontSize='xs' gap='0' justify='flex-start' >
                                <Alert
                                    p='0'
                                    bg='transparent'
                                    color={caract ? '#2F855A' : '#C53030'}
                                    status={caract ? 'success' : 'error'}
                                >
                                    <AlertIcon w='13px' />
                                    Minímo 10 caracteres;
                                </Alert>
                                <Alert
                                    p='0'
                                    bg='transparent'
                                    color={maius ? '#2F855A' : '#C53030'}
                                    status={maius ? 'success' : 'error'}
                                >
                                    <AlertIcon w='13px' />
                                    Minímo 1 maiúscula;
                                </Alert>
                                <Alert
                                    p='0'
                                    bg='transparent'
                                    color={num ? '#2F855A' : '#C53030'}
                                    status={minus ? 'success' : 'error'}
                                >
                                    <AlertIcon w='13px' />
                                    Minímo 1 minúscula;
                                </Alert>
                                <Alert
                                    p='0'
                                    bg='transparent'
                                    color={num ? '#2F855A' : '#C53030'}
                                    status={num ? 'success' : 'error'}
                                >
                                    <AlertIcon w='13px' />
                                    Minímo 1 número;
                                </Alert>
                                <Alert
                                    p='0'
                                    bg='transparent'
                                    color={esp ? '#2F855A' : '#C53030'}
                                    status={esp ? 'success' : 'error'}
                                >
                                    <AlertIcon w='13px' />
                                    Minímo 1 caracter especial;
                                </Alert>
                            </Stack>
                            </GridItem>

                            {/* Campo Setor */}
                            <FormControl>
                                <FormLabel color='#003366' paddingBottom='5px'>Setor</FormLabel>
                                <Input
                                    p='0 0 0 10px'
                                    variant='flushed'
                                    name='setor'
                                    type='text'
                                    placeholder='Setor'
                                    required
                                    value={formData.setor}
                                    onChange={(e) => { handleFormEdit(e, 'setor') }}
                                />
                            </FormControl>

                            {/* Stack de mensagens de validação */}

                        </Grid>

                        {/* Botão de cadastro */}
                        <Button
                            type='submit'
                            bg='#6699CC'
                            color='white'
                            w='100%'
                            h='48px'
                            borderRadius='4px'
                            fontSize='lg'
                            fontWeight='500'
                            _hover={{ bg: `#5c7da6`, color: `#FFF` }}
                        >
                            Sign up
                        </Button>

                    </form>
                </Flex>
            </VStack>
        </>
    )
}