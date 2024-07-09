import { Badge, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import { IconButtonHeader, ListaOs, DetailsChamado } from '@/components'
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdRemove } from 'react-icons/md';
import { useState } from 'react';

export default function ListaChamado({ chamados }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [openArrow, setOpenArrow] = useState(false)

    ////////////////// DEFININDO TIPOS DE STATUS RETORNADOS PELA API //////////////////
    let status = '';
    if (chamados.status_cham === 'A') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="cyan"   >Aberto                </Badge>; }
    if (chamados.status_cham === 'E') { status = <Badge p='2px 10px' borderRadius='.5rem' colorScheme="green"  >Fechado               </Badge>; }


    ////////////////// DEFININDO VARIAVEL PARA TENICO POIS HÁ ERRO DE DIGITAÇÃO NA API //////////////////
    let tecnico = chamados['nome_ tec'];


    ////////////////// FORMATANDO DATA //////////////////
    const formatarData = (data) => {
        const ano = data.slice(0, 4);
        const mes = data.slice(4, 6);
        const dia = data.slice(6, 8);
        return `${dia}/${mes}/${ano}`;
    }
    const dataFormatada = formatarData(chamados.emissao_cham);


    ////////////////// CONTROLE DA SETA PARA ABRIR E FECHAR DETALHES DE OS //////////////////
    const handleClick = () => {
        setOpenArrow(!openArrow)
    }
    const isOpenArrow = openArrow ? <MdOutlineKeyboardArrowUp size='24px' /> : <MdKeyboardArrowDown size='24px' />


    const handleDetalhes = () => {
        onOpen();
    }

    return (
        <>
            <Stack gap={.5}>
                <Flex>

                    {!chamados.num_os &&
                        <Flex h='41px'  >
                            <IconButtonHeader sizeModal='5xl' labelBtn='detalhes' fontSize='sm' fontWeight={500} onOpen={handleDetalhes} isOpen={isOpen} onClose={onClose}
                                fontStyle='italic' hover={{ fontWeight: 700, color: '#000' }} conteudo={<DetailsChamado chamados={chamados} />} />
                        </Flex>
                    }
                    <Flex w='auto' h='48px' bg='#D1D9FF' borderRadius='.5rem' ml={!chamados.num_os ? 0 : '85px'} >

                        {/* adicionar um && !chamados.status_os === 'F' && !chamados.status_cham === 'E' */}
                        {chamados.num_os &&
                            <Flex w='80px' onClick={handleClick} justify='center' borderLeft='2px solid #63636342' p='0 10px' align='center' borderLeftRadius='.5rem'
                                _hover={{ cursor: 'pointer' }} >{isOpenArrow}</Flex>
                        }
                        {!chamados.num_os &&
                            <Flex w='80px' justify='center' borderLeft='2px solid #63636342' p='0 10px' align='center' borderLeftRadius='.5rem' ><MdRemove /></Flex>
                        }

                        <Flex w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.chamado}       </Flex>
                        <Flex w='150px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{status}                 </Flex>
                        <Flex w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.serial}        </Flex>
                        <Flex w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.motivo_cham}   </Flex>
                        <Flex w='190px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.Atendente_ab1} </Flex>
                        <Flex w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{dataFormatada}          </Flex>
                        
                    </Flex>

                </Flex>
                
                <ListaOs chamados={chamados} formatarData={formatarData} tecnico={tecnico} openOs={openArrow} />
            </Stack>
        </>
    );
}