import { Box, Stack, Input, Text, Flex, HStack, Grid } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { FormInput } from './FormInputs';

function PageChamadosTeste() {

    return (
            <Stack >
                <Grid aria-label='boxGrid' templateColumns={{base: 'repeat(1, 1fr)',sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)'}} gap={3} >
                    <FormInput variant={'filled'} label={'Nº de série do equipamento:'} placeholder={'Número de série'} required={true} />
                    <FormInput variant={'filled'} label={'Modelo do equipamento:'} placeholder={'Modelo'} required={true} />
                    <FormInput variant={'filled'} label={'Contador P/B:'} placeholder={'Contador P/B'} required={true} />
                    <FormInput variant={'filled'} label={'Contador Cor:'} placeholder={'Contador COR'} required={true} />
                    <FormInput variant={'filled'} label={'Cliente:'} placeholder={'Cliente'} required={true} />
                    <FormInput variant={'filled'} label={'Endereço:'} placeholder={'Endereço'} required={true} />
                    <FormInput variant={'filled'} label={'Horário de funcionamento:'} placeholder={'00:00 à 00:00'} required={true} />
                    <FormInput variant={'filled'} label={'Solicitante:'} placeholder={'Solicitante'} required={true} />
                    <FormInput variant={'filled'} label={'Setor:'} placeholder={'Setor'} required={true} />
                    <FormInput variant={'filled'} label={'Telefone:'} placeholder={'(XX) XXXXX-XXXX'} required={true} />
                    <FormInput variant={'filled'} label={'Ocorrência:'} placeholder={'Ocorrência'} required={true} />
                </Grid>
            </Stack>
    )
}

export default PageChamadosTeste;