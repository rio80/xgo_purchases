import * as rdd from 'react-device-detect'
import dynamic from "next/dynamic";
import Head from 'next/head';

export default function Login() {
    const BannerLoginPage = dynamic(import('../../components/BannerLoginPage/BannerLoginPage'))
    const Header = dynamic(import('../../components/shared/Header/HeaderHome'))
    const Footer = dynamic(import('../../components/FooterPage/FooterPage'))
    const Register = dynamic(() => rdd.isDesktop ? import('../../components/RegisterPage/desktop/RegisterPage') : import('../../components/RegisterPage/mobile/RegisterPage'))

    return (
        <>
            <Head>
                <title>Daftar | My Transvision 2.0</title>
                <link rel="icon" href={'../png/favicon.png'} />
            </Head>
            <div className="w-full flex">
                {rdd.isMobile && <Header />}
                {rdd.isDesktop && <BannerLoginPage />}
                <Register />
            </div>
        </>
    )
}