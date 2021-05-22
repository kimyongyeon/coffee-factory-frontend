import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from 'antd';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image src="/images/profile.jpg" alt="Your Name" width={400} height={400} />
        <div className="App">
          <Button type="primary">커피공장</Button>
        </div>
      </main>
    </div>
  )
}
