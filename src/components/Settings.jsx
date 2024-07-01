import { IconButtonHeader, DadosUser, SearchUser, CadastroAdm, CadastroOp, CadastroGestor, CadastroUser, CadastroAdmG, AccountInfo } from '.';
import { Menu, MenuList, MenuButton, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineSettings } from 'react-icons/md';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { userContext } from '@/context/UserContext';



export default function Settings() {

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeModal, setActiveModal] = useState(null);
    const { data: { data: { [0]: [dataUser], [1]: info } } } = userContext()


    const handleOpen = (modalType) => {
        setActiveModal(modalType);
        onOpen();
    };


    const handleSignOut = () => {
        Cookies.remove('ssn')
        router.push('/login')
    }


    return (

        <Menu >
            <MenuButton title='Configurações' borderRadius='20px' color='#7B809A' p='8px' _hover={{ bg: '#7b809a29' }} >
                <MdOutlineSettings size={23} />
            </MenuButton>
            <MenuList align='center' >


                {dataUser.admin != '0' &&
                    <IconButtonHeader sizeModal={{base: '2xl', md:'4xl'}} isOpen={isOpen && activeModal === 'atualizarUser'} onOpen={() => handleOpen('atualizarUser')} onClose={onClose}
                        conteudo={<SearchUser />}
                        labelBtn='Atualizar usuarios' />
                }

                {dataUser.admin != '3' &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'infoUser'} onOpen={() => handleOpen('infoUser')} onClose={onClose}
                        conteudo={<AccountInfo />}
                        labelBtn='Informações da conta' />
                }

                {dataUser.admin === '3' &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'dadosUser'} onOpen={() => handleOpen('dadosUser')} onClose={onClose}
                        conteudo={<DadosUser />}
                        labelBtn='Informações da conta' />
                }

                {(dataUser.admin === '3' || dataUser.admin === '2' || dataUser.admin === '4' || dataUser.admin === '1') &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroUser'} onOpen={() => handleOpen('cadastroUser')} onClose={onClose}
                        conteudo={<CadastroUser />}
                        labelBtn='Cadastrar Usuário' />
                }

                {(dataUser.admin === '3' || dataUser.admin === '2' || dataUser.admin === '4') &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroGestor'} onOpen={() => handleOpen('cadastroGestor')} onClose={onClose}
                        conteudo={<CadastroGestor />}
                        labelBtn='Cadastrar Gestor' />
                }

                {(dataUser.admin === '3' || dataUser.admin === '2') &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroOp'} onOpen={() => handleOpen('cadastroOp')} onClose={onClose}
                        conteudo={<CadastroOp />} 
                        labelBtn='Cadastrar Operador H2L' />
                }

                {dataUser.admin === '3' &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroAdmB'} onOpen={() => handleOpen('cadastroAdmB')} onClose={onClose}
                        conteudo={<CadastroAdm />} 
                        labelBtn='Cadastrar Adm Básico' />
                }

                {dataUser.admin === '3' &&
                    <IconButtonHeader sizeModal='xl' isOpen={isOpen && activeModal === 'cadastroAdmG'} onOpen={() => handleOpen('cadastroAdmG')} onClose={onClose}
                        conteudo={<CadastroAdmG />} 
                        labelBtn='Cadastrar Adm Geral' />
                }

                <IconButtonHeader onOpen={handleSignOut} labelBtn='Sair' />
            </MenuList>
        </Menu>

    )
}

