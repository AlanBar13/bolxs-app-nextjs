import {useState, useEffect} from 'react'
import Head from "next/head"
import { api } from '../../../lib/api'
import useSWR from 'swr'
import Layout from "../../../components/Layouts/layout"
import { useAuth } from '../../../context/AuthUserContext'
import UserEvent from '../../../components/Views/Users/UserEvent'
import { Button, Text, Spinner, Flex, Grid } from '@chakra-ui/react'

export default function Users() {
    const { authUser, isLoading } = useAuth()

    useEffect(() => {
        if (!authUser && !isLoading) {
            router.push("/login");
        }
    }, [authUser]);

    const fetcher = (url) => fetch(url, { headers: {'Authorization': `Bearer ${authUser.token}`}}).then(r => r.json())
    const { data, error } = useSWR(`${api}/user/events`, fetcher)
    console.log(data)

    return (
        <>
            <Head><title>Eventos</title></Head>
            <Layout>
                <div>Events Summary</div>
                {!data && <Spinner size='lg' />}
                <Flex
                    direction="column"
                    justifyContent="center"
                    maxW={{ xl: "1200px" }}
                    m="0 auto"
                    minH="100vh"
                    >
                    <Grid
                        w="full"
                        gridGap="5"
                        gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
                    >
                        {data && data.data.map(event => <UserEvent key={event.ID} event={event} />)}
                    </Grid>
                </Flex>
                {error ? <div>{JSON.stringify(error)}</div> : null}
            </Layout>
        </>
    )
}