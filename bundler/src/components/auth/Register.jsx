import { Box,Container, FormControl, FormLabel, Heading, Input, VStack,Stack, Button, Avatar } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import {  Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user.js';




export const fileUploadStyle={
    "&::file-selector-button":{
        cursor:"pointer",
        marginLeft:"-19px",
        
        padding:"4px",
        width:"112%",
        border:"none",
        height:"100%"
        ,backgroundColor:"gray",
        color:"white"
    }
}


const Register = () => {
    const dispatch=useDispatch()

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const [imgPrev,setImgPrev]=useState("")
    const [file,setFile]=useState('')
    const changeImageHandler=(e)=>{
        const file=e.target.files[0]
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setFile(reader.result)
                setImgPrev(reader.result);
            }
        }
        reader.readAsDataURL(file)
    }

    const submitHandler = (e)=>{
        e.preventDefault();
      


       dispatch(register( name, email, password , file))
     
    }
       


  return (
   <Box marginTop={['6',"2"]} minH={"100vh"}   >
   <Container minH={"100vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
   <Heading color={'red.400'} paddingBottom={"4"} marginBottom={"4"} paddingTop={"4"} textAlign={'center'} bgColor={"black"}>Welcome To Bundler</Heading>
   <VStack  >
   <form onSubmit={submitHandler}>
   <Stack spacing={['2',"4"]}>
   <Box display={'flex'}  justifyContent={"center"}><Avatar src={imgPrev} size={['lg','xl']}/></Box>

   <Box><FormLabel>Name</FormLabel>
    <Input required={"true"} type={"text"} value={name} onChange={(e)=>setName(e.target.value)} placeholder={"Enter Your Name"} focusBorderColor={"red.900"}
         ></Input>
    </Box>
    <Box><FormLabel>Email Address</FormLabel>
    <Input required={"true"} type={"email"} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={"ABC@gmail.com"} focusBorderColor={"red.900"}
         ></Input>
    </Box>
    
   
        
   <Box>
    <FormLabel >Passsword</FormLabel>
    <Input required={'true'} type={'password'} value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" focusBorderColor='red.900'></Input></Box>
    <Box>
    <FormLabel >Avatar</FormLabel>
    <Input required type={'file'}  placeholder="Choose Avatar" focusBorderColor='red.900' css={fileUploadStyle} onChange={changeImageHandler}/></Box>
    

       
   
    <Box>
        <Button type={"submit"} color={'black'} bgColor={"red.200"} size={"sm"}>Sign Up</Button>
    </Box>
    
    <Box>Already Signed Up? {'    '} <Link to="/login">
        <Button alignItems={'center'} size={'sm'} colorScheme={'facebook'} variant={'solid'} color={"white"}> Log In </Button>
    </Link></Box> 
    </Stack>
   </form>

   </VStack>
   

   </Container>


   </Box>
   
   )
}

export default Register;