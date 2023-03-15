
import { Box,Container, FormControl, FormLabel, Input,Stack, Button, Heading, Textarea} from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
const Contact = () => {
    const [email,setEmail]=useState('')
    
    const [name,setName]=useState("")
    const [message,setMessage]=useState('')
  return (
    <Container height={"85vh"}  >
    <Heading paddingTop={["20"]} paddingBottom={"6"} textAlign={'center'}> Contact Us</Heading>
          <FormControl>
   <Stack   spacing={['6',"8"]}>
   

   <Box><FormLabel>Name</FormLabel>
    <Input required={"true"} type={"text"} value={name} onChange={(e)=>setName(e.target.value)} placeholder={"Enter Your Name"} focusBorderColor={"red.900"}
         ></Input>
    </Box>
    <Box><FormLabel>Email Address</FormLabel>
    <Input required={"true"} type={"email"} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={"ABC@gmail.com"} focusBorderColor={"red.900"}
         ></Input>
    </Box>
    <Box>

       <FormLabel>Message</FormLabel>
       <Textarea placeholder='Your Message..'  value={message} onChange={(e)=>setMessage(e.target.value)}/>
    </Box>
    
   
        
   
   
    <Box>
        <Button type={"submit"} color={'black'} bgColor={"red.200"} size={"sm"}>Send Mail</Button>
    </Box>
    
    <Box>Request For A Course? {'    '} <Link to="/request">
        <Button alignItems={'center'} size={'sm'}  variant={'link'} colorScheme={"yellow"}> click</Button> here
    </Link></Box> 
    </Stack>
   </FormControl>
    </Container>
   
    
  )
}

export default Contact