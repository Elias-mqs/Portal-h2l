import { Stack, Flex, Box, Text, Input, Button } from "@chakra-ui/react";
import { ListaChamado } from "@/components";
import { userContext } from "@/context/UserContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { listChamOsquery } from "@/services/emAndamento/buscaChamOs/listaChamOs";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";



//  CAMPOS RETIRADOS TEMPORARIAMENTE
const schema = z.object({
    numChamado: z.coerce.string(),
    // codCli: z.coerce.string(),
    // loja: z.coerce.string(),
})

interface ListChamOs {
    Atendente_ab1: string,
    atendente_os: string,
    chamado: string,
    codCli: string,
    contador_cham: number,
    contato_cham: string,
    descri_cham: string,
    descri_pro: string,
    emissao_cham: string,
    emissao_os: string,
    loja: string,
    motivo_cham: string,
    'nome_ tec': string,
    nome_cli: string
    num_os: string
    serial: string
    status_cham: string,
    status_os: string,
    tipo: string,
}




export default function EmAndamento() {


    const router = useRouter();
    const [filteredChamOs, setFilteredChamOs] = useState<ListChamOs[]>([]);
    const { data: { data: { [0]: [dataUser] } } }: any = userContext();
    console.log(dataUser)


    // CAMPOS RETIRADOS TEMPORARIAMENTE
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            numChamado: '',
            // codCli: '',
            // loja: ''
        }
    })


    let listChamOs: ListChamOs[] = [];

    if (dataUser.admin === '0' || dataUser.admin === '1') {
        const { data } = listChamOsquery({ codCli: dataUser.codCli, loja: dataUser.loja, admin: dataUser.admin }) || {};
        listChamOs = data?.ordens || [];
    }


    // AO RENDERIZAR A TELA ESTA SENDO CHAMADO TODOS OS CHAMADOS DE TODAS AS LOJAS DO CLIENTE DO USUÁRIO ADMIN 2, 3 E 4,
    // NÃO CONSIGO RESOLVER ESSE PROBLEMA POIS A API NÃO TEM OPÇÃO DE FILTRAR E ELA PUXA SOMENTE 150 CHAMADOS
    if (dataUser.admin === '2' || dataUser.admin === '3' || dataUser.admin === '4') {
        const { data } = listChamOsquery({ codCli: dataUser.codCli, admin: dataUser.admin }) || {};
        listChamOs = data?.ordens || [];
    }




    const handleSearch = (dataSrc: { numChamado: string }) => {

        router.push({
            pathname: '/Chamados/EmAndamento',
            query: { numCham: dataSrc.numChamado }
        });

    };



    useLayoutEffect(() => {
        const filterChamados = () => {
            console.log('passou uma vez aqui')

            const { numCham } = router.query;
            console.log(numCham)

            if (typeof numCham === 'string' && numCham !== '') {
                console.log('passou aqui dentro')
                setFilteredChamOs(listChamOs.filter((list) => list.chamado.includes(numCham)));
            } else {
                console.log('aqui também')
                setFilteredChamOs([]);
            }
        };

        filterChamados();
    }, [router.query]);



    console.log('teste: ', listChamOs)



    return (

        <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'100%'} transition='max-width 1s linear' p='30px' overflowY='auto'
            borderRadius={{ base: 0, md: '1rem' }} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} >


            {listChamOs.length > 0 ? (

                <>
                    <Stack aria-label='containerSearch' align='center' mb={4} >


                        {/* PRECISO CRIAR ALGUMA LÓGICA PARA ESSE FILTRO DEPOIS */}
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



                            {/*
                             ATÉ EU RESOLVER O PROBLEMA DA RENDERIZAÇÃO FILTRADA VOU DEIXAR SEM ESSES CAMPOS ABAIXO
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
                            }  */}



                            <Button type='submit' colorScheme="blue" size='sm' variant='ghost' borderRadius='.5rem' isDisabled={isSubmitting} >Filtrar</Button>

                        </Flex>

                    </Stack>

                    <Box aria-label='containerInfo' overflowX='auto' w='auto' pb={4} >
                        <Stack aria-label='containerW' spacing={4} align={{ base: 'start', '2xl': 'center' }} >

                            <Flex aria-label='flex1' borderBottom='2px solid #818181' ml='85px' >
                                <Flex aria-label='flex2' w='auto' pb={2} >
                                    <Box w='80px' textAlign='center' fontWeight={500}><Text>OS</Text></Box>
                                    <Box w='175px' textAlign='center' fontWeight={500}><Text>Chamado</Text></Box>
                                    <Box w='150px' textAlign='center' fontWeight={500}><Text>Status</Text></Box>
                                    <Box w='175px' textAlign='center' fontWeight={500}><Text>Série equipamento</Text></Box>
                                    <Box w='175px' textAlign='center' fontWeight={500}><Text>Ocorrência</Text></Box>
                                    <Box w='190px' textAlign='center' fontWeight={500}><Text>Atendente</Text></Box>
                                    <Box w='175px' textAlign='center' fontWeight={500}><Text>Data da emissão</Text></Box>
                                </Flex>
                            </Flex>


                            {filteredChamOs.length > 0 ? (

                                filteredChamOs.map((chamados, index) => {
                                    if (chamados.status_cham === 'A' || (chamados.status_cham === 'E' && chamados.status_os && chamados.status_os.trim() !== 'F')) {
                                        return (
                                            <Flex key={index} aria-label='chamados' direction='column' w='auto' gap={1}>
                                                <ListaChamado chamados={chamados} />
                                            </Flex>
                                        );
                                    }
                                    return null;
                                })

                            ) : (

                                listChamOs.map((chamados, index) => {
                                    if (chamados.status_cham === 'A' || (chamados.status_cham === 'E' && chamados.status_os && chamados.status_os.trim() !== 'F')) {
                                        return (
                                            <Flex key={index} aria-label='chamados' direction='column' w='auto' gap={1}>
                                                <ListaChamado chamados={chamados} />
                                            </Flex>
                                        );
                                    }
                                    return null;
                                })

                            )}

                        </Stack>
                    </Box >
                </>
            ) : (
                <>
                    <Stack align='center' justify='center' borderRadius='10rem' p={30} mt='-40px' >



                        {/* ATÉ EU RESOLVER O PROBLEMA DA RENDERIZAÇÃO FILTRADA VOU DEIXAR SEM ESSES CAMPOS ABAIXO */}
                        {/* {(dataUser.admin === '3' || dataUser.admin === '2') &&

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

                        } */}



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