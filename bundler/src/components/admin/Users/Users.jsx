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
  Button, } from '@chakra-ui/react'
import Sidebar from '../Sidebar.jsx'
import cursor from "../../../assets/images/cursor.png"
import { RiDeleteBin7Fill } from 'react-icons/ri'

const Users = () => {
  const users=
[{
  _id:"daSD",
  name:"Sangram",
  role:"admin",
  subscription:{
    statu:"Active"
  },
  email:"sbsangu1412@gmail.com"

}]

const updateHandler=(userId)=>{
  console.log(userId)

}
const deleteHandler=(userId)=>{
  console.log(userId)

}
  
    return (
      <Grid minH={"100vh"} css={{
       cursor:`url(${cursor}),default`
      }} templateColumns={['1fr',' 5fr 1fr']}>
       
       <Box py={['0','16']} overflowX={'auto'}>
       <Heading my={"16"} textAlign={['center','left']}>ALL USERS</Heading>
       <TableContainer>
      <Table size={"lg"} >
      <TableCaption>All Available Users In Database</TableCaption>
      <Thead>
        <Tr>
      <Th>Id</Th>
      <Th>Name</Th>

      <Th>Email</Th>

      <Th> Roles</Th>

      <Th>Subscription</Th>
      <Th>Actions</Th>



        </Tr>
      </Thead>
      <Tbody>
      {users.map((item)=>(
        <Row updateHandler={updateHandler} deleteHandler={deleteHandler} key={item._id} item={item}/>
      ))}
      </Tbody>
     



      </Table>



       </TableContainer>
   
       </Box>
       <Sidebar/>
   
      </Grid>
     )
   }
  


export default Users;

function Row({item,updateHandler,deleteHandler}){
return(
  <Tr>
    <Td>{item._id}</Td>
    <Td>{item.name}</Td>
    <Td> {item.email} </Td>
    <Td> {item.role}</Td>
    <Td>{item.subscription.status==='active'?"Active":"Not Active"} </Td>
    <Td> 
     <HStack justifyContent={'flex-end'}>
    <Button onClick={()=>updateHandler(item._id)} variant={"outline"} color={"purple.500"} >Change Role </Button>
    <Button onClick={()=>deleteHandler(item._id)} color='purple.600'>
      <RiDeleteBin7Fill />
    </Button>


    </HStack>
     </Td>
  </Tr>
)

}