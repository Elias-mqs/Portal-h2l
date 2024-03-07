import { IconButton } from "@chakra-ui/react"
import { MdMenu } from "react-icons/md"

export default function ButtonHamburger() {
    return (
        <IconButton
            aria-label="Btn Hamburger"
            icon={<MdMenu />}
            display='flex'
            onClick={() => null}
            color='#7B809A'
        />
    )
}