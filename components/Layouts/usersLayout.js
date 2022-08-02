import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Text,
} from '@chakra-ui/react';
import {
  FiHome,
  FiCompass,
} from 'react-icons/fi';
import { IoTicketOutline } from 'react-icons/io5';
import { useAuth } from '../../context/AuthUserContext';

const LinkItems = [
    { name: 'Historial Boletos', icon: IoTicketOutline },
    { name: 'Perfil', icon: FiHome },
    { name: 'Eventos Organizados', icon: FiCompass },
];

export default function UserSideBar({ children }){
    return (
        <Box minH="100vh">
          <SidebarContent
            display={{ base: 'none', md: 'block' }}
          />
          <Box ml={{ base: 0, md: 60 }} p="4">
            {children}
          </Box>
        </Box>
    );
}

const SidebarContent = ({ ...rest }) => {
    const { authUser } = useAuth();
    console.log(authUser);
    return (
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Hola! {authUser ? authUser.name : 'Jose'}
          </Text>
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    );
};

const NavItem = ({ icon, children, ...rest }) => {
    return (
      <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };