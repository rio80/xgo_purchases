import Head from 'next/head'
import FooterPage from '../components/FooterPage/FooterPage'
import HeaderHome from '../components/shared/Header/HeaderHome'
import * as rdd from 'react-device-detect';
import dynamic from 'next/dynamic'

export default function Home() {
  const Home = dynamic(() => rdd.isDesktop ? import('../components/HomePage/desktop/HomePage') : import('../components/HomePage/mobile/HomePage'))
  return (
    <>
      <HeaderHome />
      <Home />
      <FooterPage />
    </>
  )
}