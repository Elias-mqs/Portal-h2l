import { Stack, Flex, Box, Text, useToast } from "@chakra-ui/react";
import { FormInputBtn, ListaChamado } from "@/components";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import api from '@/utils/api'


export default function chamados() {

    const toast = useToast()
    const [searchChamado, setSearchChamado] = useState({ chamado: '' })
    const [chamadoResults, setChamadoResults] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleFormEdit = (e) => {
        let novosDados = { ...searchChamado }
        novosDados[e.target.name] = e.target.value
        setSearchChamado(novosDados);
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await api.post('emAndamento', searchChamado)
            setChamadoResults(result.data.chamados)
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1000);
            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

        } catch (error) {
            console.error(error)
            toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
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