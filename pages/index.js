import Layout from "../components/layout"
import {api} from '../utils/api'

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

export default function Home({events}) {
  return (
    <>
      <Layout>
        <div>Home</div>
      </Layout>
    </>
  )
}
