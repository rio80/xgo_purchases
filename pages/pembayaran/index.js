import dynamic from "next/dynamic";
import HeaderHome from "../../components/shared/Header/HeaderHome";
import * as rdd from "react-device-detect"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Pembayaran(props) {
    const { type } = props
    const router = useRouter()
    const auth = Cookies.get('auth')
    const [loadPage, setLoadPage] = useState(false);

    useEffect(() => {
        let payment = ''
        if (typeof window !== 'undefined') {
            payment = localStorage.getItem('payment');
        }

        if (typeof auth !== 'undefined' && payment !== null) {
            setLoadPage(true);
        } else {
            router.push('/login')
        }
    }, [])


    if (!loadPage) {
        return <></>;
    }

    const Pembayaran = dynamic(() => rdd.isDesktop ? import('../../components/PembayaranPage/desktop/PembayaranPage') : import('../../components/PembayaranPage/mobile/PembayaranPage'))
    return (
        <>
            <HeaderHome variant={'pastlogin'} />
            <Pembayaran type={type} />
        </>
    )
}

Pembayaran.getInitialProps = async ctx => {
    const { query } = ctx;
    return {
        type: query ? query.type : '',
    };
};