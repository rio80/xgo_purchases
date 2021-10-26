import Head from 'next/head'
import FooterPage from '../components/FooterPage/FooterPage'
import HomePage from '../components/HomePage/HomePage'
import HeaderHome from '../components/shared/Header/HeaderHome'

export default function Home() {
  return (
    <>
      <Head>
        <title>Payment - XGO</title>
        <link rel="icon" href={'../png/logo.png'} />
      </Head>

      <HeaderHome />
      <HomePage />
      <FooterPage />
    </>
  )
}
