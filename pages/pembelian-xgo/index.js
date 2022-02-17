import dynamic from 'next/dynamic'
import HeaderHome from '../../components/shared/Header/HeaderHome'
import * as rdd from 'react-device-detect'
import React from 'react'
import { getDataXgo } from '../../utils/apiHandlers'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function Xgo(props) {
    const Minipack = dynamic(() => rdd.isDesktop ? import('../../components/PembelianPage/Xgo/desktop/MinipackXgoPage') : import('../../components/PembelianPage/Xgo/mobile/MinipackXgoPage'))

    const { type, trxid } = props
    const router = useRouter()
    const [loadPage, setLoadPage] = React.useState(false);
    const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
    const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');

    React.useEffect(() => {
        if (type === 'mbl') {
            (async () => {
                try {
                    const trx = await getDataXgo(trxid)
                    if (trx?.data?.status) {
                        const exp = new Date().getTime() + (60 * 60 * 24 * 1000 * 7);
                        Cookies.set("auth", CryptoJS.AES.encrypt(trx?.data?.result?.payload?.user_id, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(), {
                            expires: exp,
                        });
                        setLoadPage(true);
                    }
                } catch (e) {
                    Cookies.remove('auth')
                    router.push('/')
                }
            })()
        } else {
            setLoadPage(true);
        }
    }, [])

    if (!loadPage) {
        return <></>;
    }

    return (
        <>
            <HeaderHome variant="pastlogin" />
            <Minipack />
        </>
    )
}

Xgo.getInitialProps = async ctx => {
    const { query } = ctx;
    return {
        type: query ? query.type : '',
        trxid: query ? query.trxid : ''
    };
};