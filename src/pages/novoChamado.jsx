import { FormInput, FormTextarea, FormInputBtn, FormButtonSave, ButtonCancel } from '@/components';
import { Box, Stack, Flex, Grid, useToast, GridItem, Text, Select, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdSearch } from 'react-icons/md';
import { userContext } from '@/context/UserContext';
import { useForm, Controller } from 'react-hook-form';
import { useSearchCli } from '@/context/ResearchesContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSrcDataChamado } from '@/cache/srcEquipamentos'





////////////////////////TERMINAR EDIÇÃO DOS SCHEMAS DO FORM CHAMADOS
const schema = z.object({
    numserie: z.coerce.string().max(50),
    model: z.coerce.string(),
    acumulador: z.coerce.string().min(2, 'Valor mínimo: 2'),
    nomecli: z.coerce.string(),
    end: z.coerce.string(),
    bairro: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    mun: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    est: z.coerce.string().min(2).max(2),
    horario: z.coerce.string(),
    contato: z.coerce.string().max(50),
    tel: z.coerce.string().max(20),
    incident: z.coerce.string(),
    description: z.coerce.string()
})




export default function PageChamados({ pageProps: { ocorrencias } }) {


    const incident = ocorrencias.ocorrencias.sort((a, b) =>
        a.descricao.toLowerCase() > b.descricao.toLowerCase() ? 1 : a.descricao.toLowerCase() < b.descricao.toLowerCase() ? -1 : 0
    );

    const toast = useToast();
    const router = useRouter();

    const { data: { data: { [0]: [dataUser], [1]: info } } } = userContext();
    console.log(dataUser)

    const { srcData, isLoading, isError } = useSrcDataChamado({codCli: dataUser.codCli, loja: dataUser.loja})
    console.log(srcData)

    const { srcDataChamado } = useSearchCli();
    const [arrayEquip, setArrayEquip] = useState([]);

    const { control, setValue, handleSubmit } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            numserie: '', model: '', acumulador: '', nomecli: '', end: '', bairro: '', mun: '', est: '', horario: '',
            contato: '', tel: '', incident: '', description: ''
        }
    })





    const handleSave = async (e) => {

        e.preventDefault();

        console.log('Enviou o formulário!');

    }


    //////// FAZER A BUSCA DO ARRAY DE EQUIPAMENTOS DO USUÁRIO POIS A API ESTÁ COM DELAY DE 2s 
    let equipamentos;
    useEffect(() => {
        const srcEquip = async () => {
            const equipamentos = await srcDataChamado({ codCli: dataUser.codCli, loja: dataUser.loja });
            return equipamentos;
        }
        const response = srcEquip();
        setArrayEquip(response);
        
    }, [])



    const searchSerial = async (serialNumber) => {
        console.log(serialNumber);

        if (!serialNumber) {
            toast({ position: 'top', title: "", description: 'Informe um número de série', status: 'info', duration: 1500, isClosable: true, });
            return;
        }

        try {
            // const response = await srcDataChamado({ serie: serialNumber, codCli: dataUser.codCli, loja: dataUser.loja });
            const response = 'teste'
            console.log(response)

            // setValue('numserie', serialNumber);
            setValue('model', response.p);
            setValue('acumulador', response.ac);
            setValue('nomecli', response.nom);
            // setValue('end', reponse.end) VAI PRECISAR DE OUTRO GET
            setValue('contato', dataUser.name);
            // setValue('tel') PRECISO VERIFICAR ESSE CAMPO, SE VOU PEGAR DO CADASTRO DE USUÁRIOS OU SE TEM EM ALGUMA TABELA DE CHAMADOS OU DO CLIENTE

            console.log(response)

        } catch (error) {
            console.error(error);
        }



        // if (numserie.trim() === '') {
        //     toast({ position: 'top', title: "Atenção!", description: 'Informe uma série.', status: 'error', duration: 1500, isClosable: true, })
        //     return
        // }

        // try {

        //     const result = await api2.get('consulta?cserial=' + formChamado.serial);
        //     const equipamento = result.data.codequi[0]
        //     console.log(equipamento)

        //     const result2 = await api2.get('auxil_os?ccad=loja&ccliente=' + equipamento.codcli + '&cloja=' + equipamento.loja);
        //     const baseInstalada = result2.data.filiais[0]
        //     console.log(baseInstalada)

        //     if (!equipamento) {
        //         toast({ position: 'top', title: "", description: 'Verifique a série', status: 'info', duration: 1500, isClosable: true, })
        //         return
        //     }

        //     setFormChamado(prevState => ({
        //         ...prevState,
        //         model: equipamento.desc_pro,
        //         countPb: equipamento.a4pb, //NÃO ATUALIZAR ESSE CAMPO AO FAZER O GET (DEIXEI SÓ PARA VER O RESULTADO DA REQ)
        //         countCor: equipamento.a4cor, //NÃO ATUALIZAR ESSE CAMPO AO FAZER O GET (DEIXEI SÓ PARA VER O RESULTADO DA REQ)
        //         client: equipamento.nomcli,
        //         adress: baseInstalada.end,
        //         // officeHours: aa3

        //     }));


        // } catch (error) {

        //     if (error.response && error.response.status === 401) {

        //         toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 1500, isClosable: true, })
        //         router.push('/login')

        //     } else {
        //         toast({ position: 'top', title: "", description: 'Verifique a série.', status: 'info', duration: 1500, isClosable: true, })
        //     }
        // }
    }


    return (
        <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'100%'} transition='max-width 1s linear' p='30px'
            borderRadius={{ base: 0, md: '1rem' }} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} overflow='auto'
            sx={{ '&::-webkit-scrollbar': { display: 'none', 'msOverflowStyle': 'none', } }}
        >
            <Stack as='form' onSubmit={handleSubmit(handleSave)} gap={8} >

                <Button onClick={()=> chamandoCache({ codCli: '000201', loja:'01' })} >Chamar array</Button>

                <Box >
                    <Grid aria-label='boxGrid' justify='flex-end' templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8} >

                        <Controller
                            name='numserie'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInputBtn value={value} variant={'filled'} label={'Série do equipamento:'} placeholder={'Número de série'}
                                    onChange={(e) => onChange(e.target.value.trim().toUpperCase())} icon={<MdSearch title='Pesquisar' size='24px' maxLength={5}
                                        onClick={(e) => { e.preventDefault(); searchSerial(value) }} />} required={true} border='1px solid #c0c0c0' />
                            )}
                        />


                        <Controller
                            name='model'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <GridItem colSpan={{ base: 1, sm: 2 }} >
                                    <FormInput value={value} variant={'filled'} label={'Modelo:'} placeholder={'Modelo'} onChange={onChange} readOnly pointerEvents={'none'}
                                        tabIndex={'-1'} border='1px solid #c0c0c0' />
                                </GridItem>
                            )}
                        />


                        <Controller
                            name='acumulador'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput type='number' value={value} w={'100%'} variant={'filled'} label={'Contador:'} placeholder={'P/B'} onChange={onChange}
                                    required={false} border='1px solid #c0c0c0' />
                            )}
                        />

                        {/* <Flex align={'end'} gap={3}>
                            <FormInput name={'countPb'} type='number' value={formChamado.countPb} w={'100%'} variant={'filled'} label={'Contador:'} placeholder={'P/B'} onChange={handleSaveEdit} required={false} />
                            <FormInput name={'countCor'} type='number' value={formChamado.countCor} w={'100%'} variant={'filled'} placeholder={'COR'} onChange={handleSaveEdit} required={false} />
                        </Flex> */}




                        <Controller
                            name='horario'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Funcionamento:'} placeholder={'De 00:00 à 00:00 - seg à sex'} onChange={onChange}
                                    pointerEvents={'none'} tabIndex={'-1'} border='1px solid #c0c0c0' />
                            )}
                        />


                        <Controller
                            name='nomecli'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <GridItem colSpan={{ base: 1, sm: 2 }} >
                                    <FormInput value={value} variant={'filled'} label={'Cliente:'} placeholder={'Cliente'} onChange={onChange} pointerEvents={'none'}
                                        tabIndex={'-1'} border='1px solid #c0c0c0' />
                                </GridItem>
                            )}
                        />


                        <Controller
                            name='end'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Endereço:'} placeholder={'Endereço'} onChange={onChange} pointerEvents={'none'}
                                    tabIndex={'-1'} border='1px solid #c0c0c0' />
                            )}
                        />


                        <Controller
                            name='bairro'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Bairro:'} placeholder={'Bairro'} onChange={onChange} pointerEvents={'none'}
                                    tabIndex={'-1'} border='1px solid #c0c0c0' />
                            )}
                        />


                        <Controller
                            name='mun'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Cidade:'} placeholder={'Cidade'} onChange={onChange} pointerEvents={'none'}
                                    tabIndex={'-1'} border='1px solid #c0c0c0' />
                            )}
                        />


                        <Controller
                            name='est'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Estado:'} placeholder={'Estado'} onChange={onChange} pointerEvents={'none'}
                                    tabIndex={'-1'} border='1px solid #c0c0c0' />
                            )}
                        />


                        <Controller
                            name='contato'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Contato:'} placeholder={'Contato'} onChange={onChange} border='1px solid #c0c0c0' />
                            )}
                        />


                        <Controller
                            name='tel'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Telefone:'} placeholder={'(XX) XXXXX-XXXX'} onChange={onChange} pointerEvents={'none'}
                                    tabIndex={'-1'} border='1px solid #c0c0c0' />
                            )}
                        />


                        <Controller
                            name="incident"
                            control={control}
                            render={({ field }) => (
                                <Flex direction='column'>
                                    <Text pb={1} pl={2} fontSize={14} fontWeight={500}>Ocorrência:</Text>
                                    <Select {...field} variant='filled' placeholder='Ocorrência' border='1px solid #c0c0c0' fontSize={14}>
                                        {incident.map((desc) => (
                                            <option key={desc.cod} value={desc.cod}
                                                style={{ fontSize: 12, color: '#333', backgroundColor: '#f5f5f5', padding: '10px', border: '1px solid #ccc' }}>
                                                {desc.descricao}
                                            </option>
                                        ))}
                                    </Select>
                                </Flex>

                            )}
                        />


                    </Grid>
                </Box>


                <Controller
                    name='description'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Box pr={{ base: 0, lg: 8 }} >
                            <FormTextarea value={value} w={{ base: '100%', lg: '50%' }} h={{ base: '100%', lg: '200px' }} label={'Descrição:'} placeholder={'Digite aqui'} onChange={onChange} required={true} />
                        </Box>
                    )}
                />

                <Flex alignItems='flex-end' flexGrow={1} justify='flex-end' >
                    <Flex align='center' gap={3}>

                        <ButtonCancel onClick={() => router.push('/')} />
                        <FormButtonSave type={'submit'} />

                    </Flex>
                </Flex>

            </Stack >
        </Stack >

    )
}







export async function getStaticProps() {

    const getUrl = process.env.URL_OCORRENCIAS;

    if (!getUrl) {
        console.error("URL_OCORRENCIAS não está definida no arquivo .env.");
        return {
            props: {
                ocorrencias: [],
                error: "URL_OCORRENCIAS não está definida.",
            },
        };
    }

    try {
        const data = await fetch(getUrl);
        const equipamentos = await fetch

        if (!data.ok) {
            console.error(`Erro na requisição: ${data.status} ${data.statusText}`);
            return {
                props: {
                    ocorrencias: [],
                    error: `Erro na requisição: ${data.status} ${data.statusText}`,
                },
            };
        }

        const result = await data.json();

        return {
            props: {
                ocorrencias: result,
            },
            revalidate: 60 * 60 * 4,
        };

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return {
            props: {
                ocorrencias: [],
                error: error.message,
            },
        };
    }
}
