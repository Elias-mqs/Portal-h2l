
import { Button, Box } from "@chakra-ui/react"
import { IconHome } from "@tabler/icons-react"
import { useState } from "react";


export default function ButtonHome() {




    const [isOn, setIsOn] = useState(false);

    const mudar = () => {
        setIsOn(!isOn);
    }

    const stylesButtonOne = {
        background: 'linear-gradient(to bottom, #96C6F5, #EDF2FF)',
        transform: 'scale(1.05)',
        width: '220px',
        height: '50px',
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: '16px',
        boxShadow: 'inset 0px 0px 2px 1px rgba(0, 0, 0, 0.4), 0px 0px 2px 1px rgba(0, 0, 0, 0.1)',

    }
    const stylesButtonTwo = {
        background: 'transparent',
        width: '220px',
        height: '50px',
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: '16px'
    }


    return (
        <Box
            _hover={{
                bgGradient: 'linear(to-b, #96C6F5, #EDF2FF)',
                transition: '1.5s',
            }}
            borderRadius='0.375rem'

        >
            <Button
                onClick={mudar}
                style={isOn ? stylesButtonOne : stylesButtonTwo}
            >
                <Box p='0 15px 0 0'>
                    <IconHome width='30px' height='30px' color='#003366' />
                </Box>

                Home
            </Button >
        </Box>
    )
}

