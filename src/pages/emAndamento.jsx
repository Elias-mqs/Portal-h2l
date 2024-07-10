import { Stack, Flex, Box, Text, useToast, Input, Button } from "@chakra-ui/react";
import { FormInputBtn, ListaChamado, decript } from "@/components";
import { MdSearch } from "react-icons/md";
import { useState, useEffect, useContext, useCallback } from "react";
import { api } from '@/utils/api'
import { userContext } from "@/context/UserContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { listChamOsquery } from "@/services/emAndamento/buscaChamOs/listaChamOs";
import Image from "next/image";



const schema = z.object({
    numChamado: z.coerce.string(),
    codCli: z.coerce.string(),
    loja: z.coerce.string(),
})


export default function chamados() {


    const { data: { data: { [0]: [dataUser], [1]: info } } } = userContext();
    console.log(info)
    console.log(dataUser)




    const [envioForm, setEnvioForm] = useState({ codCli: '', loja: '', enviando: false })


    const { control, handleSubmit } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { numChamado: '', codCli: '', loja: '' }
    })

    let listChamOs = [];

    if (dataUser.admin === '0' || dataUser.admin === '1') {
        const { data } = listChamOsquery({ codCli: dataUser.codCli, loja: dataUser.loja, admin: dataUser.admin }) || {};
        listChamOs = data?.ordens || [];
    }

    // if (dataUser.admin === '2' || dataUser.admin === '3' || dataUser.admin === '4') {
    //     const { data } = listChamOsquery({ codCli: data.codCli, admin: dataUser.admin }) || {};
    //     listChamOs = data?.ordens || [];
    // }







    // if ((dataUser.admin === '2' || dataUser.admin === '3') && envioForm.enviando) {
    //     if (!envioForm.loja) {
    //         const { data } = listChamOsquery({ codCli: envioForm.codCli, admin: dataUser.admin }) || {};
    //         listChamOs = data?.ordens || [];
    //         setEnvioForm({ codCli: '', loja: '', enviando: false });
    //     } else {
    //         const { data } = listChamOsquery({ codCli: envioForm.codCli, loja: envioForm.loja, admin: dataUser.admin }) || {};
    //         listChamOs = data?.ordens || [];
    //         setEnvioForm({ codCli: '', loja: '', enviando: false });
    //     }
    // }


    console.log(envioForm)


    useEffect(() => {
        if ((dataUser.admin === '2' || dataUser.admin === '3') && envioForm.enviando) {
            console.log('dentro do if:', envioForm);
            const requestData = !envioForm.loja
                ? { codCli: envioForm.codCli, admin: dataUser.admin }
                : { codCli: envioForm.codCli, loja: envioForm.loja, admin: dataUser.admin };
            console.log(requestData);

            const { data } = listChamOsquery(requestData) || {};
            console.log(data);
            listChamOs = data?.ordens || [];
            console.log(listChamOs);
            setEnvioForm({ codCli: '', loja: '', enviando: false });
        }
    }, [envioForm, dataUser]);









    console.log(listChamOs)





    // FAZER CACHE NESSA BUSCA (JA EVITA VARIAS REQUISIÇÕES DE UMA VEZ POR CLICAR MUITO RAPIDO)
    // NÃO PRECISA DE STOPROPAGATION
    const handleSearch = (dataSrc) => {
        console.log('teste')
        //     console.log('Form data:', dataSrc);
        //     let data = [];

        //     if (dataUser.admin === '2' || dataUser.admin === '3') {
        //         if (!dataSrc.loja) {
        //             const response = listChamOsquery({ codCli: dataSrc.codCli, admin: dataUser.admin }) || {};
        //             return data = response?.data || [];
        //         } else {
        //             const response = listChamOsquery({ codCli: dataSrc.codCli, loja: dataSrc.loja, admin: dataUser.admin }) || {};
        //             return data = response?.data || [];
        //         }
        //     }
    }





    const handleBusca = (dataSrc) => {
        console.log('Form data:', dataSrc);

        if (dataUser.admin === '2' || dataUser.admin === '3') {
            if (!dataSrc.loja) {
                setEnvioForm({ codCli: dataSrc.codCli, loja: '', enviando: true });
                return;
            } else {
                setEnvioForm({ codCli: dataSrc.codCli, loja: dataSrc.loja, enviando: true });
                return;
            }
        }
    }

    console.log('renderizando page em andamento')


    // VERIFICAR ESSA CONDIÇÃO DE RENDERIZAÇÃO QUE NÃO ESTA FUNCIONANDO (A PRIMEIRA)

    console.log(listChamOs)


    return (

        <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'100%'} transition='max-width 1s linear' p='30px' overflowY='auto'
            borderRadius={{ base: 0, md: '1rem' }} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} >


            {listChamOs.length > 0 ? (

                <>
                    <Stack aria-label='containerSearch' align='center' mb={4} >
                        <Flex as='form' onSubmit={handleSubmit(handleSearch)} w='100%' maxW='80em' gap={5} ml={8} >

                            <Controller
                                name='numChamado'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Input value={value} maxLength={15} type='number' onChange={(e) => onChange(e.target.value.trim())} placeholder='Nº do chamado'
                                        w={{ base: '100%', sm: 'auto' }} size='sm' borderRadius='1rem' border='1px solid #C0C0C0' />
                                )}
                            />

                            {(dataUser.admin === '3' || dataUser.admin === '2') &&
                                <>
                                    <Controller
                                        name='codCli'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <Input value={value} maxLength={7} onChange={(e) => onChange(e.target.value.trim())} placeholder='Cod. Cliente'
                                                w={{ base: '100%', sm: 'auto' }} size='sm' borderRadius='1rem' border='1px solid #C0C0C0' />
                                        )}
                                    />

                                    <Controller
                                        name='loja'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Input value={value} maxLength={2} onChange={(e) => onChange(e.target.value.trim().toUpperCase())} placeholder='Cod. Loja'
                                                w={{ base: '100%', sm: 'auto' }} size='sm' borderRadius='1rem' border='1px solid #C0C0C0' />
                                        )}
                                    />
                                </>
                            }

                            <Button type='submit' colorScheme="blue" size='sm' variant='ghost' borderRadius='.5rem' >Filtrar</Button>

                        </Flex>
                    </Stack>

                    <Box aria-label='containerInfo' overflowX='auto' w='auto' pb={4} >
                        <Stack aria-label='containerW' spacing={4} align={{ base: 'start', '2xl': 'center' }} >

                            <Flex aria-label='flex1' borderBottom='2px solid #818181' ml='85px' >
                                <Flex aria-label='flex2' w='auto' pb={2} >
                                    <Box w='80px' align='center' textAlign='center' fontWeight={500}><Text>OS</Text></Box>
                                    <Box w='175px' align='center' textAlign='center' fontWeight={500}><Text>Chamado</Text></Box>
                                    <Box w='150px' align='center' textAlign='center' fontWeight={500}><Text>Status</Text></Box>
                                    <Box w='175px' align='center' textAlign='center' fontWeight={500}><Text>Série equipamento</Text></Box>
                                    <Box w='175px' align='center' textAlign='center' fontWeight={500}><Text>Ocorrência</Text></Box>
                                    <Box w='190px' align='center' textAlign='center' fontWeight={500}><Text>Atendente</Text></Box>
                                    <Box w='175px' align='center' textAlign='center' fontWeight={500}><Text>Data da emissão</Text></Box>
                                </Flex>
                            </Flex>


                            {listChamOs.map((chamados, index) => {
                                if (chamados.status_cham === 'A' || (chamados.status_cham === 'E' && chamados.status_os && chamados.status_os.trim() !== 'F')) {
                                    return (
                                        <Flex key={index} aria-label='chamados' direction='column' w='auto' gap={1}>
                                            <ListaChamado chamados={chamados} />
                                        </Flex>
                                    );
                                }
                                return null;
                            })}

                        </Stack>
                    </Box >
                </>
            ) : (
                <>
                    <Stack align='center' justify='center' borderRadius='10rem' p={30} mt='-40px' >

                        {(dataUser.admin === '3' || dataUser.admin === '2') &&

                            <Flex as='form' onSubmit={handleSubmit(handleBusca)} w='100%' justify='start' gap={5}>

                                <Controller name='codCli' control={control} rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <Input value={value} maxLength={7} onChange={(e) => onChange(e.target.value.trim())} placeholder='Cod. Cliente'
                                            w={{ base: '100%', sm: 'auto' }} size='sm' borderRadius='1rem' border='1px solid #C0C0C0' />
                                    )}
                                />

                                <Controller name='loja' control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input value={value} maxLength={2} onChange={(e) => onChange(e.target.value.trim().toUpperCase())} placeholder='Cod. Loja'
                                            w={{ base: '100%', sm: 'auto' }} size='sm' borderRadius='1rem' border='1px solid #C0C0C0' />
                                    )}
                                />

                                <Button type='submit' colorScheme="blue" size='sm' variant='ghost' borderRadius='.5rem' >Buscar</Button>

                            </Flex>

                        }

                        <Image width={700} height={700} alt='Mulher apontando para a tela de um laptop com janelas de aplicativos.' src='/img/imgEmpty.png' priority quality={90} />
                        <Text fontFamily='cursive' fontSize={20} fontWeight={600} color='#7d7d7d' >No momento, </Text>
                        <Text fontFamily='cursive' textAlign='center' fontSize={20} fontWeight={600} color='#7d7d7d' > não há chamados em andamento</Text>
                    </Stack>
                </>
            )
            }
        </Stack >

    )
}