import * as React from 'react'
import BannerLoginPage from '../../../components/BannerLoginPage/BannerLoginPage';
import ResetPasswordPage from '../../../components/ResetPasswordPage/ResetPasswordPage';
import { useRouter } from 'next/router';

export default function ResetAccount(props) {
    const router = useRouter()
    const [loadPage, setLoadPage] = React.useState(false);

    React.useEffect(() => {
        if (props.token !== undefined && props.email !== undefined) {
            setLoadPage(true);
        } else {
            router.push('/')
        }
    }, [])


    if (!loadPage) {
        return <></>;
    }

    return (
        <div className="w-full flex">
            <BannerLoginPage />
            <ResetPasswordPage data={props} />
        </div>
    )
}

ResetAccount.getInitialProps = async ctx => {
    const { query } = ctx;
    return {
        token: query ? query.token : '',
        email: query ? query.email : ''
    };
};