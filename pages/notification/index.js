import BannerLoginPage from "../../components/BannerLoginPage/BannerLoginPage";
import EmailNotificationPage from "../../components/EmailNotificationPage/EmailNotificationPage";

export default function notification() {
    return (
        <div className="w-full flex">
            <BannerLoginPage />
            <EmailNotificationPage />
        </div>

    )
}