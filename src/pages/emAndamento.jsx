import { Stack, Flex, Box, Text, useToast } from "@chakra-ui/react";
import { FormInputBtn, ListaChamado, decript } from "@/components";
import { MdSearch } from "react-icons/md";
import { useState, useEffect } from "react";
import { api } from '@/utils/api'



export default function chamados() {

    const passCryp = process.env.NEXT_PUBLIC_PASSCRYP
    const toast = useToast()
    const [searchChamado, setSearchChamado] = useState({ chamado: '' })
    const [infoUser, setInfoUser] = useState({ info: '' })
    const [chamadoResults, setChamadoResults] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function srcUser() {
            try {
                const data = await api.get('userData')
                const result = decript(data.data)
                setInfoUser({
                    info: result[1]
                });

            } catch (error) {
                console.error('Erro', error)
            }
        }
        srcUser()
    }, [])

    const handleFormEdit = (e) => {
        let novosDados = { ...searchChamado }
        novosDados[e.target.name] = e.target.value
        setSearchChamado(novosDados);
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        let searchChamadoInfo = { ...searchChamado, info: infoUser.info }

        if (searchChamado.chamado.trim() === '') {
            toast({ position: 'top', title: "Atenção", description: 'Digite uma informação', status: 'error', duration: 3000, isClosable: true, })
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1000);
            return
        }

        try {
            
            const result = await api.post('emAndamento', searchChamadoInfo)

            setChamadoResults(result.data.chamados)

            setTimeout(() => {
                setIsSubmitting(false);
            }, 1000);

        } catch (error) {
            console.error('Erro')
        }
    }


    return (

        <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'100%'} transition='max-width 1s linear' p='30px' overflowY='auto'
            borderRadius={{ base: 0, md: '1rem' }} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} >

            <Stack aria-label='containerSearch' align='center' mb={4} >
                <Flex as='form' onSubmit={handleSearch} w='100%' maxW='80em' >
                    <FormInputBtn name='chamado' type='number' value={searchChamado.chamado} w={{ base: '100%', sm: 'auto' }} border='1px solid #C0C0C0' size='sm' boxSize='32px' icon={<MdSearch size='24px' color='#7B809A' />}
                        variant='filled' bg='#ffffff8d' onChange={handleFormEdit} placeholder='Nº do Chamado' borderRadius='1rem' disabled={isSubmitting} />
                </Flex>
            </Stack>

            <Box aria-label='containerInfo' overflowX='auto' w='auto' pb={4} >
                <Stack aria-label='containerW' spacing={4} align={{ base: 'start', '2xl': 'center' }} >

                    <Flex aria-label='flex1' borderBottom='2px solid #818181' >
                        <Flex aria-label='flex2' ml='85px' w='auto' pb={2} >
                            <Box w='80px' align='center' textAlign='center' fontWeight={500}><Text>OS</Text></Box>
                            <Box w='175px' align='center' textAlign='center' fontWeight={500}><Text>Chamado</Text></Box>
                            <Box w='150px' align='center' textAlign='center' fontWeight={500}><Text>Status</Text></Box>
                            <Box w='175px' align='center' textAlign='center' fontWeight={500}><Text>Série equipamento</Text></Box>
                            <Box w='175px' align='center' textAlign='center' fontWeight={500}><Text>Ocorrência</Text></Box>
                            <Box w='190px' align='center' textAlign='center' fontWeight={500}><Text>Especialista atribuido</Text></Box>
                            <Box w='175px' align='center' textAlign='center' fontWeight={500}><Text>Data da solicitação</Text></Box>
                        </Flex>
                    </Flex>

                    {chamadoResults.map((chamados, index) => (
                        <Flex key={index} aria-label='chamados' direction='column' w='auto' gap={5} >
                            <ListaChamado chamados={chamados} />
                        </Flex>
                    ))}

                </Stack>
            </Box >
        </Stack >
    )
}