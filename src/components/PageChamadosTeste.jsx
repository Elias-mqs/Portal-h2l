import { Box, Stack, Flex, Grid, GridItem, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { FormInput, FormTextarea } from './FormInputs';
import { FormButtonSave, ButtonCancel } from './FormButton';
import { useState } from 'react';
import api from '../utils/api'
// INICIAR CRIAÇÃO DE COMUNICAÇÃO ....handleSave, API...
function PageChamadosTeste() {

    const toast = useToast()
    const router = useRouter()
    const [formChamado, setFormChamado] = useState({
        serial: '', model: '', countPb: '', countCor: '', client: '', adress: '', officeHours: '', requester: '', sector: '', tel: '', incident: '', description: ''
    })

    const handleSaveEdit = (e) => {
        let novosDados = { ...formChamado };

        novosDados[e.target.name] = e.target.value
        if (e.target.name === 'serial') {
            novosDados.serial = e.target.value.toUpperCase().trim()
        }
        setFormChamado(novosDados);

    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            const result = await api.post('chamados', formChamado)
            const token = result?.data?.token;
            localStorage.setItem('token', token)

            setFormChamado({ serial: '', model: '', countPb: '', countCor: '', client: '', adress: '', officeHours: '', requester: '', sector: '', tel: '', incident: '', description: '' })

            toast({
                title: "Sucesso!",
                description: result?.data?.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

        } catch (error) {
            console.log(error)
            toast({
                title: "Erro!",
                description: error?.response?.data?.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    return (
        <Stack as='form' onSubmit={handleSave} gap={8} >
            <Box h='auto' >
                <Grid aria-label='boxGrid' templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8} >
                    <FormInput name={'serial'} value={formChamado.serial} variant={'filled'} border={'1px solid #C7CCD0'} label={'Nº de série do equipamento:'} placeholder={'Número de série'} onChange={handleSaveEdit} required={true} />
                    <FormInput name={'model'} value={formChamado.model} variant={'filled'} border={'1px solid #C7CCD0'} label={'Modelo do equipamento:'} placeholder={'Modelo'} onChange={handleSaveEdit} required={true} />
                    <Flex align={'end'} gap={3}>
                        <FormInput name={'countPb'} type='number' value={formChamado.countPb} w={'100%'} variant={'filled'} border={'1px solid #C7CCD0'} label={'Contador:'} placeholder={'P/B'} onChange={handleSaveEdit} required={true} />
                        <FormInput name={'countCor'} type='number' value={formChamado.countCor} w={'100%'} variant={'filled'} border={'1px solid #C7CCD0'} placeholder={'COR'} onChange={handleSaveEdit} required={false} />
                    </Flex>
                    <FormInput name={'client'} value={formChamado.client} variant={'filled'} border={'1px solid #C7CCD0'} label={'Cliente:'} placeholder={'Cliente'} onChange={handleSaveEdit} required={true} />
                    <FormInput name={'adress'} value={formChamado.adress} variant={'filled'} border={'1px solid #C7CCD0'} label={'Endereço:'} placeholder={'Endereço'} onChange={handleSaveEdit} required={true} />
                    <FormInput name={'officeHours'} value={formChamado.officeHours} variant={'filled'} border={'1px solid #C7CCD0'} label={'Horário de funcionamento:'} placeholder={'De 00:00 à 00:00 - seg à sex'} onChange={handleSaveEdit} required={true} />
                    <FormInput name={'requester'} value={formChamado.requester} variant={'filled'} border={'1px solid #C7CCD0'} label={'Solicitante:'} placeholder={'Solicitante'} onChange={handleSaveEdit} required={true} />
                    <FormInput name={'sector'} value={formChamado.sector} variant={'filled'} border={'1px solid #C7CCD0'} label={'Setor:'} placeholder={'Setor'} onChange={handleSaveEdit} required={true} />
                    <FormInput name={'tel'} value={formChamado.tel} variant={'filled'} border={'1px solid #C7CCD0'} label={'Telefone:'} placeholder={'(XX) XXXXX-XXXX'} onChange={handleSaveEdit} required={true} />
                    <FormInput name={'incident'} value={formChamado.incident} variant={'filled'} border={'1px solid #C7CCD0'} label={'Ocorrência:'} placeholder={'Ocorrência'} onChange={handleSaveEdit} required={true} />
                </Grid>
            </Box>
            <Box pr={{ base: 0, lg: 8 }} >
                <FormTextarea name={'description'} value={formChamado.description} w={{ base: '100%', lg: '50%' }} border={'1px solid #C7CCD0'} label={'Descrição:'} placeholder={'Digite aqui'} onChange={handleSaveEdit} required={true} />
            </Box>

            <Flex alignItems='center' justify='flex-end' gap={3}>
                <ButtonCancel onClick={() => router.push('/')} />
                <FormButtonSave type={'submit'} />
            </Flex>

        </Stack >
    )
}

export default PageChamadosTeste;