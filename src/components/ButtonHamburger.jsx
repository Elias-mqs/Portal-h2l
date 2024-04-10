import { IconButton } from "@chakra-ui/react"
import { MdMenu } from "react-icons/md"

export default function ButtonHamburger(onClick) {
    return (
        <IconButton aria-label="Btn Hamburger" icon={<MdMenu />} display='flex' onClick={onClick} color='#7B809A' />
    )
}