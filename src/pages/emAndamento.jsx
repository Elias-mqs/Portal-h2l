import { Stack, Flex, Box, Text, useToast } from "@chakra-ui/react";
import { FormInputBtn, ListaChamado, decript } from "@/components";
import { MdSearch } from "react-icons/md";
import { useState, useEffect } from "react";
import { api } from '@/utils/api'
import { userContext } from "@/context/UserContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { listChamOsquery } from "@/services/emAndamento/buscaChamOs/listaChamOs";
import Image from "next/image";



const schema = z.object({
    numChamado: z.coerce.string().min(1, 'Digite ao menos 1 número para buscar'),
})


export default function chamados() {

    const passCryp = process.env.NEXT_PUBLIC_PASSCRYP;

    const toast = useToast();

    const { data: { data: { [0]: [dataUser], [1]: info } } } = userContext();
    console.log(info)
    console.log(dataUser)

    let listChamOs = [];

    if (dataUser.admin === '0' || dataUser.admin === '1') {
        const { data } = listChamOsquery({ codCli: dataUser.codCli, loja: dataUser.loja, admin: dataUser.admin }) || {};
        listChamOs = data?.ordens || [];
    }

    console.log(listChamOs)


    const { control, handleSubmit } = useForm({
        resolver: zodResolver(schema),
        defaultValue: {
            numChamado: ''
        }
    })



    // FAZER CACHE NESSA BUSCA (JA EVITA VARIAS REQUISIÇÕES DE UMA VEZ POR CLICAR MUITO RAPIDO)
    const handleSearch = async (e) => {
        e.preventDefault();

        try {

            const result = await api.post('emAndamento', searchChamadoInfo)


        } catch (error) {
            console.error('Erro')
        }
    }


    console.log('renderizando page em andamento')


    return (

        // RENDERIZAR SOMENTE QUANDO TIVER CHAMADO ABERTO 


        <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'100%'} transition='max-width 1s linear' p='30px' overflowY='auto'
            borderRadius={{ base: 0, md: '1rem' }} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} >

            {listChamOs.length > 0 ? (
                <>
                    <Stack aria-label='containerSearch' align='center' mb={4} >
                        <Flex as='form' onSubmit={handleSubmit(handleSearch)} w='100%' maxW='80em' >

                            <Controller
                                name='numChamado'
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <FormInputBtn type='number' value={value} w={{ base: '100%', sm: 'auto' }} border='1px solid #C0C0C0' size='sm' boxSize='32px'
                                        icon={<MdSearch size='24px' color='#7B809A' />} variant='filled' bg='#ffffff8d' onChange={onChange}
                                        placeholder='Nº do Chamado' borderRadius='1rem' />
                                )}
                            />

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


                            {listChamOs.map((chamados, index) => (
                                <Flex key={index} aria-label='chamados' direction='column' w='auto' gap={1}>
                                    <ListaChamado chamados={chamados} />
                                </Flex>
                            ))}

                        </Stack>
                    </Box >
                </>
            ) : (
                <>
                    <Stack align='center' justify='center' borderRadius='10rem' p={30} mt='-40px' >
                        <Image width={700} height={700} alt='Imagem de page sem chamados' src='/img/imgEmpty.png' priority quality={90} />
                        <Text fontFamily='cursive' fontSize={20} fontWeight={600} color='#7d7d7d' >No momento, </Text>
                        <Text fontFamily='cursive' textAlign='center' fontSize={20} fontWeight={600} color='#7d7d7d' > não há chamados em andamento</Text>
                    </Stack>
                </>
            )
            }
        </Stack >

    )
}