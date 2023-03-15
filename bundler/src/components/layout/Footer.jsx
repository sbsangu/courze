import { Box, Heading, Stack, VStack,Text, HStack } from '@chakra-ui/react'
import React from 'react'
import {SiInstagram,SiGithub} from "react-icons/si"

const Footer = () => {
  return (
    <Box minH={'10vh'} bgColor={"blackAlpha.900"} padding={"5"}>
    <Stack alignItems={['center','flex-start']} direction={['column','row']} justifyContent={['center','space-between']}>
    <VStack alignItems={['center','flex-start']}>
    <Heading color={'white'}> All Rights Reserved</Heading>
    <Text  fontFamily={'body'} color="yellow">@SBmerndeveloper</Text>
    </VStack>
    <HStack fontSize={'50'} color={"white"}>
        <a href='https://www.instagram.com/' target={'_blank'}>
            <SiInstagram/> 
        </a>
        <a href ="https://github.com/" target={"_blank"}>
            <SiGithub/>
        </a>
    </HStack>
   


    </Stack>



    </Box>
  )
}

export default Footer