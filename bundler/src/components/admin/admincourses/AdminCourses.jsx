import React from 'react'
import { Grid,Box,Table,
  Thead,
  Tbody,
  
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  HStack,
  Button,
  useDisclosure, } from '@chakra-ui/react'
import Sidebar from '../Sidebar.jsx'
import cursor from "../../../assets/images/cursor.png"
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from '../courseModal/CourseModal.jsx'

const AdminCourses = () => {
  const courses=
[{
  _id:"daSD",
  title:"React Course",
  category:"WEB DEVELOPMENT",
 poster:{
  url:" ",
 },
 createdBy:"Sb Sangu",
 views:"123",
 numOfVideos:"12",


}]

const courseDetailsHandler=(userId)=>{
  
  onOpen();

}
const deleteHandler=(userId)=>{
  console.log(userId)


}
const deleteButtonHandler=(courseId,lectureId)=>{
  console.log(courseId)
console.log(lectureId)
}

const addLectureHandler=(e,courseId,title,description,video)=>{
e.prevent.default();
}

const {isOpen,onOpen,onClose}=useDisclosure();
    return (
      <Grid minH={"100vh"} css={{
       cursor:`url(${cursor}),default`
      }} templateColumns={['1fr',' 5fr 1fr']}>
       
       <Box py={['0','16']} overflowX={'auto'}>
       <Heading my={"16"} textAlign={['center','left']}>ALL USERS</Heading>
       <TableContainer>
      <Table size={"lg"} >
      <TableCaption>All Available Courses In Database</TableCaption>
      <Thead>
        <Tr>
      <Th>Id</Th>
      <Th>Poster</Th>

      <Th>Title</Th>

      <Th>Category</Th>

      <Th>Creator</Th>
      <Th isNumeric> Views</Th>
      <Th isNumeric>Lectures</Th>
      <Th isNumeric>Actions</Th>



        </Tr>
      </Thead>
      <Tbody>
      {courses.map((item)=>(
        <Row courseDetailsHandler={courseDetailsHandler} deleteHandler={deleteHandler} key={item._id} item={item}/>
      ))}
      </Tbody>
     



      </Table>



       </TableContainer>
       <CourseModal isOpen={isOpen} onClose={onClose} deleteButtonHandler={deleteButtonHandler} 
       courseTitle={"React Course"}
        addLectureHandler={addLectureHandler} id={'jkfjdk'}
       />
   
       </Box>
       <Sidebar/>
   
      </Grid>
     )
   }
  

   export default AdminCourses;


function Row({item,courseDetailsHandler,deleteHandler}){
return(
  <Tr>
    <Td>{item._id}</Td>
    <Td>{item.poster.url}</Td>
    <Td>{item.title}</Td>
    <Td textTransform={'uppercase'}> {item.category} </Td>
    <Td> {item.createdBy}</Td>
    <Td isNumeric>{item.views} </Td>
    <Td isNumeric>{item.numOfVideos} </Td>
    <Td isNumeric> 
     <HStack justifyContent={'flex-end'}>
    <Button onClick={()=>courseDetailsHandler(item._id)} variant={"outline"} color={"purple.500"} >View Lecture </Button>
    <Button onClick={()=>deleteHandler(item._id)} color='purple.600'>
      <RiDeleteBin7Fill />
    </Button>


    </HStack>
     </Td>
  </Tr>
)

}
  


