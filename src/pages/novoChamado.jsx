import { FormInput, FormTextarea, FormInputBtn, FormButtonSave, ButtonCancel, cript } from '@/components';
import { Box, Stack, Flex, Grid, useToast, GridItem, Text, Select, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdSearch } from 'react-icons/md';
import { userContext } from '@/context/UserContext';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createEquipQuery } from '@/services/dataSearch/srcEquip';
import { useState } from 'react';
import { api } from '@/utils/api';




const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const schema = z.object({
    numserie: z.coerce.string().max(50),
    model: z.coerce.string(),
    acumulador: z.coerce.string().min(2, 'Valor mínimo: 2'), // FALAR COM ADOLFO PARA TER CERTEZA DE QUAL VALOR MINIMO EU DEVO COLOCAR, SE POSSIVEL COLOCAR MAIS QUE 10
    nomecli: z.coerce.string(),
    end: z.coerce.string(),
    bairro: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    mun: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    est: z.coerce.string().min(2).max(2),
    hini: z.coerce.string(),
    hfim: z.coerce.string(),
    contato: z.coerce.string().max(50).transform((val) => removeAccents(val).toUpperCase()),
    tel: z.coerce.string().max(13),
    incident: z.coerce.string(),
    description: z.coerce.string().transform((val) => removeAccents(val).toUpperCase()),
    atend: z.coerce.string().transform((val) => removeAccents(val).toUpperCase()),
    memo: z.coerce.string().transform((val) => removeAccents(val).toUpperCase()),
    codProd: z.coerce.string()
})


