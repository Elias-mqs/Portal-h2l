import { useState } from "react";
import { useSearchCli } from "../context/ResearchesContext";


export default function SearchEmpresa() {

    const useSearch = useSearchCli()
    const [dados, setDados] = useState({ dados: '' })

    const handleFormEdit = (e) => {
        let novaInfo = { ...dados }

        novaInfo[e.target.name] = e.target.value
        if (e.target.name === 'dados') {
            novosDados.dados = e.target.value;
        }
        setDados(novaInfo);
    }

    return (
        <Modal isOpen={useSearch.modal.isOpen} size='sm' onClose={useSearch.modal.onClose} >
            <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            <ModalContent h='auto' maxH='98vh' overflow='auto' m='auto' >


                <Stack w='100%' h='100%' maxH='auto' bg="#EDF2FF" borderRadius={{ base: '0', md: "10px" }} boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" p={{ base: '35px', md: "30px 35px" }} transition={{ base: 'max-width 0.3s ease' }} >

                    <ModalCloseButton m={4} />
                    <Flex justify='center' borderBottom={'1px solid #858585'} pb={1} mb={5} >
                        <Text p='20px 0 5px' w='auto' fontSize='20px' fontWeight={600} >Pesquisar Empresa</Text>
                    </Flex>

                    <Flex as='form' onSubmit={useSearch.handle}>
                        <FormInputBtn name='dados' value={dados.dados} icon={<MdSearch size='24px' color='#7B809A' />} disabled={isSubmitting} variant='filled' bg='#ffffff8d'
                            label='Pesquisar usuário:' placeholder='Nome, usuário, email, setor' onChange={handleFormEdit} border='1px solid #C0C0C0' />
                    </Flex>

                    <Stack overflow='auto' display={viewDS} >
                        <Flex ml='61px' >
                            <Flex w='25%' fontWeight={500} justify='center' >Nome</Flex>
                            <Flex w='25%' fontWeight={500} justify='center' >Usuário</Flex>
                            <Flex w='20%' fontWeight={500} justify='center' >Setor</Flex>
                            <Flex w='30%' fontWeight={500} justify='center' >Email</Flex>
                        </Flex>
                        {useSearch.results.map((user, index) => (
                            <Flex key={index} >
                                <UserRow user={user} formData={formData} handleSearch={handleSearch} setFormData={setFormData} />
                            </Flex>
                        ))}
                    </Stack>

                </Stack>


            </ModalContent>
        </Modal>
    )
}

function UserRow({ user, handleSearch }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formData, setFormData] = useState(user)
    const [isSaved, setIsSaved] = useState(false);
    const [originalData, setOriginalData] = useState({ name: '', username: '', email: '', password: '', setor: '', info: '' });

    useEffect(() => {
        setFormData(user)
    }, [user])

    const handleOpenDadosUser = () => {
        setOriginalData({ ...formData });
        onOpen();
    };

    const handleClose = () => {
        if (!isSaved) {
            setFormData({ ...originalData, password: '' });
        }
        setIsSaved(false);
        setUserDeleted(false);
        onClose();

    };

    const handleSave = () => {
        setIsSaved(true)
    };

    return (
        <>
            <IconButtonHeader sizeModal='xl' isOpen={isOpen} onOpen={handleOpenDadosUser} onClose={handleClose} conteudo={<DadosUser handleSearch={handleSearch} setUserDeleted={handleClose} formData={{ ...formData, password: '' }} onClick={handleSave} setFormData={setFormData} />} labelBtn='editar' fontSize='sm' fontWeight={500} fontStyle='italic' hover={{ fontWeight: 700, color: '#000' }} />
            <Flex w='100vw' bg='#D1D9FF' borderRadius='.5rem' >
                <Flex name='nome' w='25%' borderLeft='2px solid #63636342' p='0 10px' align='center' overflow='hidden' borderLeftRadius='.5rem' >{user.name}</Flex>
                <Flex name='usuario' w='25%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.username}</Flex>
                <Flex name='setor' w='20%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.setor}</Flex>
                <Flex name='email' w='30%' borderLeft='1px solid #636363a9' p='0 10px' align='center' overflow='hidden' >{user.email}</Flex>
            </Flex>
        </>
    );
}