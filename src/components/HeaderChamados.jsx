
import {
    Flex,
    Box,
    Text,
    VStack,
    HStack,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TabIndicator
} from '@chakra-ui/react'
import { ButtonHamburger, PageChamadosAndamento } from '.'
import { CaminhoHeader, PageChamados } from '.'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'


export default function HeaderChamados({ children, onSubmit }) {
    return (
        <VStack
            bg='transparent'
            w='100%'
            h='100px'
            paddingTop='10px'
            align='stretch'
        >
            <Flex
                h='35px'
                alignItems='flex-start'
                justifyContent='space-between'
            >
                <Box color='#7B809A'>
                    <CaminhoHeader />
                    <ButtonHamburger />
                </Box>
                <Box
                    display='flex'
                    w='90px'
                    p='0 30px 0 0'
                    justifyContent='space-between'
                    color='#7B809A'
                >
                    <SettingsIcon />
                    <NotificationsIcon />
                </Box>
            </Flex>


            <HStack  >
                <HStack
                    justifyContent='space-between'
                    w='100%'
                    marginLeft='30px'
                    marginBottom='30px'
                    borderBottom='2px solid rgb(123, 128, 154, 0.4)'
                >

                    {/* Esse espaço é para adicionar as tabs que peguei no chakra */}
                    <Tabs variant="unstyled" w='100%' h='38px'>
                        <TabList>
                            <Tab>Chamados</Tab>
                            <Tab>Chamados em andamento</Tab>
                        </TabList>
                        <TabIndicator
                            mt="-2px"
                            height="2px"
                            bg="blue.500"
                            borderRadius="1px"
                        />

                        {/* <TabPanels>
                            <TabPanel>
                                 Dar um jeito de colocar as pages aqui,
                                pode ser em outro arquivo,
                                mas tem que ser entre essas tags
                            </TabPanel>
                            <TabPanel>
                                Dar um jeito de colocar as pages aqui,
                                pode ser em outro arquivo,
                                mas tem que ser entre essas tags
                            </TabPanel>

                        </TabPanels> */}

                    </Tabs>

                </HStack>
                <Flex alignItems='center' gap={3}>
                    <Text fontWeight={500} fontSize='14'>Cancelar</Text>
                    <Button onClick={onSubmit} bgGradient='linear(to-r, #4863ec, #cdd5fd)' color='white' w='80px' h='28px' borderRadius='20px' fontSize='15px'>
                        Salvar
                    </Button>
                </Flex>
            </HStack>



        </VStack >
    )
}
