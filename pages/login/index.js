import * as rdd from 'react-device-detect'
import dynamic from "next/dynamic";
import Head from 'next/head';

export default function Login() {
    const BannerLoginPage = dynamic(import('../../components/BannerLoginPage/BannerLoginPage'))
    const Header = dynamic(import('../../components/shared/Header/HeaderHome'))
    const Footer = dynamic(import('../../components/FooterPage/FooterPage'))
    const Login = dynamic(() => rdd.isDesktop ? import('../../components/LoginPage/desktop/LoginPage') : import('../../components/LoginPage/mobile/LoginPage'))

    return (
        <>
            <Head>
                <title>Masuk | My Transvision 2.0</title>
                <link rel="icon" href={'../png/logo.png'} />
            </Head>
            <div className="w-full flex">
                {rdd.isMobile && <Header variant={'login'} />}
                {rdd.isDesktop && <BannerLoginPage />}
                <Login />
            </div>
        </>
    )
}