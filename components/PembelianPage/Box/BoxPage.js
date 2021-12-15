import * as React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
SwiperCore.use([Pagination, Navigation]);
import Image from 'next/image'
import Decoder1 from '../../../public/png/decoder/Decoder_1.png'
import Decoder2 from '../../../public/png/decoder/Decoder_2.png'
import Decoder3 from '../../../public/png/decoder/Decoder_3.png'
import Decoder4 from '../../../public/png/decoder/Decoder_4.png'
import ComboBox from "../../shared/ComboBox/ComboBox";
import AlamatPage from "./Alamat/Alamat";
import VoucherBoxPage from './VoucherBox/VoucherBox';
import { getJne, getProductMinipack, getProfil } from "../../../utils/apiHandlers";
import css from '../../shared/ComboBox/ComboBox.module.css'
import Cookies from 'js-cookie';
import Footer from './Footer/Footer';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function getEmail(){
    const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
    const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
    const auth = Cookies.get('auth')
    const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);

    return decrypted
}

export default function BoxPage() {
    const [minipack, setMinipack] = React.useState([])
    const [alamat, setAlamat] = React.useState('')
    const [courier, setCourier] = React.useState([])
    const [counter, setCounter] = React.useState(1)

    React.useEffect(() => {
        (async () => {
            try {
                const [getData, getDetail] = await Promise.all([getProductMinipack(), getProfil(getEmail())])
                const transformMinipack = getData.data.result.Packages.map((data) => ({
                    id: data.PackageId,
                    name: data.PackageName,
                }))
                const dataAlamat = getDetail.data.result.addresses.find(x => x.main_address === '1')
                setMinipack(transformMinipack)
                setAlamat(dataAlamat)
                if (dataAlamat !== '') {
                    getDataJne(dataAlamat.customer_address_id)
                }
            } catch (e) {
                console.log(e)

            }
        })();
    }, []);

    const getDataJne = async (custAddress) => {
        const dataEmail = getEmail()
        try {
            const data = {
                email: dataEmail,
                customer_address_id: custAddress,
                courier: 'JNE',
                weight: 1
            }
            const getData = await getJne(data)
            const transformCourier = getData?.data?.result?.rates.map((data) => ({
                id: data.code,
                name: data.label,
                price: data.price
            }))
            setCourier(transformCourier)
        } catch (e) {
            console.log(e)

        }
    }

    const handleCounter = (data) => {
        if (data === '+') {
            const sum = counter + 1
            setCounter(sum > 10 ? 10 : sum)
        } else {
            const sub = counter - 1
            setCounter(sub < 1 ? 1 : sub)
        }
    }

    return (
        <div className="flex w-full mt-40 gap-x-12">
            <div className="w-1/2 relative flex justify-end">
                <div className="w-1/3 ml-auto fixed">
                    <Swiper
                        navigation={true}
                        className="mySwiper"
                        pagination={{
                            "dynamicBullets": true
                        }}
                        loop={true}
                        loopFillGroupWithBlank={true}
                    >
                        <SwiperSlide>
                            <div className="w-full flex justify-center">
                                <div className="bg-white w-full rounded-lg px-12 pb-6 flex justify-center">
                                    <Image
                                        src={Decoder1}
                                        alt="decoder1"
                                        priority
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="w-full flex justify-center">
                                <div className="bg-white w-full rounded-lg px-12 pb-6 flex justify-center">
                                    <Image
                                        src={Decoder2}
                                        alt="decoder2"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="w-full flex justify-center">
                                <div className="bg-white w-full rounded-lg px-12 pb-6 flex justify-center">
                                    <Image
                                        src={Decoder3}
                                        alt="decoder3"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="w-full flex justify-center">
                                <div className="bg-white w-full rounded-lg px-12 pb-6 flex justify-center">
                                    <Image
                                        src={Decoder4}
                                        alt="decoder4"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className="w-1/2">
                <div className="w-96">
                    <p className="font-nunito font-extrabold text-lg">Produk</p>
                    <div>
                        <ComboBox placeholder={'Pilih Produk'} data={minipack} />
                    </div>
                    <div className="flex justify-between mt-10">
                        <div className="font-semibold">
                            Jumlah
                        </div>
                        <div className="flex flex-row gap-x-4">
                            <div class="border-gray-400 border-2 bg-white rounded-full h-8 w-8 flex items-center justify-center font-semibold cursor-pointer" onClick={() => handleCounter('-')}>-</div>
                            <p className="font-bold text-xl">{counter}</p>
                            <div class="border-gray-400 border-2 bg-white rounded-full h-8 w-8 flex items-center justify-center font-semibold  cursor-pointer" onClick={() => handleCounter('+')}>+</div>
                        </div>
                    </div>
                    <div>
                        <AlamatPage data={alamat} />
                    </div>
                    <div>
                        <div>
                            <p className="font-nunito font-extrabold text-lg mt-12">Pengiriman</p>
                            <div className={classNames("w-full mt-6", css.container)}>
                                <div class={classNames("w-full", css.materialTextfield)}>
                                    <input className={classNames("focus:outline-none", css.materialInput)} placeholder="placeholder" type="text" value={'JNE'} disabled />
                                    <label className={classNames("font-semibold text-gray-900", css.materialLabel)}> Kurir</label>
                                </div>
                            </div>
                            <div className="bg-gray-100 rounded-md h-8 w-full flex flex-row gap-x-4 px-6">
                                <div className='my-auto'>
                                    <img src={'../../../png/iconalert.png'} />
                                </div>
                                <div className='my-auto'>
                                    <p className='text-xs font-base'> Pilihan kurir pengiriman saat ini hanya mendukung JNE</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <ComboBox search={false} placeholder={'Pilih Layanan'} data={courier} />
                        </div>
                    </div>
                    <div>
                        <p className="font-nunito font-extrabold text-lg mt-12">Voucher Minipack</p>
                        <p className="font-semibold text-sm mt-3.5 text-gray-500">Pilih Voucher (Opsional)</p>
                        <div className="mt-2 mb-24">
                            <VoucherBoxPage />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}