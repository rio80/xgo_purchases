import BannerLoginPage from "../../components/BannerLoginPage/BannerLoginPage";
import LoginPage from "../../components/LoginPage/LoginPage";

export default function Login(){
    return(
        <div className="w-full flex">
            <BannerLoginPage />
            <LoginPage />
        </div>
    )
}