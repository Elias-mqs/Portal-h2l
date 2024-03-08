
import styles from "@/styles/Home.module.css";
import { SideBar, Header, HomePage } from "@/components";
import { Flex, Text, HStack, VStack } from "@chakra-ui/react"


export default function Home() {
  return (


    <HStack w="full" h="100vh" bg="#F0F2F5" padding={8}>
      <SideBar />
      <VStack w='100%' h='100%'>
        <Header />
        <Flex as="main" className={styles.FlexDashboard}>
          <HomePage />
        </Flex>
      </VStack>
    </HStack>
  )
}
