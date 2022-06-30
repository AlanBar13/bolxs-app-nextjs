import Layout from "../components/Layouts/layout"
import SEO from "../components/seo"
import {api} from '../lib/api'
import dynamic from "next/dynamic"

const EventsTable = dynamic(() => import('../components/Views/Events/eventsTable'), { ssr: false })

export async function getStaticProps(){
  const res = await fetch(`${api}/events`)
  const { data } = await res.json()
  return {
    props: {
      events: data
    },
    revalidate: 5
  }
}

export const titlePage = "Bolxs!!";
export const descriptionPage = "Platoforma para la creacion y compra de tickets para eventos de todo tipo";

export default function Home({events}) {
  return (
    <> 
      <SEO title={titlePage} description={descriptionPage} />
      <Layout>
        <div>Home</div>
        <EventsTable events={events} />
      </Layout>
    </>
  )
}
