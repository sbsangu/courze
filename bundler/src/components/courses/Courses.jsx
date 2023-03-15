import {  Button, Container, Heading, HStack, Input,Stack,Text ,Image,VStack} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../components/home.css'
import imageSrc from "../..//assets/images/cursor.png"

const Course=({views,title,imageSrc,addToPLaylistHandler,creator,description,lectureCount,id})=>(
<VStack  marginTop={'6'} className='course' alignItems={['center','flex-start']}>
<Image  src={imageSrc} alt="courses" boxSize={'40'} />
<Heading noOfLines={3} size={'sm'} > {title}</Heading>
<Text noOfLines={2} > {description}</Text>
<HStack>
  <Text textTransform={'uppercase'} fontWeight={"bold"}>Creator</Text>
  <Text  textTransform={'uppercase'}>{creator}</Text>
</HStack>
<Heading size={'xs'} >{`Lectures -${lectureCount}`}</Heading>
<Heading size={'xs'} >{`Views -${views}`}</Heading>
<Stack direction={['column','row']} alignItems={'center'}>
<Link to={`/courses/${id}`}>
  <Button colorScheme={'yellow'}>Watch Now</Button>
</Link>
<Button variant={'ghost'} colorScheme={"yellow"}  onClick={(id)=>addToPLaylistHandler(id)}> Add to Playlist</Button>

</Stack>
</VStack>


)


const Courses=()=>{
  const addToPLaylistHandler=(id)=>{
    console.log(id)
    console.log('added to plalylist')
  }
    const [keyword,setKeyword]=useState('')
    const [category,setCategory]=useState('')
    const categories=['Web Development','Android Development','Artificial Inteligence','DSA','UI/UX']
  return (
    <>
          <Container marginTop={'10'} minH={"95vh"} maxWidth={'container.lg'} py={"8"} >
    <Heading> All Courses</Heading>
    <Input mt={'4'} type={"text"} value={keyword} placeholder="Search a Course.." onChange={(e)=>{setKeyword(e.target.value)}} />
    <HStack overflowX={"auto"} py={"8"} >
    {
        categories.map((item,index)=>(
            <Button key={index} onClick={()=>setCategory(item)} minW={'60'}  >
                {item}
            </Button>
        ))
    }

    </HStack>
    <Stack  paddingTop={'3'} direction={['column','row']} flexWrap={'wrap'} justify={['flex-start','space-evenly']} alignItems={['center','flex-start']}   >
    <Course
      title={'sample'}
      description={"sample"}
      views={"23"}
      imageSrc={imageSrc}
      id={"sample"}
      creator={"sample"}
      lectureCount={"2"}
      addToPLaylistHandler={addToPLaylistHandler}
    />

    </Stack>
    
    
    </Container>
    
    </>
  

  )
}

export default Courses