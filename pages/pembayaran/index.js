import dynamic from "next/dynamic";
import HeaderHome from "../../components/shared/Header/HeaderHome";
import * as rdd from "react-device-detect"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDataStb, getMinipack } from "../../utils/apiHandlers";
import config from "../../utils/config";

export default function Pembayaran(props) {
    const { type, trxid } = props
    const router = useRouter()
    const auth = Cookies.get('auth')
    const [loadPage, setLoadPage] = useState(false);
    const [data, setData] = useState('')
    const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
    const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');

    function encryptEmail(email) {

        const exp = new Date().getTime() + (60 * 60 * 24 * 1000 * 7);

        const encrypted = Cookies.set("auth", CryptoJS.AES.encrypt(email, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(), {
            expires: exp,
        });

        return encrypted
    }

    useEffect(() => {
        let payment = ''
        if (typeof window !== 'undefined') {
            payment = localStorage.getItem('payment');
        }

        if (type === 'stb') {
            (async () => {
                try {
                    const trx = await getDataStb(trxid)
                    if (trx?.data?.status) {
                        const exp = new Date().getTime() + (60 * 60 * 24 * 1000 * 7);
                        Cookies.set("auth", CryptoJS.AES.encrypt(trx?.data?.result?.payload?.user_id, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(), {
                            expires: exp,
                        });

                        const checkout = {
                            package_id: +config.idPackage,
                            receiver_type: 'SELF',
                            activation_process: 'IMMEDIATE',
                            minipack_id: +trx?.data?.result?.minipack?.result?.[0]?.plans?.[0]?.minipack_id,
                            total_amount: +trx?.data?.result?.minipack?.result?.[0]?.plans?.[0]?.price
                        }

                        const payment = {
                            app_id: "webxgo",
                            payment_type: "internal_app",
                            app_url_validation: "https://xgo.co.id/api/validate/id=123321",
                            app_url_callback: config.domain,
                            amount: +trx?.data?.result?.minipack?.result?.[0]?.plans?.[0]?.price,
                            item_details: [
                                {
                                    id: trx?.data?.result?.minipack?.result?.[0]?.plans?.[0]?.minipack_id,
                                    price: +trx?.data?.result?.minipack?.result?.[0]?.plans?.[0]?.price,
                                    quantity: 1,
                                    name: trx?.data?.result?.minipack?.result?.[0]?.plans?.[0]?.minipack
                                }
                            ]
                        }

                        const dataPaket = {
                            paket: trx?.data?.result?.minipack?.result?.[0]?.plans?.[0]?.minipack,
                            durasi: trx?.data?.result?.minipack?.result?.[0]?.plans?.[0]?.duration
                        }

                        Cookies.set('paket', JSON.stringify(dataPaket));
                        localStorage.setItem('checkout', JSON.stringify(checkout));
                        localStorage.setItem('payment', JSON.stringify(payment));
                        setLoadPage(true);
                    } else {
                        router.push('/')
                    }
                } catch (e) {
                    router.push('/')
                }
            })();
        } else {
            if (typeof auth !== 'undefined' && payment !== null) {
                setLoadPage(true);
            } else {
                router.push('/login')
            }
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
        trxid: query ? query.trxid : ''
    };
};