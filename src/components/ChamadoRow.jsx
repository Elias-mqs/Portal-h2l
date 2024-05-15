import { Flex } from '@chakra-ui/react'
import { IconButtonHeader } from '@/components'
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdRemove } from 'react-icons/md';
import { useState, useEffect } from 'react';

export default function ChamadoRow({ chamados, searchChamado, setSearchChamado }) {

    const [arrowOs, setArrowOs] = useState(false)
    const [openArrow, setOpenArrow] = useState(false)

    useEffect(() => {
        if (chamados.os === 1) {
            setArrowOs(true)
        }
    }, [chamados.os]);

    const handleClick = () => {
        setOpenArrow(!openArrow)
    }

    const isOpenArrow = openArrow ? <MdOutlineKeyboardArrowUp size='24px' /> : <MdKeyboardArrowDown size='24px' />

    return (
        <>
            <Flex>
                <IconButtonHeader sizeModal='xl' labelBtn='detalhes' fontSize='sm' fontWeight={500} fontStyle='italic' hover={{ fontWeight: 700, color: '#000' }} />
                <Flex w='auto' bg='#D1D9FF' borderRadius='.5rem' >
                    <Flex name='ordemServico' w='80px' onClick={handleClick} justify='center' borderLeft='2px solid #63636342' p='0 10px' align='center' borderLeftRadius='.5rem' display={arrowOs ? 'flex' : 'none'} >{isOpenArrow}</Flex>
                    <Flex name='ordemServico' w='80px' justify='center' borderLeft='2px solid #63636342' p='0 10px' align='center' borderLeftRadius='.5rem' display={arrowOs ? 'none' : 'flex'} ><MdRemove /></Flex>
                    <Flex name='chamado' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.chamado}</Flex>
                    <Flex name='status' w='150px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.status}</Flex>
                    <Flex name='serie' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.serie}</Flex>
                    <Flex name='ocorrencia' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.ocorencia}</Flex>
                    <Flex name='tecnico' w='190px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.tecnico}</Flex>
                    <Flex name='dataSolicitacao' w='175px' justify='center' borderLeft='1px solid #636363a9' p='0 10px' align='center' >{chamados.data}</Flex>
                </Flex>
            </Flex>
        </>
    );
}