import Head from 'next/head'
import Header from '../components/shared/Header/Header'
import Purchase from '../components/PurchasePage/PurchasePage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Purchase />
    </>
  )
}
