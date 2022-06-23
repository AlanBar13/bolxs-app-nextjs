import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthUserContext';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { api } from '../lib/api';
import Head from 'next/head';
import Alerts from '../components/alert';
import { useRouter } from 'next/router';
  
export default function Signup() {
    const [name, setName] = useState("Jhon")
    const [lastname, setLastname] = useState("Doe")
    const [email, setEmail] = useState("test@test.com")
    const [password, setPassword] = useState("123456")
    const [cpassword, setCPassword] = useState("123456")
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState({status: false, type: '', title: ''});
    const { createUserWithEmail, isLoading, authUser } = useAuth()
    const router = useRouter()

    const createAccount = async () => {
        setShowAlert({status: false, type: '', title: ''})
        console.log(name, lastname, email, password, cpassword)
        if (name === "" || lastname === "" || email === "" || password === "" || cpassword === ""){
            setShowAlert({status: true, type: 'warning', title: 'Los campos no pueden estar vacios'})
            return
        }

        if (password !== cpassword){
            setShowAlert({status: true, type: 'error', title: 'Las contraseñas no coinciden'})
            return
        }

        try {
            await createUserWithEmail(email, password, name, lastname)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(authUser) {
            router.replace('/')
        }
    },[authUser, router]);
  
    return (
      <>
        <Head>
            <title>Crear cuenta</title>
        </Head>
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool features ✌️
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                <HStack>
                    <Box>
                    <FormControl id="firstName" isRequired>
                        <FormLabel>Nombre(s)</FormLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    </FormControl>
                    </Box>
                    <Box>
                    <FormControl id="lastName" isRequired>
                        <FormLabel>Apellido(s)</FormLabel>
                        <Input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" />
                    </FormControl>
                    </Box>
                </HStack>
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <InputGroup>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                    <InputRightElement h={'full'}>
                        <Button
                        variant={'ghost'}
                        onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl id="password-confirm" isRequired>
                    <FormLabel>Confirmar Contraseña</FormLabel>
                    <InputGroup>
                    <Input value={cpassword} onChange={(e) => setCPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                    <InputRightElement h={'full'}>
                        <Button
                        variant={'ghost'}
                        onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                    <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    onClick={() => createAccount()}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Crear cuenta
                    </Button>
                </Stack>
                {showAlert.status ? (<Alerts title={showAlert.title} type={showAlert.type} />): (<Box></Box>)}
                <Stack pt={6}>
                    <Text align={'center'}>
                    Ya eres usuario? <Link color={'blue.400'} href="/login">Login</Link>
                    </Text>
                </Stack>
                </Stack>
            </Box>
            </Stack>
        </Flex>
      </>
    );
}