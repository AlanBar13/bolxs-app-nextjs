import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
} from '@chakra-ui/react';
import Alerts from '../components/alert';
import Head from 'next/head';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState({status: false, type: '', title: ''});
    const {signInWithEmail} = useAuth();
    const router = useRouter();

    const login = async () => {
        try {
            setShowAlert({status: false, type: '', title: ''});
            await signInWithEmail(email, password);
            router.push('/');
        } catch (error) {
            const errorCode = error.code;
            switch(errorCode) {
                case 'auth/user-not-found':
                    setShowAlert({status: true, type: 'error', title: 'Usuario no encontrado'});
                    break;
                case 'auth/wrong-password':
                    setShowAlert({status: true, type: 'error', title: 'Contraseña incorrecta'});
                    break;
                case 'auth/invalid-email':
                    setShowAlert({status: true, type: 'error', title: 'Email incorrecto'});
                    break;
                default:
                    setShowAlert({status: true, type: 'error', title: 'Revisar usuario y contraseña'});
            }
        }
    }

    return (
        <>
            <Head>
                <title>Bolxs!! Login</title>
            </Head>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'2xl'}>Accede a tu cuenta</Heading>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Contraseña</FormLabel>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                        </FormControl>
                        <Stack spacing={6}>
                            <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                                <Checkbox>Recuerdame</Checkbox>
                                <Link color={'blue.500'}>Olvidaste tu contraseña?</Link>
                            </Stack>
                            <Button colorScheme={'blue'} variant={'solid'} onClick={() => login()}>
                                Login
                            </Button>
                            {showAlert.status && (
                                <Alerts type={showAlert.type} title={showAlert.title} />
                            )}
                        </Stack>
                    </Stack>
                </Flex>
                <Flex flex={1}>
                    <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                    />
                </Flex>
            </Stack>
        </>
    )
}