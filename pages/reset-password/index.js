import BannerLoginPage from "../../components/BannerLoginPage/BannerLoginPage";
import ResetPage from "../../components/ResetPasswordPage/ResetPasswordPage";

export default function ForgetPassword(){
    return (
        <div className="w-full flex">
            <BannerLoginPage />
            <ResetPage />
        </div>
    )
}