import React from 'react'
import { useState } from 'react'
import {Box,Heading,Container,FormControl,FormLabel,Input,Button} from "@chakra-ui/react"

const Resetpassword = () => {
    const [password,setPassword]=useState('')
  return (
    <Box height={'85vh'}>
    <Container p={'16'} maxW={["container.lg",'container.sm']} >
    <Heading marginBottom={"12"} textAlign={'center'}>RESET PASSWORD</Heading>
    
    <form>
    <FormLabel  fontSize={"20"}>Password</FormLabel>
    <Input required type={"password"}  placeholder={"Enter New Password"} value={password} onChange={(e)=>{setPassword(e.target.value)}} />
    <Button width={"full"} bgColor={"yellow.400"} variant={"ghost"}  marginTop={"6"}>Reset Paasword </Button>


    </form>
    </Container>
   

    </Box>
  )
}

export default Resetpassword;