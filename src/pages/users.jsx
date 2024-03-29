
// src/pages/users.js
import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '@/utils/api';


export default function users() {
    const router = useRouter();
    const [dados, setDados] = useState({ nome: '', username: '' });

    useEffect(() => {
        async function buscarDados() {
            try {
                const res = await api.get('me');
                setDados(res.data);

            } catch (error) {
                console.log(error);
            }
        }

        buscarDados();
    }, []);

    return (

        <Flex w='100%' h='100vh' gap={3} justify='center' alignItems='center' bg='#f0f0f0' >
            <Flex bg='#FFF' w='300px' h='400px' justify='center' alignItems='center' direction='column' gap='50px' border='2px solid #000' borderRadius='20px' >
                <Flex gap={2} direction='column' justify='center' alignItems='center' >
                    <Text>Nome:</Text>
                    <Flex w='200px' h='35px' justify='center' alignItems='center' border='2px solid #000' borderRadius='5px'>
                        <Input textAlign='center' value={dados.nome} isReadOnly />
                    </Flex>
                </Flex>



                <Flex gap={2} direction='column' justify='center' alignItems='center' >
                    <Text>Username</Text>
                    <Flex w='200px' h='35px' border='2px solid #000' justify='center' alignItems='center' borderRadius='5px'>
                        <Input textAlign='center' value={dados.username} isReadOnly />
                    </Flex>
                </Flex>
            </Flex>
            <Flex>
                <Button colorScheme='teal' size='lg' onClick={() => router.push('/login')}>
                    Login
                </Button>
            </Flex>
        </Flex>

    )
}