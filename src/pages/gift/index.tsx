import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/src/components/Layout'

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Gift</title>
      </Head>
      <h1>Home</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}

export default Home