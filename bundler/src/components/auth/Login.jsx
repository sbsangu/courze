import {
  Box,
  Container,

  FormLabel,
  Heading,
  Input,
  VStack,
  Stack,
  Button,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  login } from '../../redux/actions/user.js';
import { useNavigate } from 'react-router-dom';
// import { typography } from '@chakra-ui/react';

const Login = ({ isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const submitHandler = async e => {
    e.preventDefault();

    dispatch(login(email, password));

   

    
  };
  
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch]);

  return (
    <Box marginTop={['20', '10']} minH={'95vh'}>
      <Container
        minH={'90vh'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <Heading
          color={'red.400'}
          paddingBottom={'8'}
          marginBottom={'12'}
          paddingTop={'4'}
          textAlign={'center'}
          bgColor={'black'}
        >
          Welcome To Bundler
        </Heading>


       
        <VStack>

        {isAuthenticated ? (
          <h3>You Are Already Logged In</h3>
        ):(

       <div>
       <form onSubmit={submitHandler}>
            <Stack spacing={'7'}>
              <Box>
                <FormLabel>Email Address</FormLabel>
                <Input
                  required
                  type={'email'}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={'ABC@gmail.com'}
                  focusBorderColor={'red.900'}
                ></Input>
              </Box>

              <Box>
                <FormLabel>Passsword</FormLabel>
                <Input
                  required
                  type={'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  focusBorderColor="red.900"
                ></Input>
              </Box>
              <Box>
                <Link to="/forgetpassword">
                  <Button variant={'link'} fontSize={'sm'}>
                    Forget Password?
                  </Button>
                </Link>
              </Box>
              <Box>
                <Button
                  type={'submit'}
                  color={'black'}
                  bgColor={'red.200'}
                  variant={'ghost'}
                >
                  Log In
                </Button>
              </Box>

              <Box>
                New User ?{'     '}{' '}
                <Link to="/register">
                  <Button
                    alignItems={'center'}
                    size={'sm'}
                    colorScheme={'facebook'}
                    variant={'solid'}
                    color={'white'}
                  >
                    {' '}
                    Sign Up{' '}
                  </Button>
                </Link>
              </Box>
            </Stack>
          </form>
       </div>

        )}
          
        </VStack>
      </Container>
    </Box>
  );
};

export default Login;
