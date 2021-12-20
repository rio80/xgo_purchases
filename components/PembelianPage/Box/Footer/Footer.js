import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useSelector } from 'react-redux'
import config from '../../../../utils/config'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Footer() {
    const Router = useRouter()
    const [disabled, setDisabled] = React.useState(true)
    const data = useSelector((state) => state.FooterReducer)
    const dataCheckout = useSelector((state) => state.CheckoutReducer)
    const [payment, setPayment] = React.useState({
        app_id: "webxgo",
        payment_type: "internal_app",
        app_url_validation: "https://xgo.co.id/api/validate/id=123321",
        app_url_callback: config.domain
    })

    React.useEffect(() => {
        let cek = 0
        Object.keys(dataCheckout).map((data) => {
            if (dataCheckout[data] === '') {
                cek++
            }
        })
        if (cek > 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [dataCheckout])


    const handleCheckout = () => {
        if (!disabled) {
            let dataPayment = {
                ...payment,
                amount: +dataCheckout.TotalProductPrice + +dataCheckout.CourierFee,
                item_details: [
                    {
                        id: +dataCheckout.PackageId,
                        price: (+dataCheckout.TotalProductPrice) + (+dataCheckout.CourierFee),
                        quantity: +dataCheckout.Qty,
                        name: data?.produk?.paket
                    }
                ]
            }

            let dataPaket = {
                name: data?.produk?.paket
            }

            Cookies.set('paket', JSON.stringify(dataPaket));
            localStorage.setItem('checkout', JSON.stringify(dataCheckout));
            localStorage.setItem('payment', JSON.stringify(dataPayment));
            Router.push('/pembayaran?type=box')
        }
    }

    return (

        <div className="sticky bg-white bottom-0 right-0 left-0 h-auto z-20 flex flex-row" style={{ borderLeft: '6px solid #0285e4', boxShadow: '0 -4px 8px 0 rgba(0, 0, 0, 0.06)' }}>
            <div className="w-1/2">
                <div className="ml-28 py-3 flex flex-col">
                    <div>
                        <p className="text-xs font-mendium">DATA ANDA</p>
                    </div>
                    <div className="my-2">
                        <p className="text-lg font-semibold">{data?.data?.nama}</p>
                    </div>
                    <div>
                        <p className="text-xs font-mendium">{data?.data?.alamat}</p>
                    </div>
                </div>
            </div>
            <div className="w-3/5 flex-grow">
                <div className="flex flex-row">
                    <div className="border-l-2 h-auto w-56 flex">
                        <div className="mx-auto py-3 flex flex-col px-2">
                            <div>
                                <p className="text-xs text-center font-mendium">PRODUK</p>
                            </div>
                            <div className="my-2">
                                <p className="text-lg text-center font-semibold">{data?.produk?.nama}</p>
                            </div>
                            <div>
                                <p className="text-xs text-center font-mendium">{data?.produk?.paket}</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-l-2 h-auto w-56">
                        <div className="mx-auto py-3 flex flex-col px-2">
                            <div>
                                <p className="text-xs text-center font-mendium">PENGIRIMAN</p>
                            </div>
                            <div className="my-2">
                                <p className="text-lg text-center font-semibold">{data?.pengiriman?.nama}</p>
                            </div>
                            <div>
                                <p className="text-xs text-center font-mendium">{data?.pengiriman?.hari}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"col-span-2 flex w-96 cursor-pointer"} style={{ backgroundColor: disabled ? '#c9c9c9' : '#0285e4' }} onClick={handleCheckout}>
                        <p className="my-auto mx-auto text-white text-semibold text-base"> BELI</p>
                    </div>
                </div>
            </div>

        </div>
    )
}