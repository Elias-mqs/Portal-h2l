import { FormInput, FormTextarea, FormInputBtn, FormButtonSave, ButtonCancel, cript } from '@/components';
import { Box, Stack, Flex, Grid, useToast, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { api, api2 } from '@/utils/api'
import { MdSearch } from 'react-icons/md';
import { userContext } from '@/context/UserContext';
import { useForm, Controller } from 'react-hook-form';
import { useSearchCli } from '@/context/ResearchesContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'



////////////////////////TERMINAR EDIÇÃO DOS SCHEMAS DO FORM CHAMADOS
const schema = z.object({
    numserie: z.coerce.string().max(50),
    email: z.coerce.string().email('Formato de e-mail inválido').min(3, 'Mínimo de caracteres não permitido'),
    nomeCli: z.coerce.string(),
    codCli: z.coerce.string(),
    loja: z.coerce.string(),
    setor: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
    username: z.coerce.string().min(3, 'Mínimo de 3 caracteres'),
})


function PageChamados() {


    const toast = useToast()
    const router = useRouter()
    const userDataContext = userContext()

    const { srcDataChamado } = useSearchCli()

    const { control, setValue, handleSubmit } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            numserie: '', model: '', acumulador: '', namecli: '', end: '', bairro: '', mun: '', est: '', horario: '',
            contato: '', setor: '', tel: '', incident: '', description: ''
        }
    })

    



    const handleSave = async (e) => {

        e.preventDefault();

        console.log('Enviou o formulário!');

    }





    const searchSerial = async (serialNumber) => {
        console.log(serialNumber);

        const response = await srcDataChamado(serialNumber);

        setValue('numserie', response.numser);
        setValue('model', response.desc_pro);
        setValue('acumulador', response.acumul);

        console.log(response)

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

                <Box >
                    <Grid aria-label='boxGrid' justify='flex-end' templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8} >

                        <Controller
                            name='numserie'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInputBtn value={value} variant={'filled'} label={'Série do equipamento:'} placeholder={'Número de série'}
                                    onChange={(e) => onChange(e.target.value.trim().toUpperCase())} icon={<MdSearch title='Pesquisar' size='24px' maxLenght={5}
                                        onClick={(e) => { e.preventDefault(); searchSerial(value) }} />} required={true} />
                            )}
                        />

                        <Controller
                            name='model'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Modelo:'} placeholder={'Modelo'} onChange={onChange} readOnly pointerEvents={'none'} tabIndex={'-1'} />
                            )}
                        />

                        <Controller
                            name='acumulador'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput type='number' value={value} w={'100%'} variant={'filled'} label={'Contador:'} placeholder={'P/B'} onChange={onChange} required={false} />
                            )}
                        />

                        {/* <Flex align={'end'} gap={3}>
                            <FormInput name={'countPb'} type='number' value={formChamado.countPb} w={'100%'} variant={'filled'} label={'Contador:'} placeholder={'P/B'} onChange={handleSaveEdit} required={false} />
                            <FormInput name={'countCor'} type='number' value={formChamado.countCor} w={'100%'} variant={'filled'} placeholder={'COR'} onChange={handleSaveEdit} required={false} />
                        </Flex> */}


                        <Controller
                            name='nomecli'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Cliente:'} placeholder={'Cliente'} onChange={onChange} pointerEvents={'none'} tabIndex={'-1'} />
                            )}
                        />

                        <Controller
                            name='end'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Endereço:'} placeholder={'Endereço'} onChange={onChange} pointerEvents={'none'} tabIndex={'-1'} />
                            )}
                        />


                        <Controller
                            name='bairro'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Bairro:'} placeholder={'Bairro'} onChange={onChange} pointerEvents={'none'} tabIndex={'-1'} />
                            )}
                        />


                        <Controller
                            name='mun'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Cidade:'} placeholder={'Cidade'} onChange={onChange} pointerEvents={'none'} tabIndex={'-1'} />
                            )}
                        />


                        <Controller
                            name='est'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Estado:'} placeholder={'Estado'} onChange={onChange} pointerEvents={'none'} tabIndex={'-1'} />
                            )}
                        />


                        <Controller
                            name='horario'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Funcionamento:'} placeholder={'De 00:00 à 00:00 - seg à sex'} onChange={onChange} pointerEvents={'none'} tabIndex={'-1'} />
                            )}
                        />

                        <Controller
                            name='contato'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Contato:'} placeholder={'Contato'} onChange={onChange} />
                            )}
                        />

                        <Controller
                            name='setor'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Setor:'} placeholder={'Setor'} onChange={onChange} pointerEvents={'none'} tabIndex={'-1'} />
                            )}
                        />

                        <Controller
                            name='tel'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Telefone:'} placeholder={'(XX) XXXXX-XXXX'} onChange={onChange} pointerEvents={'none'} tabIndex={'-1'} />
                            )}
                        />

                        <Controller
                            name='incident'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormInput value={value} variant={'filled'} label={'Ocorrência:'} placeholder={'Ocorrência'} onChange={onChange} required={true} />
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

export default PageChamados;