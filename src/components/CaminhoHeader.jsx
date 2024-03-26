import { Flex, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import index from '@/pages/index'

export default function CaminhoHeader() {
    return (
        <Flex alignItems='center'>
            <HomeOutlinedIcon sx={{ margin: `0 8px 0 8px` }} />
            <Text> /   Home</Text>
        </Flex>


    )
}


// descobrir uma forma de usar isso
//             <Breadcrumb>
//                 <BreadcrumbItem>
//                     <BreadcrumbLink href='.'>/ Home</BreadcrumbLink>
//                 </BreadcrumbItem>

//                 <BreadcrumbItem isCurrentPage>
//                     <BreadcrumbLink href='./Chamados'>Chamados</BreadcrumbLink>
//                 </BreadcrumbItem>
//             </Breadcrumb>