import { IconButtonHeader, Cadastro } from '.'
import { Menu, MenuList, MenuButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { MdOutlineSettings } from 'react-icons/md'
import api from '@/utils/api'

export default function Settings() {

    const [isMaster, setIsMaster] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        async function checkAdmin() {
            try{
                const result = await api.get('levelAuth')
                console.log(result.data.admin)
                setIsAdmin(result.data.admin === 1 || result.data.admin === 2 ? true : false)
                setIsMaster(result.data.admin === 2 ? true : false)

            }catch(error){
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
                <IconButtonHeader labelBtn='Teste 4' />
                <IconButtonHeader sizeModal='xl' conteudo={<Cadastro isMaster={false} />} labelBtn='Cadastro' display={isAdmin ? 'block' : 'none'} />
                <IconButtonHeader sizeModal='xl' conteudo={<Cadastro isMaster={true} />} labelBtn='Cadastro adm' display={isMaster ? 'block' : 'none'} />
            </MenuList>
        </Menu>

    )
}



