import {
    Text,
    Stack,
    Input,
    Flex,
    TagLeftIcon,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";



export default function PageChamadosAndamento() {
    return (
        <Stack flexDirection='column'>

            <Flex >

                <InputGroup top='30px' left='30px' w='13%' >
                    <InputLeftElement color='#68686890' w='20px' h='20px' top='15%' left='5%' justifyContent='flex-start'  >
                        <IconSearch />
                    </InputLeftElement>
                    <Input h='30px' placeholder='Nº do chamado' fontSize={13} color='#7b809a76' border='2px' fontWeight={500} />
                </InputGroup>

            </Flex>

            <Flex
                borderBottom='1px solid #406C94'
                m='0 70px'
                paddingTop='40px'
                paddingBottom='7px'
                justifyContent='space-around'
                textColor='#000'
                fontWeight={500}
                fontSize='15px'
            >
                <Text>NºOS</Text>
                <Text>Chamados</Text>
                <Text>Status</Text>
                <Text>Série do equipamento</Text>
                <Text>Ocorrência</Text>
                <Text>Especialista atribuído</Text>
                <Text>Data da solicitação</Text>
            </Flex>

            <Flex
                border='1px solid #406C94'
                h='60px'
                m='0 70px'
                alignItems='center'
                justifyContent='space-around'
                paddingBottom='7px'
                borderRadius='15px'
                textColor='#000'
                fontWeight={500}
                fontSize='15px'

            >
                <Text>NºOS</Text>
                <Text>213516</Text>
                <Text>Encaminhado</Text>
                <Text>X1X25X4X6X3XX</Text>
                <Text>Impressão manchada</Text>
                <Text>Elias Marques Cruz</Text>
                <Text>07/02/2024 16:14:35 </Text>

            </Flex>

        </Stack>
    )
}

