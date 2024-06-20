import { Modal, ModalOverlay, ModalContent, ModalCloseButton, Stack, Flex, Text, IconButton, Input } from "@chakra-ui/react";
import { useSearchCli } from "../context/ResearchesContext";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdSearch } from 'react-icons/md';
import { FormInput } from '@/components';
import { useState } from "react";
import { z } from 'zod';



///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// ESSA FUNÇÃO É PARA FAZER A BUSCA DO NOME DA EMPRESA PESQUISANDO PELO NOME //////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// O INTUITO É QUE FIQUE NOS CAMPOS DE CADASTRO, MAS SE NECESSÁRIO, PODERÁ   //////////////
////////////// SER DIRECIONADO PARA OUTROS CAMPOS                                        //////////////             
///////////////////////////////////////////////////////////////////////////////////////////////////////



const schema = z.object({
    nome: z.coerce.string(),
})


export default function SrsCliNome({ setValue, dataUser }) {


    const [dataCliente, setDataCliente] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: '',
        }
    })

    const { modal, srcNomeCli } = useSearchCli();



    const handleSubmitForm = async (data) => {


        setIsSubmitting(true);

        if (data.nome === '') {
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1000);
            return
        }

        const result = await srcNomeCli({ ...data, codCli: dataUser });

        setDataCliente(result);
        console.log(dataCliente[0])

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
        <Modal isOpen={modal.isOpen} size='2xl' onClose={modal.onClose} >
            <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            <ModalContent h='auto' maxH='98vh' overflow='auto' m='auto' >


                <Stack w='100%' bg="#EDF2FF" borderRadius={{ base: '0', md: "10px" }} boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px" }} transition={{ base: 'max-width 0.3s ease' }} >

                    <ModalCloseButton m={4} />
                    <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={3} >
                        <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Pesquisar Empresa</Text>
                    </Flex>

                    <Flex direction='column' align='center'>

                        <Flex as='form' w='100%' onSubmit={stopPropagation} gap={5} >

                            <Flex w='100%' direction='column' mb='auto'>

                                <Controller
                                    name='nome'
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <FormInput value={value} maxLength='6' bg='#ffffff8d' variant='filled' border='1px solid #C0C0C0' label='Nome da Loja:'
                                            placeholder='Nome da unidade/loja da empresa' onChange={(e) => onChange(e.target.value.trim().slice(0, 6))} isInvalid={errors.codCli} />
                                    )}
                                />
                                {errors.nome && <Text color='red' pt={1} pl={2}>{errors.nome.message}</Text>}
                            </Flex>


                            <Flex align={errors.nome ? 'center' : 'end'} mb={errors.nome ? 1 : 0}>

                                <IconButton type='submit' icon={<MdSearch size='24px' color='#FFF' />}
                                    borderRadius='3rem' w='60px' bg='blue.400' _hover={{ bg: 'blue.500', transform: `translateY(-2px)`, cursor: 'pointer' }}
                                    _active={{ transform: 'translateY(2px)' }} isDisabled={isSubmitting} />

                            </Flex>

                        </Flex>
                    </Flex>



                    <Stack>

                        <Flex direction='column' overflow='auto' gap={5}>


                            {dataCliente[0]?.nome &&
                                dataCliente.map((cliente, index) => (
                                    cliente.nome && (
                                        <Stack key={index} title='resultadosClientes' onClick={() => handleSelect(cliente)}>
                                            <Flex w='100%' h='auto' bg='#D1D9FF' borderRadius='.5rem' _hover={{ cursor: 'pointer' }}>
                                                <Flex w='100%' p='10px' align='center' overflow='auto'>
                                                    <Input variant='none' bg='transparent' value={cliente.nome} readOnly={true} pointerEvents={'none'} tabIndex={'-1'} />
                                                </Flex>
                                            </Flex>
                                        </Stack>
                                    )
                                ))
                            }

                        </Flex>
                    </Stack>



                </Stack>


            </ModalContent>
        </Modal>
    )
}
