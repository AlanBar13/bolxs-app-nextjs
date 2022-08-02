import { useEffect } from "react"
import { useRouter } from 'next/router';
import { useAuth } from "../../context/AuthUserContext";
import Head from "next/head";
import Layout from "../../components/Layouts/layout"
import UserSideBar from "../../components/Layouts/usersLayout";

export default function User() {
    const { authUser, isLoading} = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!authUser && !isLoading) {
            router.push("/login");
        }
    }, [authUser]);
    return (
        <>
            <Head><title>Perfil</title></Head>
            <Layout>
                <UserSideBar>
                    <div>Users</div>
                    {authUser && JSON.stringify(authUser)}
                </UserSideBar>
            </Layout>
        </>
    )
}