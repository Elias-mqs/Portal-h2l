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
        <Stack>

            <Flex >

                <InputGroup top='30px' left='30px' w='20%'   >

                    <InputLeftElement color='#68686890' w='25px' h='20px'  >
                        <IconSearch  />
                    </InputLeftElement>
                    <Input
                        h='30px'
                        fontSize={14}
                        placeholder='Nº do chamado'
                        color='#7b809abe'
                    />
                </InputGroup>

            </Flex>


        </Stack>
    )
}


// estou tentando alinhar o ícone, parei fazendo a barra search
// chamados em andamento