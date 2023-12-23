import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
 
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';



const Profile = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
 

  const changeImageSubmitHandler = (e, image) => {
    e.preventDefault();
  };


  const user = {
    name: 'Sangram',
    email: 'sbsangu1412@gmail.com',
    createdAt: String(new Date().toISOString().split('T')[0]),
    role: 'sda',
    subscription: {
      status: 'ac',
    },
    playlist: [
      {
        course: 'dsaj',
        poster: 'shbad',
      },
    ],
  };

  const removeFromPlaylistHandler = id => {
    console.log(id);
  };
  return (
    <Container maxW={'container.lg'} minH={'95vh'}>
      <Heading textTransform={'uppercase'} m={8} textAlign={'center'}>
        {' '}
        Profile
      </Heading>
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding={'8'}
      >
        <VStack>
          <Avatar boxSize={'40'} />
          <Button onClick={onOpen} variant={'ghost'} colorScheme={'yellow'}>
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'}> Name -</Text>
            <Text> {user.name}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Email -</Text>
            <Text> {user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>CreatedAt -</Text>
            <Text> {user.createdAt}</Text>
          </HStack>
          <HStack>
            {user.role !== 'admin' && (
              <HStack>
                <Text fontWeight={'bold'}>
                  Subscription -{'   '}
                  {user.subscription.status === 'active' ? (
                    <Button colorScheme={'yellow'} variant={'ghost'}>
                      Cancel Subscription{' '}
                    </Button>
                  ) : (
                    <Link to="/subscribe">
                      <Button colorScheme={'yellow'} variant={'ghost'}>
                        Subscribe
                      </Button>
                    </Link>
                  )}
                </Text>
              </HStack>
            )}
          </HStack>
          <HStack>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changepassword">
              <Button>Change password</Button>
            </Link>
          </HStack>
        </VStack>
      </Stack>
      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Heading>
          Playlists
          {user.playlist.length > 0 && (
            <Stack
              direction={['column', 'row']}
              alignItems={'center'}
              flexWrap={'wrap'}
              p={4}
            >
              {user.playlist.map((element, index) => (
                <VStack w={'48'} m={2} key={element.course}>
                  <Image
                    boxSize={'full'}
                    src={element.poster}
                    objectFit={'contain'}
                    alt="courses"
                  />
                  <HStack>
                    <Link to={`/courses/${element.course}`}>
                      <Button colorScheme={'yellow'} variant={'ghost'}>
                        Watch Now
                      </Button>
                    </Link>
                    <Button
                      onClick={() => removeFromPlaylistHandler(element.course)}
                    >
                      <RiDeleteBin7Fill />
                    </Button>
                  </HStack>
                </VStack>
              ))}
            </Stack>
          )}
        </Heading>
      </Stack>
      <ChangePhotoBox
        changeImageSubmitHandler={changeImageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler }) {
  const [imgPrev, setImgPrev] = useState('');
  const [image, setImage] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler=()=>{
    onClose();
    setImgPrev('');
    setImage('')
}

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={8}>
                <Avatar boxSize={40} src={imgPrev} />
                <Input
                  type={'file'}
                  onChange={changeImage}
                  css={{
                    '&::file-selector-button': {
                      cursor: 'pointer',
                      marginLeft: '-17px',

                      padding: '4px',
                      width: '110%',
                      border: 'none',
                      height: '100%',
                      backgroundColor: 'gray',
                      color: 'white',
                    },
                  }}
                />
                <Button w={'100%'} colorScheme={'yellow'} type={'submit'}>
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeHandler} colorScheme={'yellow'}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
