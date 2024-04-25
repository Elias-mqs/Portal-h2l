import { Button, Alert, AlertIcon, Center, Box } from "@chakra-ui/react"
import { useState, useEffect } from "react"

function FbCenter({ type, colorScheme, mr, text, status, asfeedback, showAlert }) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (showAlert) {
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        }
    }, [showAlert]);

    return (
        <Box >
            <Button type={type} colorScheme={colorScheme} mr={mr} >
                {text}
            </Button>

            {show && (
                <Center position="fixed" width="100%" height="100%" top="0" left="0" >
                    <Alert status={status} maxW='md' >
                        <AlertIcon />
                        {asfeedback}
                    </Alert>
                </Center>
            )}
        </Box>
    )
}

export { FbCenter };