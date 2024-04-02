import { Box, Button, Flex, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";
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


    return (
        <VStack w='100%' h='100vh' justify='center' bg='#f0f0f0'>

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

            <Flex w='350px' h='450px' bg='#FFF' alignItems='center' justify='center' direction='column' border='2px solid #000'>
                <form onSubmit={handleForm}>


                    <Box>
                    </Box>
                    <FormGroup>
                        <FormLabel paddingBottom='5px' >Name</FormLabel>
                        <Input
                            w='250px'
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
                        <FormLabel paddingBottom='5px' >Username</FormLabel>
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
                        <FormLabel paddingBottom='5px' >Email</FormLabel>
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
                        <FormLabel paddingBottom='5px' >Password</FormLabel>
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


                        <Button
                            top='15px'
                            type='submit'
                            variant='solid'

                        >
                            Sign up
                        </Button>

                    </FormGroup>

                </form>
            </Flex>



        </VStack>

    )
}