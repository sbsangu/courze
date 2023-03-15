import React,{useState} from 'react'
import {Avatar, Grid,Image,Container, FormControl, Heading, Input, VStack, Select, Button } from '@chakra-ui/react'
import Sidebar from '../Sidebar.jsx'
import cursor from "../../../assets/images/cursor.png"



const CreateCourse = () => {
const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [createdBy,setCreatedBy]=useState('')
const [category,setCategory]=useState('')
const [imagePrev,setImagePrev]=useState('')
const [image,setImage]=useState('')
const categories=['Web Development','Android Development','Artificial Inteligence','DSA','UI/UX']


const changeImage = e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImagePrev(reader.result);
    setImage(file);
  };
};




  return (
   <Grid minH={"100vh"} css={{
    cursor:`url(${cursor}),default`
   }} templateColumns={['1fr',' 5fr 1fr']}>
    
    
    <Container py={"16"}>
    <form>
    <VStack spacing={"8"}>
    <Heading> CREATE COURSE</Heading>
    <Input type={"text"} placeholder={"Name"} value={title} onChange={((e)=>setTitle(e.target.value))} />
    <Input type={"text"} placeholder={"Description"} value={description} onChange={((e)=>setDescription(e.target.value))} />
    <Input type={"text"} placeholder={"Creator Name"} value={createdBy} onChange={((e)=>setCreatedBy(e.target.value))} />
    <Select placeholder='Category' focusBorderColor={"purple.300"} value={category} onChange={((e)=>setCategory(e.target.value))} >
    {categories.map((item)=>(
      <option key={item} >{item} </option>
    ))}

   
    </Select>
    
    <Input type={"file"} accept="image/*"  required  onChange={changeImage}  css={
     {
      "&::file-selector-button":{
        cursor:"pointer",
        marginLeft:"-17px",
        
        padding:"4px",
        width:"110%",
        border:"none",
        height:"100%"
        ,backgroundColor:"purple.300",
        color:"darkpurple"
    }
     }
    } />

{imagePrev && (
      <Image src={imagePrev} boxSize={"64"} objectFit="contain"/>
    )} 





   

    <Button type={"submit"} w={"full"} colorScheme={"purple"}>Create</Button>

      
    </VStack>
    

    </form>



    </Container>
    <Sidebar/>

   </Grid>
  )
}

export default CreateCourse;