import { useEffect, useState } from "react";
import { useSearchCli } from "../context/ResearchesContext";
import { FormInput } from '@/components'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, Stack, Flex, Text, IconButton, Input } from "@chakra-ui/react";
import { MdSearch } from 'react-icons/md';


export default function SearchEmpresa({ setFormData, formData }) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { modal, handleSearch, nomeCli, setFilialCli } = useSearchCli();
    const [dados, setDados] = useState({ codCli: '', loja: '' });
    const [resultView, setResultView] = useState(false)


    const handleFormEdit = (e) => {
        let novaInfo = { ...dados };
        const { name, value } = e.target;

        if (name === 'codCli') {
            const newValue = value.replace(/\D/g, '');
            novaInfo.codCli = newValue;
        }
        if (name === 'loja') {
            novaInfo.loja = value.toUpperCase()
        }

        setDados(novaInfo)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSubmitting(true)
        setResultView(true)
        handleSearch(dados);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 800);

    };


    const handleClose = () => {
        setDados({ codCli: '', loja: '' });
        setFilialCli({ nome: '' })
        setResultView(false)
        modal.onClose();
    }


    const handleSelect = () => {
        setFormData({...formData, nomeCli: nomeCli})
        setDados({ codCli: '', loja: '' });
        setFilialCli({ nome: 'Cliente' })
        setResultView(false)
        modal.onClose();
    }


    const viewResults = resultView ? 'block' : 'none'


    return (
        <Modal isOpen={modal.isOpen} size='lg' onClose={handleClose} >
            <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            <ModalContent h='auto' maxH='98vh' overflow='auto' m='auto' >


                <Stack w='100%' h='100%' maxH='auto' bg="#EDF2FF" borderRadius={{ base: '0', md: "10px" }} boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px" }} transition={{ base: 'max-width 0.3s ease' }} >

                    <ModalCloseButton m={4} />
                    <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={3} >
                        <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Pesquisar Empresa</Text>
                    </Flex>

                    <Flex as='form' direction='column' onSubmit={handleSubmit}>
                        <Flex gap={5} justify='start'>

                            <FormInput name='codCli' w='35%' value={dados.codCli} maxLength='6' bg='#ffffff8d' variant='filled' border='1px solid #C0C0C0' label='Código Cliente:' placeholder='999999' onChange={handleFormEdit} />
                            <FormInput name='loja' w='35%' value={dados.loja} maxLength='2' bg='#ffffff8d' variant='filled' border='1px solid #C0C0C0' label='Código Loja:' placeholder='99' onChange={handleFormEdit} />
                            <IconButton marginTop='auto' type='submit' icon={<MdSearch size='24px' color='#FFF' />}
                                borderRadius='3rem' w='60px' bg='blue.400' _hover={{ bg: 'blue.500', transform: `translateY(-2px)` }} _active={{ transform: 'translateY(2px)' }} isDisabled={isSubmitting} />

                        </Flex>
                    </Flex>

                    <Stack mt='15px' display={viewResults} onClick={handleSelect} >
                        <Flex w='100%' h='auto' bg='#D1D9FF' borderRadius='.5rem' _hover={{ cursor: 'pointer' }} >
                            <Flex name='email' w='100%' p='10px' align='center' overflow='auto' ><Input variant='none' bg='transparent' value={nomeCli} readOnly={true} pointerEvents={'none'} tabIndex={'-1'} /></Flex>
                        </Flex>
                    </Stack>

                </Stack>


            </ModalContent>
        </Modal>
    )
}
