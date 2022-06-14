import Layout from "../components/layout"

export async function getStaticProps(){
  const res = await fetch('http://localhost:5000/api/v1/events')
  const { data } = await res.json()
  return {
    props: {
      events: data
    },
    revalidate: 10
  }
}

export default function Home({events}) {
  console.log(events)
  return (
    <>
      <Layout>
        <div>Home</div>
      </Layout>
    </>
  )
}
