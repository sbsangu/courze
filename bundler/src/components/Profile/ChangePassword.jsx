import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  return (
    <Container minH={'90vh'} padding={'16'}>
      <Heading mb={'8'}>CHANGE PASSWORD</Heading>
      <FormControl>
        <VStack spacing={'8'}>
          <Input
            required={'true'}
            type={'password'}
            value={oldPassword}
            onChange={e => {
              setOldPassword(e.target.value);
            }}
            placeholder="Enter Old Password"
            focusBorderColor="yellow.500"
          ></Input>
          <Input
            required={'true'}
            type={'password'}
            value={newPassword}
            onChange={e => {
              setNewPassword(e.target.value);
            }}
            placeholder="Enter New Password"
            focusBorderColor="yellow.500"
          ></Input>
          <Button width={'full'} type="submit" colorScheme={'yellow'}>
            Change
          </Button>
        </VStack>
      </FormControl>
    </Container>
  );
};

export default ChangePassword;
