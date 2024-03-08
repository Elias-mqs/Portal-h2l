import { Stack, Grid, GridItem, Text, Flex } from "@chakra-ui/react";



export default function PageChamados() {
    return (
        <Stack >
            <Grid templateColumns='repeat(4, 1fr)' gap={6} >
                <GridItem w='100%' h='10' bg='blue.500' />
                <GridItem w='100%' h='10' bg='blue.500'>
                    <Text>
                        teste
                    </Text>
                </GridItem>
                <GridItem w='100%' h='10' bg='blue.500' />
                <GridItem w='100%' h='10' bg='blue.500' />
                
         
            </Grid>
        </Stack>
    )
}

// Hoje terminei o dia aprendendo como funcionam as grids. Já entendi
// parcialmente como funcionam e iria iniciar essa parte do projeto