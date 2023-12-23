import React,{useState} from 'react'
import {
    Button,
    Container,
    
    Heading,
    Input,
    VStack,
  } from '@chakra-ui/react';

const UpdateProfile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  return (
    <Container minH={'90vh'} padding={'16'}>
    <Heading mb={'8'}>UPDATE PROFILE</Heading>
    <form>
      <VStack spacing={'8'}>
        <Input
          required={'true'}
          type={'text'}
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          placeholder="Enter  Your Name"
          focusBorderColor="yellow.500"
        ></Input>
     <Input
          required={'true'}
          type={'email'}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Your Email"
          focusBorderColor="yellow.500"
        ></Input>
        <Button width={'full'} type="submit" colorScheme={'yellow'}>
         Update 
        </Button>
      </VStack>
    </form>
  </Container>
  )
}

export default UpdateProfile