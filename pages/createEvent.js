import { useEffect } from "react"
import { useRouter } from 'next/router';
import { useAuth } from "../context/AuthUserContext";
import Layout from "../components/layout"
import Head from "next/head";
import EventForm from "../components/createEventForm";


export default function CreateEvent(){
    const router = useRouter();
    const { authUser, isLoading } = useAuth();

    useEffect(() => {
        if(!authUser && !isLoading) {
            router.push('/login');
        }
    }, [authUser, isLoading]);
    return(
        <>
            <Head>
                <title>Crear Evento</title>
            </Head>
            <Layout>
                <EventForm/>
            </Layout>
        </>
    )
}