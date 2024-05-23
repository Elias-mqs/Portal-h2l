import { Button, VStack, HStack, Stack, Flex, Box, Divider, Text } from "@chakra-ui/react";
import { MdHeadphones, MdOutlineCheckCircle } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import { AiOutlineTool } from "react-icons/ai";

export default function HomePage() {



    return (
        <Stack h='100%' align='start' direction='row' m={8} justify={{base: 'center', md: 'end'}} gap='5rem'>
            {/* Backup */}
            {/* <Flex bgGradient='linear(to-b, #FFF, #F0F0F0)' w='300px' h='80px' borderRadius='15px' pl='8px' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)'>
                <Box boxSize='70px' bgGradient='linear(to-b, #63B967, #4BA64F)' borderRadius='15px' mt='-10px' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' ></Box>
            </Flex> */}


            <Stack gap={4} borderRadius='20px' bg='blue.800' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' >

                <Flex w='100%' mt='15px' justify='center' color='#FFF' fontWeight={600} fontSize='25px' textShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)'>Chamados</Flex>

                <Stack w='100%' justify='center' bg='#FFF' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' borderTopRadius='20px' borderBottomRadius='15px' p='20px 10px' gap={5} >

                    <Flex bgGradient='linear(to-b, #FFF, #F0F0F0)' direction='column' gap={2} w='270px' h='80px' borderRadius='15px' pl='8px' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' >
                        <HStack align='start'>
                            <Flex boxSize='70px' justify='center' bgGradient='linear(to-b, #89CFF0, #6699CC)' borderRadius='15px' mt='-10px' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' >
                                <Box mt='6px'>
                                    <MdHeadphones size='50px' />
                                </Box>
                            </Flex>
                            <VStack aria-label='textos' w='100%' flex='1' gap={0} >
                                <Flex fontWeight={600} w='100%' pl={2} mt={1} color='#6699CC' >Abertos</Flex>
                                <Flex fontSize='25px' w='100%' h='auto' justify='flex-end' pr={6} fontWeight={800}>51/53</Flex>
                            </VStack>
                        </HStack>
                        <Divider />
                    </Flex>
                    <Flex bgGradient='linear(to-b, #FFF, #F0F0F0)' direction='column' gap={2} w='270px' h='80px' borderRadius='15px' pl='8px' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)'>
                        <HStack align='start'>
                            <Flex boxSize='70px' justify='center' bgGradient='linear(to-b, #ffdb97, #FFA500)' borderRadius='15px' mt='-10px' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' >
                                <Box mt='14px'>
                                    <AiOutlineTool size='42px' />
                                </Box>
                            </Flex>
                            <VStack aria-label='textos' w='100%' flex='1' gap={0} >
                                <Flex fontWeight={600} w='100%' pl={2} mt={1} color='#FFA500' >Andamento</Flex>
                                <Flex fontSize='25px' w='100%' h='auto' justify='flex-end' pr={6} fontWeight={800}>51/53</Flex>
                            </VStack>
                        </HStack>
                        <Divider />
                    </Flex>
                    <Flex bgGradient='linear(to-b, #FFF, #F0F0F0)' direction='column' gap={2} w='270px' h='80px' borderRadius='15px' pl='8px' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)'>
                        <HStack align='start'>
                            <Flex boxSize='70px' justify='center' bgGradient='linear(to-b, #90EE90, #4BA64F)' borderRadius='15px' mt='-10px' boxShadow='0px 1px 4px 1px rgba(0, 0, 0, 0.2)' >
                                <Box mt='14px'>
                                    <MdOutlineCheckCircle size='40px' />
                                </Box>
                            </Flex>
                            <VStack aria-label='textos' w='100%' flex='1' gap={0} >
                                <Flex fontWeight={600} w='100%' pl={2} mt={1} color='#4BA64F' >Encerrados</Flex>
                                <Flex fontSize='25px' w='100%' h='auto' justify='flex-end' pr={6} fontWeight={800}>51/53</Flex>
                            </VStack>
                        </HStack>
                        <Divider />
                    </Flex>

                </Stack>
            </Stack>
        </Stack>
    );
}
