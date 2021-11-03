// import BannerLoginPage from "../../components/BannerLoginPage/BannerLoginPage";
import LoginPage from "../../components/LoginPage/LoginPage";
import * as rdd from 'react-device-detect'
import dynamic from "next/dynamic";
export default function Login(){
    const BannerLoginPage = dynamic(import('../../components/BannerLoginPage/BannerLoginPage'))
    const Header = dynamic(import('../../components/shared/Header/HeaderHome'))
    const Footer = dynamic(import('../../components/FooterPage/FooterPage'))
    const Login = dynamic(() => rdd.isDesktop ? import('../../components/LoginPage/desktop/LoginPage') : import('../../components/LoginPage/mobile/LoginPage'))
    
    return(
        <div className="w-full flex">
            {rdd.isMobile && <Header />}
            {rdd.isDesktop && <BannerLoginPage />}
            <Login />
        </div>
    )
}