export default function PageChamados({ pageProps: { ocorrencias } }) {


    const toast = useToast();
    const router = useRouter();

    //////// CARREGANDO E ORDENANDO LISTA DE OCORRENCIAS
    const incident = ocorrencias.ocorrencias.sort((a, b) =>
        a.descricao.toLowerCase() > b.descricao.toLowerCase() ? 1 : a.descricao.toLowerCase() < b.descricao.toLowerCase() ? -1 : 0
    );

    //////// CARREGANDO DADOS DO USUÁRIO
    const { data: { data: { [0]: [dataUser] } } } = userContext();

    //////// BUSCANDO EQUIPAMENTOS AO CARREGAR A PÁGINA (ESTÁ CACHEANDO) (API ESTÁ COM DELAY DE 2s)
    const { data } = createEquipQuery({ codCli: dataUser.codCli, loja: dataUser.loja }) || {};
    const equipamentos = data?.produtos || [];
    console.log(equipamentos)

    //////// SETA CONTADOR NO PLACEHOLDER E AUXILIA NA VALIDAÇÃO DE ENVIO DO FORMULARIO
    const [acumulPlaceholder, setAcumulPlaceholder] = useState('');

    //////// PREPARA FORMULARIO PARA PREENCHIMENTO
    const { control, setValue, handleSubmit, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            numserie: '', model: '', acumulador: '', nomecli: '', end: '', bairro: '', mun: '', est: '', hini: '', hfim: '',
            contato: '', tel: '', incident: '', description: '', atend: `AUTOATEND - ${dataUser.name}`, memo: '', codProd: ''
        }
    })




    //////////// ABRIR NOVO CHAMADO
    const handleSave = async (data) => {

        console.log(data)

        if (!data) {
            toast({ position: 'top', title: "Atenção", description: 'Verifique os campos e tente novamente.', status: 'info', duration: 1500, isClosable: true, });
            return;
        }


        ///////// INICIANDO LOGICA PARA VALIDAÇÃO DE CONTADORES /////////
        const acumuladorValue = Number(data.acumulador);
        const acumulPlaceholderValue = Number(acumulPlaceholder);

        if (isNaN(acumuladorValue) || isNaN(acumulPlaceholderValue)) {
            toast({ position: 'top', title: "Atenção", description: 'Valores inválidos.', status: 'info', duration: 1500, isClosable: true });
            return;
        }

        if (acumuladorValue <= acumulPlaceholderValue) {
            toast({ position: 'top', title: "Atenção", description: 'Contador menor que o permitido.', status: 'info', duration: 1500, isClosable: true });
            return;
        }
        //////////////////// FIM DA LÓGICA ////////////////////


        // MONTANDO CAMPO DE COMENTÁRIO DO TOTVS (ESSE CAMPO É TRANSFORMADO EM 6 CARAC. NO BANCO, POR ISSO PRECISA MONTAR)
        const memo = `Funcionamento das ${data.hini} as ${data.hfim} => ${data.description}`;

        const dataCrypt = cript({ ...data, codCli: dataUser.codCli, loja: dataUser.loja, memo: memo });
        

        try {

            const result = await api.post('abrirChamado', dataCrypt)

            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

            reset();
            setAcumulPlaceholder('');

        } catch (error) {
            toast({ position: 'top', title: "Atenção", description: 'Tente novamente ou contate um administrador.', status: 'info', duration: 2000, isClosable: true, })
        }

    }



    ////////// PREENCHER DADOS AO BUSCAR SERIE
    const searchSerial = async (serialNumber) => {

        if (!serialNumber) {
            toast({ position: 'top', title: "", description: 'Informe um número de série', status: 'info', duration: 1500, isClosable: true, });
            return;
        }

        if (equipamentos) {
            const findEquip = equipamentos.find(equip => equip.s === serialNumber);
            if (!findEquip) {
                toast({ position: 'top', title: "", description: 'Verifique o número de série', status: 'info', duration: 2000, isClosable: true, });
                return;
            }
            console.log(findEquip)
            setValue('model', findEquip.p);
            setValue('nomecli', findEquip.nom);
            setValue('end', findEquip.edr);
            setValue('bairro', findEquip.bai);
            setValue('mun', findEquip.mun);
            setValue('est', findEquip.est);
            setValue('codProd', findEquip.c);
            setValue('contato', dataUser.name);
            setAcumulPlaceholder(findEquip.ac);

        }

    }

    console.log('renderizando')
    

    return (
        <Stack aria-label='container-main' bg='#FFF' w='100%' maxW={'100%'} h={'100%'} transition='max-width 1s linear' p='30px'
            borderRadius={{ base: 0, md: '1rem' }} boxShadow={{ base: 'none', md: 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2)' }} overflow='auto'
            sx={{ '&::-webkit-scrollbar': { display: 'none', 'msOverflowStyle': 'none', } }}
        >
            <Stack as='form' onSubmit={handleSubmit(handleSave)} gap={8} >

                <Box >
                    <Grid aria-label='boxGrid' justify='flex-end' templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8} >

                        <Controller
                            name='numserie'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInputBtn value={value} variant={'outline'} label={'Série do equipamento:'} placeholder={'Número de série'}
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



                        {/* VER COM MARCELO O QUE QUE ELE ACHA DE SETAR O ACUMULADOR ATUAL NO PLACEHOLDER */}
                        <Controller
                            name='acumulador'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput type='number' value={value} w={'100%'} variant={'outline'} label={'Contador:'} placeholder={!acumulPlaceholder ? '99999' : acumulPlaceholder}
                                    onChange={onChange} required={false} border='1px solid #c0c0c0' />
                            )}
                        />


                        <Flex direction='column'>
                            <Text pb={1} pl={2} fontWeight={500} fontSize={14}>Funcionamento:</Text>
                            <Flex>

                                <Text pr={2} m='auto' fontWeight={500} fontSize={14}>De:</Text>

                                <Controller
                                    name='hini'
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input type='time' onChange={onChange} value={value || ''} step={300} variant='outline' border='1px solid #c0c0c0' required={true} />
                                    )}
                                />

                                <Text pr={2} pl={2} m='auto' fontWeight={500} fontSize={14}>às:</Text>
                                <Controller
                                    name='hfim'
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input type='time' onChange={onChange} value={value || ''} step={300} variant='outline' border='1px solid #c0c0c0' required={true} />
                                    )}
                                />
                            </Flex>
                        </Flex>


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
                                <FormInput value={value} variant={'outline'} label={'Contato:'} placeholder={'Contato'} onChange={onChange} border='1px solid #c0c0c0' />
                            )}
                        /> 


                        {/* ESSE CAMPO DEVE SER OBRIGATÓRIO E PRECISO DAR UM JEITO DE O USUÁRIO CONSEGUIR DIGITAR SOMENTE O NÚMERO E JÁ FICAR FORMATADO */}
                        <Controller
                            name='tel'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} type='tel' variant={'outline'} label={'Telefone:'} placeholder={'(XX) XXXX-XXXX'} onChange={onChange}
                                    border='1px solid #c0c0c0' required={true} />
                            )}
                        />


                        <Controller
                            name="incident"
                            control={control}
                            render={({ field }) => (
                                <Flex direction='column'>
                                    <Text pb={1} pl={2} fontSize={14} fontWeight={500}>Ocorrência:</Text>
                                    <Select {...field} variant='outline' placeholder='Ocorrência' border='1px solid #c0c0c0' fontSize={14} required={true} >
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
                            <FormTextarea value={value} w={{ base: '100%', lg: '50%' }} h={{ base: '100%', lg: '200px' }} label={'Descrição:'} placeholder={'Digite aqui'}
                                onChange={onChange} required={true} />
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






///////  REQUISIÇÃO É "REALIZADA" SEMPRE QUE O COMPONENTE CARREGA
///////  O METHODO É HEAD E NÃO GET (BUSCA SE TEM ALTERAÇÃO, SE NÃO TIVER NÃO REFAZ A REQUISIÇÃO)
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
