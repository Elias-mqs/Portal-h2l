import { Heading, Text, Center } from "@chakra-ui/react";

export default function NotFoundPage() {
  return (
    <Center h="100vh" flexDirection="column">
      <Heading as="h1" size="xl" mb="1em">
        404 - Página Não Encontrada
      </Heading>
      <Text fontSize="xl" textAlign="center" mb="0.5em">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </Text>
      <Text fontSize="xl" textAlign="center">
        Por favor, verifique o URL ou volte para a página inicial.
      </Text>
    </Center>
  );
}
