import * as React from 'react'
import BannerLoginPage from '../../../components/BannerLoginPage/BannerLoginPage';
import ResetPasswordPage from '../../../components/ResetPasswordPage/ResetPasswordPage';

export default function ResetAccount(props) {
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