import { Button, Flex, Grid, FormLabel, Input, VStack, useToast, FormControl, Box, Alert, AlertIcon, Stack } from "@chakra-ui/react";
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
        <VStack w='100%' h='100vh' justify='center' bg='#f0f0f0'

        >

            <Flex direction='row'>
                <Flex gap='15px'>
                    <Button colorScheme='teal' size='lg' onClick={() => router.push('/login')}>
                        Login
                    </Button>
                    <Button colorScheme='teal' size='lg' onClick={() => router.push('/users')}>
                        Users
                    </Button>
                </Flex>
            </Flex>

            <Flex
                w='600px'
                h='500px'
                maxW={{ base: "90%" }}
                
                bg='#EDF2FF'
                alignItems='center'
                justify='center'
                direction='column'
                borderRadius='10px'
                shadow='0 0 10px rgba(0, 0, 0, 0.4)'
            >

///////////////////////////parei mexendo nesse width do flex testando o em ou px ou rem
                <Flex
                    w='150em'
                    p='0 10px'
                    alignItems='center'
                    justify='center'
                >
                    <form onSubmit={handleForm}>



                        <FormGroup >
                            <Grid templateColumns='repeat(2, 4fr)' gap={8} >
                                <FormControl>
                                    <FormLabel color='#003366' paddingBottom='5px' >Name</FormLabel>
                                    <Input
                                        p='0 0 0 10px'
                                        bottom='15px'
                                        variant='flushed'
                                        name='name'
                                        type='text'
                                        placeholder='Name'
                                        required
                                        value={formData.name}
                                        onChange={(e) => { handleFormEdit(e, 'name') }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color='#003366' paddingBottom='5px' >Username</FormLabel>
                                    <Input
                                        p='0 0 0 10px'
                                        bottom='15px'
                                        variant='flushed'
                                        name='username'
                                        type='text'
                                        placeholder='Username'
                                        required
                                        value={formData.username}
                                        onChange={(e) => { handleFormEdit(e, 'username') }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color='#003366' paddingBottom='5px' >Email</FormLabel>
                                    <Input
                                        p='0 0 0 10px'
                                        bottom='15px'
                                        variant='flushed'
                                        name='email'
                                        type='email'
                                        placeholder='Email'
                                        required
                                        value={formData.email}
                                        onChange={(e) => { handleFormEdit(e, 'email') }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color='#003366' paddingBottom='5px' >Password</FormLabel>
                                    <Input
                                        p='0 0 0 10px'
                                        variant='flushed'
                                        bottom='15px'
                                        name='password'
                                        type='password'
                                        placeholder='Password'
                                        required
                                        value={formData.password}
                                        onChange={(e) => { handleFormEdit(e, 'password') }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color='#003366' paddingBottom='5px' >Setor</FormLabel>
                                    <Input
                                        p='0 0 0 10px'
                                        variant='flushed'
                                        bottom='15px'
                                        name='setor'
                                        type='text'
                                        placeholder='Setor'
                                        required
                                        value={formData.setor}
                                        onChange={(e) => { handleFormEdit(e, 'setor') }}
                                    />
                                </FormControl>

                                <Stack w='190px' gap='0' justify='flex-end' paddingTop='50px' h='30px' fontSize='12px'  >
                                    <Alert p='8px' bg='transparent' color={caract ? '#2F855A' : '#C53030'} status={caract ? 'success' : 'error'}>
                                        <AlertIcon w='13px' />
                                        Minímo 10 caracteres
                                    </Alert>
                                    <Alert p='8px' bg='transparent' color={maius ? '#2F855A' : '#C53030'} status={maius ? 'success' : 'error'}>
                                        <AlertIcon w='13px' />
                                        Minímo 1 maiúcula
                                    </Alert>
                                    <Alert p='8px' bg='transparent' color={minus ? '#2F855A' : '#C53030'} status={minus ? 'success' : 'error'}>
                                        <AlertIcon w='13px' />
                                        Minímo 1 minúscula
                                    </Alert>
                                    <Alert p='8px' bg='transparent' color={num ? '#2F855A' : '#C53030'} status={num ? 'success' : 'error'}>
                                        <AlertIcon w='13px' />
                                        Minímo 1 número
                                    </Alert>
                                    <Alert p='8px' bg='transparent' color={esp ? '#2F855A' : '#C53030'} status={esp ? 'success' : 'error'}>
                                        <AlertIcon w='13px' />
                                        Minímo 1 caracter especial
                                    </Alert>
                                </Stack>

                            </Grid>

                            <Button
                                // w='100px'
                                // top='20px'
                                type='submit'
                                bg='#6699CC'
                                color='white'
                                w='100%' h='48px'
                                fontSize={20}
                                borderRadius='4px'
                                alignItems='center'
                                justifyContent='center'
                                fontWeight='500'
                                _hover={{ bg: `#5c7da6`, color: `#FFF` }}

                            >
                                Sign up
                            </Button>

                        </FormGroup>

                    </form>
                </Flex>
            </Flex>



        </VStack >

    )
}