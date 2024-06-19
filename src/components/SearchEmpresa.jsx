import { useState } from "react";
import { useSearchCli } from "../context/ResearchesContext";
import { FormInput } from '@/components';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, Stack, Flex, Text, IconButton, Input } from "@chakra-ui/react";
import { MdSearch } from 'react-icons/md';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const schema = z.object({
    codCli: z.coerce.string().max(6, 'máximo de 6 digitos'),
    loja: z.coerce.string().max(2)
})

export default function SearchEmpresa({ setValue }) {


    const [dataCliente, setDataCliente] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            codCli: '',
            loja: '',
        }
    })

    const { modal, handleSearch } = useSearchCli();



    const handleSubmitForm = async (data) => {

        setIsSubmitting(true);

        if (data.codCli === '' || data.loja === '') {
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1000);
            return
        }

        const result = await handleSearch(data);

        setDataCliente(result);

        setTimeout(() => {
            setIsSubmitting(false);
        }, 1000);

    };



    const stopPropagation = (e) => {
        e.stopPropagation();
        handleSubmit(handleSubmitForm)(e);
    }



    const handleSelect = () => {

        setValue(dataCliente);

        modal.onClose();

    }




    return (
        <Modal isOpen={modal.isOpen} size='lg' onClose={modal.onClose} >
            <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            <ModalContent h='auto' maxH='98vh' overflow='auto' m='auto' >


                <Stack w='100%' h='100%' maxH='auto' bg="#EDF2FF" borderRadius={{ base: '0', md: "10px" }} boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px" }} transition={{ base: 'max-width 0.3s ease' }} >

                    <ModalCloseButton m={4} />
                    <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={3} >
                        <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Pesquisar Empresa</Text>
                    </Flex>

                    <Flex direction='column'>

                        <Flex as='form' onSubmit={stopPropagation} gap={5} justify='start'>

                            <Flex w='35%' direction='column' mb='auto'>

                                <Controller
                                    name='codCli'
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <FormInput w='100%' type='number' value={value} maxLength='6' bg='#ffffff8d' variant='filled' border='1px solid #C0C0C0' label='Código Cliente:'
                                            placeholder='999999' onChange={(e) => onChange(e.target.value.trim().slice(0, 6))} isInvalid={errors.codCli} />
                                    )}
                                />
                                {errors.codCli && <Text color='red' pt={1} pl={2}>{errors.codCli.message}</Text>}
                            </Flex>

                            <Flex w='35%' direction='column' mb='auto'>
                                <Controller
                                    name='loja'
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <FormInput w='100%' value={value} maxLength='2' bg='#ffffff8d' variant='filled' border='1px solid #C0C0C0' label='Código Loja:'
                                            placeholder='99' onChange={(e) => onChange(e.target.value.trim().toUpperCase())} isInvalid={errors.loja} />
                                    )}
                                />
                                {errors.loja && <Text color='red' pt={1} pl={2}>{errors.loja.message}</Text>}
                            </Flex>

                            <Flex align={errors.codCli || errors.loja ? 'center' : 'end'} mb={errors.codCli || errors.loja ? 1 : 0}>

                                <IconButton type='submit' icon={<MdSearch size='24px' color='#FFF' />}
                                    borderRadius='3rem' w='60px' bg='blue.400' _hover={{ bg: 'blue.500', transform: `translateY(-2px)`, cursor: 'pointer' }}
                                    _active={{ transform: 'translateY(2px)' }} isDisabled={isSubmitting} />

                            </Flex>

                        </Flex>
                    </Flex>


                    {dataCliente.nome &&
                        <Stack title='resultadosClientes' mt='15px' onClick={handleSelect} >
                            <Flex w='100%' h='auto' bg='#D1D9FF' borderRadius='.5rem' _hover={{ cursor: 'pointer' }} >
                                <Flex w='100%' p='10px' align='center' overflow='auto' >
                                    <Input variant='none' bg='transparent' value={dataCliente.nome} readOnly={true} pointerEvents={'none'} tabIndex={'-1'} />
                                </Flex>
                            </Flex>
                        </Stack>
                    }

                </Stack>


            </ModalContent>
        </Modal>
    )
}
