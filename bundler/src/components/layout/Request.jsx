import { Box,Container, FormControl, FormLabel, Input,Stack, Button, Heading, Textarea} from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

const Request = () => {
    const [email,setEmail]=useState('')
    
    const [name,setName]=useState("")
    const [course,setCourse]=useState('')
  return (
    <Container height={"85vh"}  >
    <Heading paddingTop={["20"]} paddingBottom={"6"} textAlign={'center'}> Request A Course</Heading>
          <form>
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

       <FormLabel></FormLabel>
       <Textarea placeholder='Request A Course..'  value={course} onChange={(e)=>setCourse(e.target.value)}/>
    </Box>
    
   
        
   
   
    <Box>
        <Button type={"submit"} color={'black'} bgColor={"red.200"} size={"sm"}>Send Mail</Button>
    </Box>
    
    <Box>See Available Courses.. {'    '} <Link to="/courses">
        <Button alignItems={'center'} size={'sm'}  variant={'link'} colorScheme={"yellow"}> click</Button> here
    </Link></Box> 
    </Stack>
   </form>
    </Container>
  )
}

export default Request