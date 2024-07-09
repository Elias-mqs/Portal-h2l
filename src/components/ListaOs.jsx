import { Badge, Collapse, Flex, useDisclosure } from "@chakra-ui/react";
import { IconButtonHeader, DetailsOs } from '@/components';

export default function ListaOs({ openOs, chamados, tecnico, formatarData }) {

    const { isOpen, onOpen, onClose } = useDisclosure()


    ////////////////// FORMATANDO DATA //////////////////
    const dataOs = formatarData(chamados.emissao_os)


    ////////////////// DEFININDO TIPOS DE STATUS RETORNADOS PELA API //////////////////
    let status = '';
    if (chamados.status_os === 'L') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="blue"   >Aberto                </Badge>; }
    if (chamados.status_os === 'T') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="yellow" >Em trânsito           </Badge>; }
    if (chamados.status_os === 'C') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="orange" >No local              </Badge>; }
    if (chamados.status_os === 'I') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="purple" >Em atendimento        </Badge>; }
    if (chamados.status_os === 'X') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="pink"   >Em verificação        </Badge>; }
    if (chamados.status_os === 'B') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="red"    >Pendente de aprovação </Badge>; }
    if (chamados.status_os === 'F') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="green"  >Fechado               </Badge>; }


    const handleDetalhes = () => {
        onOpen();
    }
    

    return (
        <Collapse in={openOs} animateOpacity>
            <Flex h='auto' maxH='45px' >
                <IconButtonHeader sizeModal='6xl' labelBtn='detalhes' fontSize='sm' fontWeight={500} onOpen={handleDetalhes} isOpen={isOpen} onClose={onClose}
                    fontStyle='italic' hover={{ fontWeight: 700, color: '#000' }} conteudo={<DetailsOs chamados={chamados} />} />
                <Flex w='auto' bg='#d0d0d0' borderRadius='.5rem'>
                    <Flex name='ordemServico' w='80px' justify='center' borderLeft='2px solid #63636342' p='0 10px' align='center' borderLeftRadius='.5rem' >{chamados.num_os}</Flex>
                    <Flex name='chamado' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.chamado}</Flex>
                    <Flex name='status' w='150px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{status}</Flex>
                    <Flex name='serie' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.serial}</Flex>
                    <Flex name='ocorrencia' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.motivo_cham}</Flex>
                    <Flex name='tecnico' w='190px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{tecnico}</Flex>
                    <Flex name='dataSolicitacao' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{dataOs}</Flex>
                </Flex>
            </Flex>
        </Collapse>
    )
}


