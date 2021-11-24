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
import { getMinipack } from "../../../../utils/apiHandlers";
import { useRouter } from 'next/router';
import Alert from "../../../../pages/shared/alert/Alert";
import Cookies from "js-cookie";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MinipackPage() {
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()
    const [paket, setPaket] = React.useState('')
    const [idxpaket, setIdxPaket] = React.useState('')
    const [idxdurasi, setIdxDurasi] = React.useState('')
    const [paketdata, setPaketdata] = React.useState([])
    const [error, setError] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState({
        package_id: '381',
        receiver_type: 'SELF',
        activation_process: 'IMMEDIATE'
    })

    const [payment, setPayment] = React.useState({
        app_id: "webxgo",
        payment_type: "internal_app",
        app_url_validation: "https://xgo.co.id/api/validate/id=123321",
        app_url_callback: "https://my2-dev.transvision.co.id/verify-order"
    })

    const handleDurasi = (paket, idx) => {
        setPaket(paket)
        setIdxPaket(idx)
        setIdxDurasi('')
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
            let dataPaket = {
                paket,
                durasi: paketdata[idxpaket]?.plans[idxdurasi]?.duration
            }
            Cookies.set('paket', JSON.stringify(dataPaket));
            localStorage.setItem('checkout', JSON.stringify(data));
            localStorage.setItem('payment', JSON.stringify(payment));
            router.push('/pembayaran')
        }
    }

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const getData = await getMinipack();
                setPaketdata(getData?.data?.result)
                setLoading(false)
            } catch (e) {
                // console.log(e)
                setLoading(false)
                setError(true)
            }
        })();
    }, []);

    const closeModal = (data) => {
        setError(data);
    };

    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
                <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
            </div>
        )
    }

    return (
        <>
            {error && <Alert type={0} title={'Terjadi Kesalahan'} message={'Silahkan coba beberapa saat lagi'} close={closeModal} />}
            <div className="w-full mx-auto px-5">
                <div className="overflow-hidden mt-36">
                    <div className="py-5">
                        <p className="font-bold text-4xl text-center font-nunito">Pembelian </p> <br />
                        <p className="font-medium px-4 text-sm text-center text-gray-400">Untuk berlangganan, tersedia berbagai paket yang sesuai dengan kebutuhanmu. </p>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto px-6 mt-16">
                    <p className="text-left font-bold text-xl font-nunito">Pilih Paket</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-5">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={15}
                    slidesPerGroup={2}
                    loop={false}
                    loopFillGroupWithBlank={true}
                    className="mySwiper"
                    style={{ padding: '0 40px 0 20px', overflow: 'hidden' }}
                >

                    {paketdata.map((data, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex justify-center">
                                <div className={classNames(idxpaket === index ? "bg-blue-600" : "bg-white border-2 border-gray-200", "w-full rounded-lg h-56 px-6 py-12")}>
                                    <p className={classNames(idxpaket === index ? "text-white" : "text-black", "text-center text-2xl font-bold font-nunito")}>{data.minipack}</p>
                                    <p className={classNames(idxpaket === index ? "text-white" : "text-black", "text-center text-xs font-normal")}>{data.description}</p>
                                    <div className="w-full mt-7">
                                        <button
                                            type="button"
                                            className="w-full self-center items-center py-3 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600"
                                            style={{ backgroundColor: idxpaket === index ? 'white' : '#00b6f0', color : idxpaket === index ? '#00b6f0' : '' }}
                                            onClick={() => handleDurasi(data.minipack, index)}
                                        >
                                            {idxpaket === index ? 'Terpilih' : 'Pilih Paket'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {paket ?
                <div>
                    <div className="w-full mx-auto px-5">
                        <div className="max-w-5xl mx-auto px-6 mt-16">
                            <p className="text-left font-semibold text-xl">Pilih Durasi</p>
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto mt-5">
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={15}
                            slidesPerGroup={2}
                            loop={false}
                            loopFillGroupWithBlank={true}
                            className="mySwiper"
                            style={{ padding: '0 40px 0 20px', overflow: 'hidden' }}
                        >
                            {paketdata[idxpaket]?.plans.map((data, index) => (
                                <SwiperSlide key={index}>
                                    <div className="w-full flex justify-center">
                                        <div className={classNames(idxdurasi === index ? "bg-blue-600" : "bg-white border-2 border-gray-200", "w-full rounded-lg px-6 pt-12 py-6")}>
                                            <p className={classNames(idxdurasi === index ? "text-white" : "text-black", "text-sm font-bold font-nunito")}>{data.title}</p>
                                            <div className="flex gap-x-2">
                                                <div className="self-center">
                                                    <p className={classNames(idxdurasi === index ? "text-white" : "text-black", "mt-12 text-base font-bold")}>{convertToRupiah(data.price)}</p>
                                                </div>
                                                <div>
                                                    <p className={classNames(idxdurasi === index ? "text-white" : "text-black", "mt-12 font-semibold text-xs")}>RP</p>
                                                    <p className={classNames(idxdurasi === index ? "text-white" : "text-black", "text-xs font-normal")}>/bulan</p>
                                                </div>

                                            </div>
                                            <div className="flex w-full mt-6">
                                                <button
                                                    type="button"
                                                    className="w-full self-center items-center py-3 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600"
                                                    style={{ backgroundColor: idxdurasi === index ? 'white' : '#00b6f0', color : idxdurasi === index ? '#00b6f0' : '' }}
                                                    onClick={() => handleMinipack(data.minipack_id, data.price, data.minipack, index)}
                                                >
                                                      {idxdurasi === index ? 'Terpilih' : 'Pilih Durasi'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div> : ''
            }

            <div className="sticky bottom-0 mt-20 bg-white drop-shadow-3xl h-28 px-4 py-3.5 z-20">
                <div className="flex items-center h-5">
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
                <div className=" mt-4">
                    <button
                        type="button"
                        className={classNames(open && data?.minipack_id ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-600 bg-gray-300 hover:bg-gray-200', 'w-full self-center items-center px-8 py-4 border border-transparent text-base leading-4 font-base rounded-full shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500')}
                        style={open && data?.minipack_id ? { backgroundColor: '#0285e4' } : { backgroundColor: '' }}
                        onClick={open && data?.minipack_id ? () => handleCheckout(1) : () => handleCheckout(0)}
                    >
                        Pilih Paket
                    </button>
                </div>

            </div>
        </>
    )
}