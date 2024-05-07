import { IconButtonHeader, Cadastro, DadosUser } from '.'
import { Menu, MenuList, MenuButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { MdOutlineSettings } from 'react-icons/md'
import api from '@/utils/api'

export default function Settings() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isComercial, setIsComercial] = useState(false);
    const [isTi, setIsTi] = useState(false)
    const [formDados, setFormDados] = useState({ name: '', username: '', email: '', password: '', setor: '', });

    useEffect(() => {
        async function checkAdmin() {
            try {
                const result = await api.get('userData')
                setFormDados({
                    name: result.data.user.nome,
                    username: result.data.user.username,
                    email: result.data.user.email,
                    password: '',
                    setor: result.data.user.setor,
                });
                setIsAdmin(result.data.admin === 1 ? true : false)
                setIsComercial(result.data.admin === 2 ? true : false)
                setIsTi(result.data.admin === 3 ? true : false)

            } catch (error) {
                console.error('Erro no catch do settings:', error)
            }
        }
        checkAdmin()
    }, [])

    return (
        <Menu >
            <MenuButton borderRadius='20px' color='#7B809A' p='8px' _hover={{ bg: '#7b809a29' }} >
                <MdOutlineSettings size={23} />
            </MenuButton>
            <MenuList align='center'  >
                <IconButtonHeader labelBtn='Teste 1' />
                <IconButtonHeader labelBtn='Teste 2' />
                <IconButtonHeader labelBtn='Teste 3' />
                <IconButtonHeader sizeModal='xl' conteudo={<DadosUser formData={formDados} setFormData={setFormDados} isDisabled={isAdmin || isTi ? false : true} />} labelBtn='Informações da conta' />
                <IconButtonHeader sizeModal='xl' conteudo={<Cadastro isMaster={false} />} labelBtn='Cadastro' display={isAdmin || isTi ? 'block' : 'none'} />
                <IconButtonHeader sizeModal='xl' conteudo={<Cadastro isMaster={true} />} labelBtn='Cadastro adm' display={isComercial || isTi ? 'block' : 'none'} />
            </MenuList>
        </Menu>

    )
}

