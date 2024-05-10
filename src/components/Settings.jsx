import { IconButtonHeader, Cadastro, DadosUser, SearchUser } from '.'
import { Menu, MenuList, MenuButton, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { MdOutlineSettings } from 'react-icons/md'
import api from '@/utils/api'

export default function Settings() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeModal, setActiveModal] = useState(null);
    const [isGestor, setIsGestor] = useState(false);
    const [isComercial, setIsComercial] = useState(false);
    const [isTi, setIsTi] = useState(false)
    const [formDados, setFormDados] = useState({ name: '', username: '', email: '', password: '', setor: '', info: '' });
    const [originalData, setOriginalData] = useState({ name: '', username: '', email: '', password: '', setor: '', info: '' });
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        async function checkAdmin() {
            try {
                const data = await api.get('userData')
                const result = data.data.user
              
                setFormDados({
                    name: result.name,
                    username: result.username,
                    email: result.email,
                    password: '',
                    setor: result.setor,
                    info: data.data.info
                });
                setIsGestor(result.admin === 1 ? true : false)
                setIsComercial(result.admin === 2 ? true : false)
                setIsTi(result.admin === 3 ? true : false)

            } catch (error) {
                console.error('Erro no catch do settings:', error)
            }
        }
        checkAdmin()
    }, [])

    const handleOpenDadosUser = () => {
        setActiveModal('dadosUser');
        setOriginalData({ ...formDados});
        onOpen();
    };

    const handleClose = () => {
        if (!isSaved) {
            setFormDados({...originalData, password: ''});
        }
        setIsSaved(false);
        onClose();
    };

    const handleSave = () => {
        setIsSaved(true)
    };

    const handleOpen = (modalType) => {
        setActiveModal(modalType);
        onOpen();
    };

    const Gestor = isGestor || isTi ? 'block' : 'none';
    const Comercial = isComercial || isTi ? 'block' : 'none';
    const Ti = isTi ? 'block' : 'none'

    return (
        <Menu >
            <MenuButton title='Configurações' borderRadius='20px' color='#7B809A' p='8px' _hover={{ bg: '#7b809a29' }} >
                <MdOutlineSettings size={23} />
            </MenuButton>
            <MenuList align='center'  >
                <IconButtonHeader labelBtn='Teste 1' />
                <IconButtonHeader labelBtn='Teste 2' />
                <IconButtonHeader sizeModal='3xl' isOpen={isOpen && activeModal === 'atualizarUser'} onOpen={() => handleOpen('atualizarUser')} onClose={onClose} conteudo={<SearchUser formData={formDados} onClick={handleSave} setFormData={setFormDados} display={Ti} />} labelBtn='Atualizar usuarios' display={Gestor} />
                <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'dadosUser'} onOpen={handleOpenDadosUser} onClose={handleClose} conteudo={<DadosUser formData={formDados} onClick={handleSave} setFormData={setFormDados} display={Ti} isDisabled={Gestor} />} labelBtn='Informações da conta' />
                <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastro'} onOpen={() => handleOpen('cadastro')} onClose={onClose} conteudo={<Cadastro isComercial={false} />} labelBtn='Cadastro' display={Gestor} />
                <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroGestor'} onOpen={() => handleOpen('cadastroGestor')} onClose={onClose} conteudo={<Cadastro isComercial={true} />} labelBtn='Cadastro Gestor' display={Comercial} />
                <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroComercial'} onOpen={() => handleOpen('cadastroComercial')} onClose={onClose} conteudo={<Cadastro isTi={true} />} labelBtn='Cadastro Comercial' display={Ti} />
            </MenuList>
        </Menu>

    )
}

