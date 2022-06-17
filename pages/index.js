import Head from "next/head"
import Layout from "../components/layout"
import {api} from '../utils/api'
import dynamic from "next/dynamic"

const EventsTable = dynamic(() => import('../components/eventsTable'), { ssr: false })

export async function getStaticProps(){
  const res = await fetch(`${api}/events`)
  const { data } = await res.json()
  return {
    props: {
      events: data
    },
    revalidate: 10
  }
}

export const titlePage = "Bolxs!!";

export default function Home({events}) {
  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="og:title" content={titlePage} />
      <meta
        name="description"
        content="Platoforma para la creacion y compra de tickets para eventos de todo tipo"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <title>{titlePage}</title>
    </Head>
      <Layout>
        <div>Home</div>
        <EventsTable events={events} />
      </Layout>
    </>
  )
}
