import BannerLoginPage from "../../components/BannerLoginPage/BannerLoginPage";
import ForgetPage from "../../components/ForgetPasswordPage/ForgetPasswordPage";
import Head from 'next/head';

export default function ForgetPassword() {
    return (
        <>
            <Head>
                <title>Lupa Password | My Transvision 2.0</title>
                <link rel="icon" href={'../png/logo.png'} />
            </Head>
            <div className="w-full flex">
                <BannerLoginPage />
                <ForgetPage />
            </div>
        </>
    )
}