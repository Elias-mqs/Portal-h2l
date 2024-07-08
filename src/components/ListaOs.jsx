import { Flex, Stack } from "@chakra-ui/react"
import { IconButtonHeader } from '@/components'

export default function ListaOs({ arrowOs, isOpenOs, chamados, tecnico, formatarData }) {

    formatarData(chamados.emissao_os)

    let status = '';

    if (chamados.status_os === 'L') { status = 'Aberto' };
    if (chamados.status_os === 'T') { status = 'Em trânsito' };
    if (chamados.status_os === 'C') { status = 'No local' };
    if (chamados.status_os === 'I') { status = 'Em atendimento' };
    if (chamados.status_os === 'X') { status = 'Em verificação' };
    if (chamados.status_os === 'B') { status = 'Pendente de aprovação' };
    if (chamados.status_os === 'F') { status = 'Finalizado' };

    const handleDetalhes = () => {
        x = 12
    }

    return (
            // <Flex display={arrowOs && isOpenOs ? 'flex' : 'none'}>
            <Flex h='auto' maxH={arrowOs && isOpenOs ? '41px' : '0'} transition='all .5s ease' overflow='hidden' display={arrowOs ? 'flex' : 'none'} >
                <IconButtonHeader sizeModal='xl' labelBtn='detalhes' fontSize='sm' fontWeight={500} onClick={handleDetalhes} fontStyle='italic' hover={{ fontWeight: 700, color: '#000' }} />
                <Flex w='auto' bg='#C0C0C0' borderRadius='.5rem'>
                    <Flex name='ordemServico' w='80px' justify='center' borderLeft='2px solid #63636342' p='0 10px' align='center' borderLeftRadius='.5rem' >{chamados.num_os}</Flex>
                    <Flex name='chamado' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.chamado}</Flex>
                    <Flex name='status' w='150px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{status}</Flex>
                    <Flex name='serie' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.serie}</Flex>
                    <Flex name='ocorrencia' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.ocorencia}</Flex>
                    <Flex name='tecnico' w='190px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{tecnico}</Flex>
                    <Flex name='dataSolicitacao' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.data}</Flex>
                </Flex>
            </Flex>
    )
}