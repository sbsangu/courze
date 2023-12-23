import { Box,Button,FormControl,Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const CourseModal = ({isOpen,onClose,id,deleteButtonHandler ,addLectureHandler,courseTitle,lectures=[1,2,3,4,5,6]}) => {

    const [title,setTitle]=useState('');
    const [description,setDescription]=useState("")
    const [video,setVideo]=useState('')
    const [videoPrev,setVideoPrev]=useState('');
    


    const changeVideo = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setVideoPrev(reader.result);
          setVideo(file);
        };
      };

      const closeHandler=()=>{
       
        setVideo('');
        setVideoPrev('');
        setTitle('')
        setDescription('')
        onClose();
      }
   
  return (
    <Modal isOpen={isOpen} onClose={closeHandler} size="full">
    
    <ModalOverlay/>
    <ModalContent>
<ModalHeader>
{courseTitle}
</ModalHeader>
<ModalCloseButton/>
    
    <ModalBody p={"16"}>
    <Grid templateColumns={['1fr','3fr 1fr']} >
    <Box  px={['0','16']}>
    <Box my={"5"}
    >
        <Heading>{courseTitle}</Heading>
        <Heading size={'sm'} opacity={"0.6"}> {`#${id}`} </Heading>

        <Heading size="lg">Lectures</Heading>
   {lectures.map((item,i)=>(
    <VideoCard
    key={i}
title="React Course Intro"
num={i+1}
description="Intro Lecture where u will be knowing the bascis of react"
lectureId="sdsdsd"
courseId={id}
deleteButtonHandler={deleteButtonHandler}

        />
   ))}
    </Box>

    </Box>
    <Box>
        <form onSubmit={e=>addLectureHandler(e,id,title,description,video)}>
<VStack spacing={'4'}>
<Heading size="md" textTransform={'uppercase'}>Add Lecture </Heading>
<Input focusBorderColor='purple.500'  placeholder='Title' value={title}
    onChange={(e)=>setTitle(e.target.value)}
/>
<Input focusBorderColor='purple.500'  placeholder='Description' value={description}
    onChange={(e)=>setDescription (e.target.value)}
/>

<Input type={"file"} accept="video/mp4"  required  onChange={changeVideo}  css={
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
    {videoPrev && 
    (
        <video controls controlsList='nodownload' src={videoPrev}></video>
    )}
<Button width={'full'} colorScheme={"purple"} type={'submit'}>
    Add Lecture
</Button>


</VStack>


        </form>
    </Box>


    </Grid>

    </ModalBody>
    <ModalFooter>
<Button onClick={onClose}>
     Close
</Button>

    </ModalFooter>
    </ModalContent>
    



    </Modal>
  )
}

export default CourseModal;
function VideoCard({title,num,description,lectureId,courseId,deleteButtonHandler}){

    return(
<Stack direction={['column','row']} my={"8"} borderRadius={'lg'} boxShadow={'0 0 10px rgba(107,70,193,0.5)'} justifyContent={['flex-start','space-between']} p={['4','8']}>
<Box>

    <Heading size={"sm"}> {`#${num}- ${title}`}  </Heading>
    <Text> {description} </Text>

</Box>
<Button color={'purple.600'} onClick={()=>deleteButtonHandler(courseId,lectureId)}>
    <RiDeleteBin7Fill/>
</Button>


</Stack>

    )
}