import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthUserContext';
import Head from 'next/head';
import Layout from '../../components/Layouts/layout';
import UserSideBar from '../../components/Layouts/usersLayout';
import { Button } from '@chakra-ui/react';

export default function User() {
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!authUser && !isLoading) {
      router.push('/login');
    }
  }, [authUser]);
  return (
    <>
      <Head>
        <title>Perfil</title>
      </Head>
      <Layout>
        <UserSideBar>
          <div>Users</div>
          <Button
            colorScheme='primary'
            onClick={() => router.push('/createEvent')}>
            Create event
          </Button>
          <Button
            bg='rgba(244,63,94,0.1)'
            color='#f43f5e'
            _hover={{ bg: 'rgba(244,63,94,0.3)' }}
            _active={{ bg: 'rgba(244,63,94,0.2)' }}
            onClick={signOut}>
            Logout
          </Button>
          {authUser && JSON.stringify(authUser)}
        </UserSideBar>
      </Layout>
    </>
  );
}
