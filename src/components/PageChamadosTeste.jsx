import { Box, Stack, Input, Text, Flex, HStack, Grid, GridItem } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { FormInput, FormTextarea } from './FormInputs';

function PageChamadosTeste() {

    return (
        <Stack gap={8} >
            <Grid aria-label='boxGrid' templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8} >
                <FormInput variant={'filled'} border={'1px solid #C7CCD0'} label={'Nº de série do equipamento:'} placeholder={'Número de série'} required={true} />
                <FormInput variant={'filled'} border={'1px solid #C7CCD0'} label={'Modelo do equipamento:'} placeholder={'Modelo'} required={true} />
                <Flex align={'end'} gap={3}>
                    <FormInput w={'100%'} variant={'filled'} border={'1px solid #C7CCD0'} label={'Contador:'} placeholder={'P/B'} required={true} />
                    <FormInput w={'100%'} variant={'filled'} border={'1px solid #C7CCD0'} placeholder={'COR'} required={true} />
                </Flex>
                <FormInput variant={'filled'} border={'1px solid #C7CCD0'} label={'Cliente:'} placeholder={'Cliente'} required={true} />
                <FormInput variant={'filled'} border={'1px solid #C7CCD0'} label={'Endereço:'} placeholder={'Endereço'} required={true} />
                <FormInput variant={'filled'} border={'1px solid #C7CCD0'} label={'Horário de funcionamento:'} placeholder={'00:00 à 00:00'} required={true} />
                <FormInput variant={'filled'} border={'1px solid #C7CCD0'} label={'Solicitante:'} placeholder={'Solicitante'} required={true} />
                <FormInput variant={'filled'} border={'1px solid #C7CCD0'} label={'Setor:'} placeholder={'Setor'} required={true} />
                <FormInput variant={'filled'} border={'1px solid #C7CCD0'} label={'Telefone:'} placeholder={'(XX) XXXXX-XXXX'} required={true} />
                <FormInput variant={'filled'} border={'1px solid #C7CCD0'} label={'Ocorrência:'} placeholder={'Ocorrência'} required={true} />

            </Grid>
            <Box pr={{base: 0, md: 8}} >
                <FormTextarea w={{ base: '100%', lg: '50%' }} border={'1px solid #C7CCD0'} resize={'none'} label={'Descrição:'} placeholder={'Digite aqui'} required={true} />
            </Box>
        </Stack>
    )
}

export default PageChamadosTeste;