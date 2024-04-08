import { Button, Grid, FormLabel, Input, VStack, useToast, GridItem, Alert, AlertIcon, FormControl, Stack, Box } from "@chakra-ui/react";
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
        setor: '',
    })

    const [passwordError, setPasswordError] = useState('');

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

        if (!validatePassword(formData.password)) {
            return;
        } 


        try {

            const result = await api.post('cadastro', formData)
            const token = result?.data?.token;
            localStorage.setItem('token', token);
            setFormData({ name: ``, username: ``, email: ``, password: ``, setor: `` })

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
    }


    return (

        <VStack w={{ base: '100%' }} h='100vh' p={{ base: 0, sm: '30px 20px' }} align='center' justify='center' bg='#f0f0f0'>

            {/* Barra de navegação */}
            {/* <Flex direction='row' alignItems='flex-start' justify='space-between' w='100%' p='20px'>
                <Button colorScheme='teal' size='lg' onClick={() => router.push('/login')}>
                    Login
                </Button>
                <Button colorScheme='teal' size='lg' onClick={() => router.push('/users')}>
                    Users
                </Button>
            </Flex> */}



            <Box
                as='form'
                onSubmit={handleForm}
                w="100%"
                maxW="600px"
                bg="#EDF2FF"
                borderRadius="10px"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.4)"
                p={{ base: '35px 20px 35px', sm: "35px 20px" }}
                transition={{ base: 'width 0.3s ease' }}
            >

                <Grid
                    templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }} ///// VER QUAL FICA MELHOR, ESSE OU O DE BAIXO
                    w={{ base: '100%' }}
                    gap={8}
                >

                    {/* Campo Nome */}
                    <GridItem>
                            <FormLabel color='#003366' paddingBottom='5px'>Name</FormLabel>
                            <Input p='0 0 0 10px' variant='flushed' name='name' type='text' placeholder='Name' required value={formData.name} onChange={(e) => { handleFormEdit(e, 'name') }} />
                    </GridItem>

                    {/* Campo Email */}
                    <GridItem order={{ base: 2, sm: 3 }} >
                            <FormLabel color='#003366' paddingBottom='5px'>Email</FormLabel>
                            <Input p='0 0 0 10px' variant='flushed' name='email' type='email' placeholder='Email' required value={formData.email} onChange={(e) => { handleFormEdit(e, 'email') }} />
                    </GridItem>

                    {/* Campo Setor */}
                    <GridItem order={{ base: 3, sm: 5 }} >
                            <FormLabel color='#003366' paddingBottom='5px'>Setor</FormLabel>
                            <Input p='0 0 0 10px' variant='flushed' name='setor' type='text' placeholder='Setor' required value={formData.setor} onChange={(e) => { handleFormEdit(e, 'setor') }} />
                    </GridItem>

                    {/* Campo Username */}
                    <GridItem order={{ base: 3, sm: 2 }} >
                            <FormLabel color='#003366' paddingBottom='5px'>Username</FormLabel>
                            <Input p='0 0 0 10px' variant='flushed' name='username' type='text' placeholder='Username' required value={formData.username} onChange={(e) => { handleFormEdit(e, 'username') }} />
                    </GridItem>

                    {/* Campo Password */}
                    <GridItem rowSpan={2} order={{ base: 5, sm: 4 }} >
                            <FormLabel color='#003366' paddingBottom='5px'>Password</FormLabel>
                            <Input p='0 0 0 10px' variant='flushed' name='password' type='password' placeholder='Password' required value={formData.password} onChange={(e) => { handleFormEdit(e, 'password') }} />

                            {/* Stack de mensagens de validação */}
                            {passwordError && (
                                <Stack w='100%' fontSize='xs' gap='0' justify='flex-start' >
                                    <Alert p='0' bg='transparent' color='#C53030' status='error' >
                                        <AlertIcon w='13px' />
                                        {passwordError}
                                    </Alert>
                                </Stack>
                            )}
                    </GridItem>


                </Grid>

                {/* Botão de cadastro */}
                <Button type='submit' bg='#6699CC' mt='30px' color='white' w='100%' h='48px' borderRadius='4px' fontSize='lg' fontWeight='500' _hover={{ bg: `#5c7da6`, color: `#FFF` }} >
                    Cadastro
                </Button>


            </Box>
        </VStack>

    )
}