import { Box, Stack, Flex, Grid, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { FormInput, FormTextarea, FormInputBtn, FormButtonSave, ButtonCancel, decript, cript } from '.';
import { useState, useEffect } from 'react';
import api from '../utils/api'
import { MdSearch } from 'react-icons/md';


function PageChamados() {

    const toast = useToast()
    const router = useRouter()
    const [infoUser, setInfoUser] = useState({ info: '' })
    const [formChamado, setFormChamado] = useState({
        serial: '', model: '', countPb: '', countCor: '', client: '', adress: '', officeHours: '', requester: '', sector: '', tel: '', incident: '', description: '', data: '', hora: ''
    })

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
        let formChamadoInfo = { ...formChamado, info: infoUser.info }
        const formCript = cript(formChamadoInfo)
        try {
            const result = await api.post('chamados', formCript)

            setFormChamado({ serial: '', model: '', countPb: '', countCor: '', client: '', adress: '', officeHours: '', requester: '', sector: '', tel: '', incident: '', description: '', data:'', hora:'' })
            setInfoUser({ info: '' })
            toast({ position: 'top', title: "Sucesso!", description: result?.data?.message, status: 'success', duration: 2000, isClosable: true, })

        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 401) {
                toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 2000, isClosable: true, })
                router.push('/login')
            } else {
                toast({ position: 'top', title: "Erro!", description: error.message, status: 'error', duration: 2000, isClosable: true, })
            }
        }
    }

    const searchSerial = async (e) => {
        e.preventDefault()

        if(formChamado.serial.trim() === ''){
            toast({ position: 'top', title: "Atenção!", description: 'Informe uma série.', status: 'error', duration: 1500, isClosable: true, })
            return
        }

        let formSerialInfo = { serial: formChamado.serial, search: true }
        const formCript = cript(formSerialInfo)

        try {
            const result = await api.post('chamados', formCript);

            if (!result || !result.data || !result.data.dados) {
                throw new Error('Dados não encontrados.')
            }

            setFormChamado(prevState => ({
                ...prevState,
                model: result.data.dados.equip_modelo,
                countPb: result.data.dados.equip_contador_pb,
                countCor: result.data.dados.equip_contador_cor
            }));

        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast({ position: 'top', title: "Erro!", description: error?.response?.data?.message, status: 'error', duration: 1500, isClosable: true, })
                router.push('/login')
            } else {
                toast({ position: 'top', title: "", description: 'Erro', status: 'error', duration: 1500, isClosable: true, })
            }
        }
    }


    return (
        <Stack as='form' onSubmit={handleSave} gap={8} >
            <Box >
                <Grid aria-label='boxGrid' justify='flex-end' templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8} >
                    <FormInputBtn name={'serial'} value={formChamado.serial} variant={'filled'} label={'Série do equipamento:'} placeholder={'Número de série'} onChange={handleSaveEdit} icon={<MdSearch title='Pesquisar' size='24px' onClick={searchSerial} />} required={true} />
                    <FormInput name={'model'} value={formChamado.model} variant={'filled'} label={'Modelo:'} placeholder={'Modelo'} onChange={handleSaveEdit} pointerEvents={'none'} tabIndex={'-1'} />

                    <Flex align={'end'} gap={3}>
                        <FormInput name={'countPb'} type='number' value={formChamado.countPb} w={'100%'} variant={'filled'} label={'Contador:'} placeholder={'P/B'} onChange={handleSaveEdit} required={false} />
                        <FormInput name={'countCor'} type='number' value={formChamado.countCor} w={'100%'} variant={'filled'} placeholder={'COR'} onChange={handleSaveEdit} required={false} />
                    </Flex>

                    <FormInput name={'client'} value={formChamado.client} variant={'filled'} label={'Cliente:'} placeholder={'Cliente'} onChange={handleSaveEdit} pointerEvents={'none'} tabIndex={'-1'} />
                    <FormInput name={'adress'} value={formChamado.adress} variant={'filled'} label={'Endereço:'} placeholder={'Endereço'} onChange={handleSaveEdit} pointerEvents={'none'} tabIndex={'-1'} />
                    <FormInput name={'officeHours'} value={formChamado.officeHours} variant={'filled'} label={'Funcionamento:'} placeholder={'De 00:00 à 00:00 - seg à sex'} onChange={handleSaveEdit} pointerEvents={'none'} tabIndex={'-1'} />
                    <FormInput name={'requester'} value={formChamado.requester} variant={'filled'} label={'Solicitante:'} placeholder={'Solicitante'} onChange={handleSaveEdit} />
                    <FormInput name={'sector'} value={formChamado.sector} variant={'filled'} label={'Setor:'} placeholder={'Setor'} onChange={handleSaveEdit} pointerEvents={'none'} tabIndex={'-1'} />
                    <FormInput name={'tel'} value={formChamado.tel} variant={'filled'} label={'Telefone:'} placeholder={'(XX) XXXXX-XXXX'} onChange={handleSaveEdit} pointerEvents={'none'} tabIndex={'-1'} />
                    <FormInput name={'incident'} value={formChamado.incident} variant={'filled'} label={'Ocorrência:'} placeholder={'Ocorrência'} onChange={handleSaveEdit} required={true} />
                </Grid>
            </Box>
            <Box pr={{ base: 0, lg: 8 }} >
                <FormTextarea name={'description'} value={formChamado.description} w={{ base: '100%', lg: '50%' }} h={{ base: '100%', lg: '200px' }} label={'Descrição:'} placeholder={'Digite aqui'} onChange={handleSaveEdit} required={true} />
            </Box>

            <Flex alignItems='flex-end' flexGrow={1} justify='flex-end' >
                <Flex align='center' gap={3}>
                    <ButtonCancel onClick={() => router.push('/')} />
                    <FormButtonSave type={'submit'} />
                </Flex>
            </Flex>

        </Stack >
    )
}

export default PageChamados;