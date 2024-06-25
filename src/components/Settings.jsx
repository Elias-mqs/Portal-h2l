import { IconButtonHeader, Cadastro, DadosUser, SearchUser, CadastroAdm, CadastroOp, CadastroGestor, CadastroUser, CadastroAdmG } from '.'
import { Menu, MenuList, MenuButton, useDisclosure, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { MdOutlineSettings } from 'react-icons/md'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { userContext } from '@/context/UserContext';
import { useSearchCli } from "../context/ResearchesContext";



export default function Settings() {


    const userDataContext = userContext()
    console.log(userDataContext.data.data)

    const { data: { data: { [0]: [dataUser], [1]: info } } } = userContext()
    console.log(dataUser)


    const router = useRouter()
    const { modal } = useSearchCli();





    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeModal, setActiveModal] = useState(null);
    const [isGestor, setIsGestor] = useState(false);
    const [isComercial, setIsComercial] = useState(false);
    const [isTi, setIsTi] = useState(false)
    const [formDados, setFormDados] = useState({ name: '', username: '', email: '', password: '', setor: '', info: '' });
    const [originalData, setOriginalData] = useState({ name: '', username: '', email: '', password: '', setor: '', info: '' });
    const [isSaved, setIsSaved] = useState(false);
    const [levelUser, setLevelUser] = useState(null)


    useEffect(() => {

        const result = { ...userDataContext.data.data[0][0], info: userDataContext.data[1] };

        setFormDados({ name: result.name, username: result.username, email: result.email, password: '', setor: result.setor, info: result.info });
        setIsGestor(result.admin === 1);
        setIsComercial(result.admin === 2);
        setIsTi(result.admin === 3);
        setLevelUser(result.admin);

    }, []);


    const handleOpenDadosUser = () => {
        setActiveModal('dadosUser');
        setOriginalData({ ...formDados });
        onOpen();
    };


    const handleClose = () => {
        if (!isSaved) {
            setFormDados({ ...originalData, password: '' });
        }
        setIsSaved(false);
        modal.onClose();
        onClose();
    };

    const handleSave = () => {
        setIsSaved(true)
    };

    const handleOpen = (modalType) => {
        setActiveModal(modalType);
        onOpen();
    };

    const handleSignOut = () => {
        Cookies.remove('ssn')
        router.push('/login')
    }

    const Gestor = isGestor || isTi ? 'block' : 'none';
    const Comercial = isComercial || isTi ? 'block' : 'none';
    const Ti = isTi ? 'block' : 'none';
    const AllAuth = isTi || isComercial || isGestor ? 'block' : 'none';

    const cadUser = true;
    const cadGestor = true;
    const cadComercial = true;
    const displayNone = 'none'

    return (

        <Menu >
            <MenuButton title='Configurações' borderRadius='20px' color='#7B809A' p='8px' _hover={{ bg: '#7b809a29' }} >
                <MdOutlineSettings size={23} />
            </MenuButton>
            <MenuList align='center' >
                <IconButtonHeader sizeModal='3xl' isOpen={isOpen && activeModal === 'atualizarUser'} onOpen={() => handleOpen('atualizarUser')} onClose={onClose}
                    conteudo={<SearchUser formData={formDados} levelUser={levelUser} onClick={handleSave} setFormData={setFormDados} display={AllAuth} />} // COMPONENTE AQUI
                    labelBtn='Atualizar usuarios' display={AllAuth} />

                <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'dadosUser'} onOpen={handleOpenDadosUser} onClose={handleClose}
                    conteudo={<DadosUser formData={formDados} onClick={handleSave} setFormData={setFormDados} display={Ti} displayNone={displayNone} isDisabled={Gestor} />} // COMPONENTE AQUI
                    labelBtn='Informações da conta' />



                {/* PAINEIS DE CADASTRO ABAIXO ESTÃO PRONTOS */}

                {(dataUser.admin === 3 || dataUser.admin === 2 || dataUser.admin === 4 || dataUser.admin === 1) &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroUser'} onOpen={() => handleOpen('cadastroUser')} onClose={onClose}
                        conteudo={<CadastroUser />} // COMPONENTE AQUI
                        labelBtn='Cadastrar Usuário' />
                }

                {(dataUser.admin === 3 || dataUser.admin === 2 || dataUser.admin === 4) &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroGestor'} onOpen={() => handleOpen('cadastroGestor')} onClose={onClose}
                        conteudo={<CadastroGestor />} // COMPONENTE AQUI
                        labelBtn='Cadastrar Gestor' />
                }

                {(dataUser.admin === 3 || dataUser.admin === 2) &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroOp'} onOpen={() => handleOpen('cadastroOp')} onClose={onClose}
                        conteudo={<CadastroOp />} // COMPONENTE AQUI 
                        labelBtn='Cadastrar Operador H2L' />
                }

                {dataUser.admin === 3 &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroAdmB'} onOpen={() => handleOpen('cadastroAdmB')} onClose={onClose}
                        conteudo={<CadastroAdm />} // COMPONENTE AQUI 
                        labelBtn='Cadastrar Adm Básico' />
                }

                {dataUser.admin === 3 &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroAdmG'} onOpen={() => handleOpen('cadastroAdmG')} onClose={onClose}
                        conteudo={<CadastroAdmG />} // COMPONENTE AQUI 
                        labelBtn='Cadastrar Adm Geral' />
                }

                <IconButtonHeader onOpen={handleSignOut} labelBtn='Sair' />
            </MenuList>
        </Menu>

    )
}

