
import { Button, Box } from "@chakra-ui/react"
import { IconHome } from "@tabler/icons-react"
import { useState } from "react";


export default function ButtonHome() {




    const [isOn, setIsOn] = useState(false);

    const mudar = () => {
        setIsOn(!isOn);
    }

    const stylesButtonOne = {
        background: 'linear-gradient(to bottom, #96C6F5, #FFF)',
        width: '220px',
        height: '50px',
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: '20px',
        boxShadow: '0px 1px 4px 1px rgba(0, 0, 0, 0.2)'
    }
    const stylesButtonTwo = {
        background: 'transparent',
        width: '220px',
        height: '50px',
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: '20px'
    }


    return (
        <Box
            _hover={{
                bgGradient: 'linear(to-b, #96C6F5, #FFF)'
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

