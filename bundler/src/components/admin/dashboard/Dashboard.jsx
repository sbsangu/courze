import React from 'react'
import { Container,Grid,Box,Text, Heading,HStack, Stack,Progress, VStack} from '@chakra-ui/react'
import Sidebar from '../Sidebar.jsx'
import cursor from "../../../assets/images/cursor.png"
import {RiArrowDownLine,RiArrowUpLine} from "react-icons/ri"
import { DoughnutChart, LineChart } from './Chart.jsx'

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p="8"
    borderRadius={'lg'}
  >
    <Text children={title} />

    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight="bold" children={qty} />

      <HStack>
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={0.6} children={'Since Last Month'} />
  </Box>
);

const Bar = ({ title, value, profit }) => (
  <Box py="4" px={['0', '20']}>
    <Heading size="sm" children={title} mb="2" />

    <HStack w="full" alignItems={'center'}>
      <Text children={profit ? '0%' :`-${value}%`} />

      <Progress w="full" value={profit ? value : 0} colorScheme="purple" />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const Dashboard = () => {
  return (
   <Grid minH={"100vh"} css={{
    cursor:`url(${cursor}),default`
   }} templateColumns={['1fr',' 5fr 1fr']} maxW={'auto'}>
    
    <Box py={"16"} width={"full"}>
    <Text opacity={'0.7'} textAlign={'center'}>
        {`Last change was on ${String(new Date()).split("G")[0]}`}
       </Text>
       <Heading textAlign={['center','left']} mt={['4',"6"]} ml={['0',"16"]}>Dashboard</Heading>
       
       <Stack
            direction={['column', 'row']}
            minH="24"
            justifyContent={'space-evenly'}
            mt={"8"}
          >
            <Databox qty={23} title="Views" qtyPercentage={45} profit={true}/>
            <Databox qty={54} title="users" qtyPercentage={4} profit={true}/>
            <Databox qty={3} title="Subscription" qtyPercentage={25} profit={false}/>
            </Stack>
            <Box 
            m={['0', '16']}
            borderRadius="lg"
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
          >
            <Heading
              textAlign={['center', 'left']}
              size="md"
              children="Views Graph"
              pt={['8', '0']}
              ml={['0', '16']}
            />

          <VStack >
          <LineChart/>
          </VStack>
          </Box>
          <Grid templateColumns={['1fr', ' 1fr']}>
            <Box p="4">
              <Heading
                textAlign={['center', 'left']}
                size="md"
                children="Progress Bar"
                my="8"
                ml={['0', '16']}
              />
              <Box>
<Bar title="Views" value={45} profit={true} />
<Bar title="Users" value={4} profit={true} />
<Bar title="Subscription" value={25} profit={false}/>

              </Box>
              <VStack height={"400px"}>
              <DoughnutChart/>
            </VStack>
            

</Box>
          </Grid>

    </Box>
    <Sidebar/>

   </Grid>
  )
}

export default Dashboard