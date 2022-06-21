import NLink from "next/link";
import { useRouter } from 'next/router';
import { useAuth } from "../context/AuthUserContext";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
  } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

const Links = [{name: 'Conciertos', route: '/concerts'}, {name: 'Eventos', route: '/events'}, {name: 'Deportes', route: '/sports'}];

const NavLink = ({ children, route }) => (
    <Link
      px={2}
      py={1}
      as={NLink}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={route}>
      {children}
    </Link>
  );

export default function Layout({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { authUser, signOut } = useAuth();
    const router = useRouter();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <NavLink route='/'>Bolxs!!</NavLink>
                    <HStack
                    as={'nav'}
                    spacing={4}
                    display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link, i) => (
                            <NavLink key={i} route={link.route}>{link.name}</NavLink>
                        ))}
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Button
                    variant={'solid'}
                    colorScheme={'teal'}
                    size={'sm'}
                    mr={4}
                    onClick={() => router.push('/createEvent')}
                    leftIcon={<AddIcon />}>
                    Agregar Evento
                    </Button>
                    {authUser ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                size={'sm'}
                                src={
                                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={signOut}>Salir</MenuItem>
                            </MenuList>
                        </Menu>
                    ) :(
                        <Link href='/login'>
                            Acceder
                        </Link>
                    )}
                </Flex>
                </Flex>

                {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        <NavLink route="/">Home</NavLink>
                        {Links.map((link, i) => (
                            <NavLink key={i} route={link.route}>{link.name}</NavLink>
                        ))}
                    </Stack>
                </Box>
                ) : null}
            </Box>

            <Box p={4}>{children}</Box>
        </>
    )
}