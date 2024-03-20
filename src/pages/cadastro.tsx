import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, VStack } from "@chakra-ui/react";

export default function cadastro() {
    return (
        <Flex p='200px' justify='center'>
            <VStack>

                <form>
                    <Flex gap={3} direction='column'>
                        <FormLabel>Username</FormLabel>
                        <Input variant='flushed' name='username' type='text' placeholder='username' />
                        <FormLabel>Password</FormLabel>
                        <Input variant='flushed' name='password' type='password' placeholder='password' />
                        <Button type='submit' variant='solid'>Cadastrar</Button>

                    </Flex>
                </form>


            </VStack>
        </Flex>
    )
}