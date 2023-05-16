import React from 'react';
import ColorModeSwitch from '../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxRFill, RiMenu5Fill } from 'react-icons/ri';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

const Option = ({ onClose, url, title }) => (
  <Link to={url}>
    <Button onClick={onClose} variant={'ghost'}>
      {title}
    </Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const logclose = () => {
    onClose();

    dispatch(logout());
  };

  return (
    <>
      <ColorModeSwitch />
      <Button
        zIndex={'overlay'}
        onClick={onOpen}
        position={'fixed'}
        colorScheme={'yellow'}
        rounded={'full'}
        top={'4'}
        left={'4'}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement={'left'} onClick={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            fontWeight={'600'}
            fontFamily={'sans-serif'}
            fontSize={'3xl'}
            textAlign={'center'}
          >
            Course Bundler
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={['2', '5']} alignItems={'flex-start'}>
              <Option onClose={onClose} url="/" title="Home" />
              <Option
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <Option
                onClose={onClose}
                url="/request"
                title="Request A Course"
              />
              <Option onClose={onClose} url="/contact" title="Contact" />
              <Option onClose={onClose} url="/about" title="About" />

              <HStack
                position="absolute"
                bottom={'2rem'}
                left={'2rem'}
                width={'80%'}
                justifyContent={'space-evenly'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        {' '}
                        <Link to="/profile">
                          <Button onClick={onClose} colorScheme={'yellow'}>
                            Profile
                          </Button>
                        </Link>
                        <Button onClick={logclose}>
                          <RiLogoutBoxRFill />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link onClick={onClose} to="/admin/dashboard">
                          <Button colorScheme={'purple'} variant={'ghost'}>
                            <RiDashboardFill />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to="/login">
                      <Button colorScheme={'yellow'}> Log In</Button>
                    </Link>
                    <p>OR</p>
                    <Link onClick={onClose} to="/register">
                      <Button colorScheme={'yellow'}>Sign Up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
