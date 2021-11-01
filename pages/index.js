import Head from 'next/head'
import FooterPage from '../components/FooterPage/FooterPage'
import HomePage from '../components/HomePage/HomePage'
import HeaderHome from '../components/shared/Header/HeaderHome'

export default function Home(props) {
  const { id } = props
  console.log(id)
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

Home.getInitialProps = async ctx => {
  const { query } = ctx;
  return {
    id: query ? query.id : '',
  };
};