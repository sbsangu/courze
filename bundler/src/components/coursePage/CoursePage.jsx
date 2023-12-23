import { Box, Button, Grid, Heading ,Text, VStack} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import introVideo from "../../assets/videos/intro.mp4"


const CoursePage = () => {
   
    const [lectureNumber,setLectureNumber]=useState(0)
    
    const lectures=[{
        _id:"dasgfashd",
        title:"sample1",
        description:"dhvvsjhdbk",
        video:{
            url:"gsahv"
        }},
        {
            _id:"dasgfashd",
            title:"sample2",
            description:"dhvvsjhdbk",
            video:{
                url:"gsahv"
            }},{
                _id:"dasgfashd",
                title:"sample3",
                description:"dhvvsjhdbk",
                video:{
                    url:"gsahv"
                }

    }]
  return (
   <Grid minH={"90vh"} templateColumns={['1fr','3fr 1fr']} >
   <Box>
    <video controls width={"100%"}  disablePictureInPicture disableRemotePlayback controlsList='nodownload noremoteplayback' src={introVideo}>


    </video>
    <Heading m={4} >{`${lectureNumber+1}-${lectures[lectureNumber].title}`} </Heading>
    <Heading m={4} size={"md"}>Description</Heading>
    <Text m={4}>j{lectures[lectureNumber].description}</Text>
   </Box>
   <VStack m={10}>
    {lectures.map((element,index)=>(

        <Button onClick={()=>{setLectureNumber(index)}} width={"90%"} colorScheme={"yellow"} border={"2px solid black"} key={element._id}>
        <Text>{index+1} -{element.title}</Text>
        </Button>
    ))}


   </VStack>


   </Grid>
  )
}

export default CoursePage