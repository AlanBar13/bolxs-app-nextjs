import Head from "next/head"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import {api} from '../../lib/api'
import ProductDetails from '../../components/productDetails'

export async function getStaticProps({ params }){
    const id = params.name.split('$$')[1]
    const res = await fetch(`${api}/events/${id}`)
    const event = await res.json()
    if (event.error) {
        return {
            props: {},
            notFound: true
        }
    }

    return {
        props: {
          event: event.data,
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${api}/events`)
    const { data } = await res.json()
  
    const paths = data.map((event) => ({
      params: { name: event.long_url },
    }))
    return { paths, fallback: 'blocking' }
}

export default function Event({ event }) {
    return (
        <>
            <SEO title={event.name} description={event.description} image={event.banner} />
            <Layout>
                <ProductDetails event={event} />
            </Layout>
        </>
    )
}