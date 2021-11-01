import Loader from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Pagination, Navigation
} from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import './MinipackPage.module.css';
SwiperCore.use([Pagination, Navigation]);

import * as React from 'react'
import { getMinipack } from "../../../utils/apiHandlers";
import { useRouter } from 'next/router';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MinipackPage() {
    const [minipack, setMinipack] = React.useState([])
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()
    const [paket, setPaket] = React.useState('')
    const [idxpaket, setIdxPaket] = React.useState('')
    const [idxdurasi, setIdxDurasi] = React.useState('')
    const [paketdata, setPaketdata] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState({
        email: 'testprojectrans@gmail.com',
        payment_method_id: '4',
        package_id: '381',
        receiver_email: 'testprojectrans@gmail.com',
        receiver_type: 'SELF',
        activation_process: 'IMMEDIATE'
    })

    const [payment, setPayment] = React.useState({
        app_id: "webxgo",
        payment_type: "internal_app",
        customer_name: "Chandra",
        customer_email: "chandrawira@gmail.com",
        customer_mobilephone: "081211111111",
        app_url_validation: "https://xgo.co.id/api/validate/id=123321",
        app_url_callback: "https://xgo.co.id"
    })

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const getData = await getMinipack();
                setPaketdata(getData?.data?.result)
                setLoading(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
            }
        })();
    }, []);

    const handleDurasi = (paket, idx) => {
        setPaket(paket)
        setIdxPaket(idx)
    }

    const convertToRupiah = (angka) => {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    const handleMinipack = (id_minipack, price, minipack, index) => {
        let submit = {
            ...data,
            minipack_id: id_minipack,
            total_amount: price
        }

        let dataPayment = {
            ...payment,
            amount: +price,
            item_details: [
                {
                    id: id_minipack,
                    price: +price,
                    quantity: 1,
                    name: minipack
                }
            ]
        }
        setData(submit)
        setPayment(dataPayment)
        setIdxDurasi(index)
    }

    const handleCheckout = (status) => {
        if (status) {
            localStorage.setItem('checkout', JSON.stringify(data));
            localStorage.setItem('payment', JSON.stringify(payment));
            // localStorage.setItem('checkout', JSON.stringify(data));
            router.push('/pembayaran')
        }
    }

    return (
        <>
            <div className="max-w-3xl mx-auto hidden lg:block">
                <div className="overflow-hidden mt-36">
                    <div className="px-4 py-5 sm:px-6">
                        <p className="font-medium text-4xl text-center">Pembelian </p> <br />
                        <p className="font-medium text-sm text-center text-gray-400">Untuk berlangganan, tersedia berbagai paket yang sesuai dengan kebutuhanmu. </p>
                    </div>
                </div>
                <div className="mt-16">
                    <p className="text-center font-semibold text-xl">Pilih Paket</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto hidden lg:block mt-5">
                {loading ?
                    <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
                    :
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        slidesPerGroup={1}
                        loop={false}
                        loopFillGroupWithBlank={true}
                        navigation={true}
                        className="mySwiper"
                        style={{ padding: '0 50px', overflow: 'hidden' }}
                    >

                        {paketdata.map((data, index) => (
                            <SwiperSlide>
                                <div className="flex justify-center">
                                    <div className={classNames(idxpaket === index ? "bg-blue-600" : "bg-white border-2 border-gray-200", "w-full rounded-lg h-56 px-12 py-12")}>
                                        <p className={classNames(idxpaket === index ? "text-white" : "text-black", "text-2xl font-semibold")}>{data.minipack}</p>
                                        <p className={classNames(idxpaket === index ? "text-white" : "text-black", "text-xs font-normal")}>{data.description}</p>
                                        <div className="w-full mt-7">
                                            <button
                                                type="button"
                                                className="w-full self-center items-center py-4 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                style={{ backgroundColor: '#00b6f0' }}
                                                onClick={() => handleDurasi(data.minipack, index)}
                                            >
                                                Pilih Paket
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                }
            </div>
            {paket &&
                <>
                    <div className="max-w-3xl mx-auto hidden lg:block">
                        <div className="mt-16">
                            <p className="text-center font-semibold text-xl">Pilih Durasi</p>
                        </div>
                    </div>
                    {paketdata[idxpaket].plans.length > 3 ?
                        <>
                            <div className="max-w-5xl mx-auto hidden lg:block mt-5">
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    slidesPerGroup={1}
                                    loop={false}
                                    loopFillGroupWithBlank={true}
                                    navigation={true}
                                    className="mySwiper"
                                    style={{ padding: '0 50px', overflow: 'hidden' }}
                                >
                                    {paketdata[idxpaket].plans.map((data, index) => (
                                        <SwiperSlide>
                                            <div className="w-full flex justify-center">
                                                <div className={classNames(idxdurasi === index ? "bg-blue-600" : "bg-white border-2 border-gray-200", "w-full rounded-lg px-12 pt-12 py-6")}>
                                                    <p className="text-xl font-semibold">{data.duration}{' '}{data.unit_duration === 'MONTH' && 'Bulan'}</p>
                                                    <div className="flex gap-x-2">
                                                        <div className="self-center">
                                                            <p className="mt-12 text-3xl font-bold">{convertToRupiah(data.price)}</p>
                                                        </div>
                                                        <div>
                                                            <p className="mt-12 font-semibold text-xl">
                                                                RP
                                                                <p className="text-xs font-normal">/bulan</p>
                                                            </p>
                                                        </div>

                                                    </div>
                                                    <div className="flex w-full mt-6">
                                                        <button
                                                            type="button"
                                                            className="w-full self-center items-center py-3 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                            style={{ backgroundColor: '#00b6f0' }}
                                                            onClick={() => handleMinipack(data.minipack_id, data.price, data.minipack, index)}
                                                        >
                                                            Pilih Durasi
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </>
                        :
                        <div className="max-w-5xl mx-auto hidden lg:block mt-5 px-12">
                            <div className="w-full flex justify-between gap-x-8">
                                {paketdata[idxpaket].plans.map((data, index) => (
                                    <div className="w-full flex justify-center">
                                        <div className={classNames(idxdurasi === index ? "bg-blue-600" : "bg-white border-2 border-gray-200", "w-full rounded-lg px-12 pt-12 py-6")}>
                                            <p className={classNames(idxdurasi === index ? "text-white":"text-black","text-xl font-semibold")}>{data.duration}{' '}{data.unit_duration === 'MONTH' && 'Bulan'}</p>
                                            <div className="flex gap-x-2">
                                                <div className="self-center">
                                                    <p className={classNames(idxdurasi === index ? "text-white":"text-black","mt-12 text-3xl font-bold")}>{convertToRupiah(data.price)}</p>
                                                </div>
                                                <div>
                                                    <p className={classNames(idxdurasi === index ? "text-white":"text-black","mt-12 font-semibold text-xl")}>
                                                        RP
                                                        <p className={classNames(idxdurasi === index ? "text-white":"text-black","text-xs font-normal")}>/bulan</p>
                                                    </p>
                                                </div>

                                            </div>
                                            <div className="flex w-full mt-6">
                                                <button
                                                    type="button"
                                                    className="w-full self-center items-center py-3 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    style={{ backgroundColor: '#00b6f0' }}
                                                    onClick={() => handleMinipack(data.minipack_id, data.price, data.minipack, index)}
                                                >
                                                    Pilih Durasi
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </>
            }
            <div className="py-16 flex justify-center">
                <div className="flex items-center h-5 mt-6">
                    <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        onClick={() => setOpen(!open)}
                    />
                    <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="font-small text-xs text-gray-700">
                            Saya menyetujui <a href="#" className="text-blue-600">Syarat dan Ketentuan</a>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-32">
                <button
                    type="button"
                    className={classNames(open && data?.minipack_id ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-600 bg-gray-300 hover:bg-gray-200', 'w-96 self-center items-center px-8 py-5 border border-transparent text-base leading-4 font-base rounded-full shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500')}
                    style={open && data?.minipack_id ? { backgroundColor: '#0285e4' } : { backgroundColor: '' }}
                    onClick={open && data?.minipack_id ? () => handleCheckout(1) : () => handleCheckout(0)}
                >
                    Lanjut ke Pembayaran
                </button>
            </div>
        </>
    )
}