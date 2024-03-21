import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import me from "./api/me";

export default function users() {

    const [dados, setDados] = useState({});


    

    return (

        <Flex
            w='100%'
            h='100vh'
            justify='center'
            alignItems='center'
            bg='#f0f0f0'

        >
            <Flex
                bg='#FFF'
                w='300px'
                h='400px'
                justify='center'
                alignItems='center'
                direction='column'
                gap='50px'
                border='2px solid #000'
                borderRadius='20px'
            >
                <Flex gap={2} direction='column' justify='center' alignItems='center' >
                    <Text>Nome</Text>
                    <Flex w='200px' h='35px' justify='center' alignItems='center' border='2px solid #000' borderRadius='5px'>
                        <Text>Nome: </Text>
                    </Flex>
                </Flex>
                <Flex gap={2} direction='column' justify='center' alignItems='center' >
                    <Text>Username</Text>
                    <Flex w='200px' h='35px' border='2px solid #000' justify='center' alignItems='center' borderRadius='5px'>
                        <Text>Username: </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex >

    )
}