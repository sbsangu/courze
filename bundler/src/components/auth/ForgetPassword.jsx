import { Heading,Box, Container, FormControl, FormLabel,Input,Button } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const ForgetPassword = () => {
    const [email,setEmail]=useState('')
  return (
    <Box height={'85vh'}>
    <Container p={'16'} maxW={["container.lg",'container.sm']} >
    <Heading marginBottom={"12"} textAlign={'center'}>FORGET PASSWORD</Heading>
    
    <form>
    <FormLabel  fontSize={"20"}>Email Address</FormLabel>
    <Input required type={"email"}  placeholder={"ABC@gmail.com"} value={email} onChange={(e)=>{setEmail(e.target.value)}} />
    <Button width={"full"} bgColor={"yellow.400"} variant={"ghost"}  marginTop={"6"}>Send Reset Link </Button>


    </form>
    </Container>
   

    </Box>
  )
}

export default ForgetPassword