import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React from 'react'
import FooterPage from '../../components/FooterPage/FooterPage'
import HeaderHome from '../../components/shared/Header/HeaderHome'
import VoucherPage from '../../components/VoucherPage/VoucherPage'

export default function voucher() {
    const router = useRouter()
    const [loadPage, setLoadPage] = React.useState(false)
    const auth = Cookies.get('auth')

    React.useEffect(() => {
        if (typeof auth !== 'undefined') {
            setLoadPage(true);
        } else {
            router.push('/login')
        }
    }, [])

    if (!loadPage) {
        return <></>;
    }

    return (
        <>
            <HeaderHome />
            <VoucherPage />
            <FooterPage variant={'pastlogin'} />
        </>
    )
}