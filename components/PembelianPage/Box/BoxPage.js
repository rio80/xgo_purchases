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
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FooterAction } from '../../../store/Footer/FooterAction';
import { CheckoutAction } from '../../../store/Checkout/CheckoutAction';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function getEmail() {
    const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
    const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
    const auth = Cookies.get('auth')
    const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);

    return decrypted
}

export default function BoxPage() {
    const dispatch = useDispatch()
    const alamatPengiriman = useSelector((state) => state.AlamatReducer)
    const [minipack, setMinipack] = React.useState([])
    const [alamat, setAlamat] = React.useState('')
    const [courier, setCourier] = React.useState([])
    const [dataJne, setDataJne] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [counter, setCounter] = React.useState(1)
    const [list, setList] = React.useState(false)
    const { control, register, watch, reset } = useForm();
    const produk = watch("Produk")
    const kurir = watch("Courier")

    React.useEffect(() => {
        (async () => {
            try {
                const [getData, getDetail] = await Promise.all([getProductMinipack(), getProfil(getEmail())])
                const transformMinipack = getData.data.result.Packages.map((data) => ({
                    id: data.PackageId + '|' + data.Price,
                    name: data.PackageName,
                }))
                setMinipack(transformMinipack)

                const dataAlamat = getDetail.data.result.addresses.find(x => x.main_address === '1')
                if (getDetail.data.result.addresses.length > 0) {
                    setList(true)
                }else{
                    setList(false)
                }

                if (alamatPengiriman?.customer_address_id !== '') {
                    setAlamat(alamatPengiriman)
                    getDataJne(alamatPengiriman.customer_address_id)
                    dispatch({
                        type: FooterAction.SET_DATA,
                        nama: alamatPengiriman.receiver_fullname,
                        alamat: alamatPengiriman.customer_address
                    })
                    dispatch({
                        type: CheckoutAction.SET_ID_ADRRESS,
                        CustomerAddressId: alamatPengiriman.customer_address_id
                    })
                } else {
                    setAlamat(typeof dataAlamat !== 'undefined' ? dataAlamat : '')
                    if (typeof dataAlamat !== 'undefined') {
                        getDataJne(dataAlamat.customer_address_id)
                        dispatch({
                            type: FooterAction.SET_DATA,
                            nama: dataAlamat.receiver_fullname,
                            alamat: dataAlamat.customer_address
                        })
                        dispatch({
                            type: CheckoutAction.SET_ID_ADRRESS,
                            CustomerAddressId: dataAlamat.customer_address_id
                        })
                    } else {
                        setCourier([])
                        dispatch({
                            type: FooterAction.SET_DATA,
                            nama: '-',
                            alamat: '-'
                        })
                        dispatch({
                            type: CheckoutAction.SET_ID_ADRRESS,
                            CustomerAddressId: ''
                        })


                    }
                }
                reset({
                    Courier: ''
                })

                dispatch({
                    type: FooterAction.SET_PENGIRIMAN,
                    nama: '-',
                    hari: '-'
                })

            } catch (e) {
                // console.log(e)
            }
        })();
    }, [alamatPengiriman, alamatPengiriman.main_address]);

    React.useEffect(() => {
        if (produk !== '' && typeof produk !== 'undefined') {
            dispatch({
                type: FooterAction.SET_PRODUK,
                nama: 'Xstream Box',
                paket: produk
            })
        }

        if (kurir !== '' && typeof kurir !== 'undefined') {
            dispatch({
                type: FooterAction.SET_PENGIRIMAN,
                nama: 'JNE',
                hari: kurir
            })
        }
    }, [produk, kurir])

    const getDataJne = async (custAddress, counter = 1) => {
        const dataEmail = getEmail()
        try {
            const data = {
                email: dataEmail,
                customer_address_id: custAddress,
                courier: 'JNE',
                weight: 0.4 * counter
            }
            const getData = await getJne(data)
            setDataJne(getData?.data?.result)
            const transformCourier = getData?.data?.result?.rates.map((data, idx) => ({
                id: idx,
                name: data.label,
                price: data.price
            }))
            setCourier(transformCourier)

            reset({
                Courier: ''
            })

            dispatch({
                type: FooterAction.SET_PENGIRIMAN,
                nama: '-',
                hari: '-'
            })

            dispatch({
                type: CheckoutAction.SET_JNE,
                CourierPackageCode: '',
                CourierPackageLabel: '',
                CourierFee: '',
                CityCode: '',
                Email: '',
            })
        } catch (e) {
            console.log(e)

        }
    }

    const handleCounter = (data) => {
        if (data === '+') {
            const sum = counter + 1
            setCounter(sum > 10 ? 10 : sum)
            dispatch({
                type: CheckoutAction.SET_QTY,
                Qty: sum > 10 ? 10 : sum
            });
            dispatch({
                type: CheckoutAction.SET_TOTAL,
                TotalProductPrice: sum > 10 ? 10 : sum * (+price),
            });

            if (alamatPengiriman.customer_address_id !== '') {
                getDataJne(alamatPengiriman.customer_address_id, sum > 10 ? 10 : sum)
            } else {
                getDataJne(alamat.customer_address_id, sum > 10 ? 10 : sum)
            }
        } else {
            const sub = counter - 1
            setCounter(sub < 1 ? 1 : sub)
            dispatch({
                type: CheckoutAction.SET_QTY,
                Qty: sub < 1 ? 1 : sub
            });
            dispatch({
                type: CheckoutAction.SET_TOTAL,
                TotalProductPrice: sub < 1 ? 1 : sub * (+price),
            });

            if (alamatPengiriman.customer_address_id !== '') {
                getDataJne(alamatPengiriman.customer_address_id, sub > 10 ? 10 : sub)
            } else {
                getDataJne(alamat.customer_address_id, sub > 10 ? 10 : sub)
            }
        }

    }

    const handleId = (data) => {
        const dataProduct = data.split('|')
        setPrice(dataProduct[1])
        dispatch({
            type: CheckoutAction.SET_ID,
            PackageId: +dataProduct[0],
        });

        dispatch({
            type: CheckoutAction.SET_TOTAL,
            TotalProductPrice: counter * (+dataProduct[1]),
        });
    }

    const handleDataCourier = (data) => {
        dispatch({
            type: CheckoutAction.SET_JNE,
            CourierPackageCode: dataJne.rates[data].code,
            CourierPackageLabel: dataJne.rates[data].label,
            CourierFee: +dataJne.rates[data].price,
            CityCode: dataJne.cityCode,
            Email: getEmail()
        })
    }

    return (
        <div className="flex flex-col lg:flex-row w-full mt-32 lg:mt-40 gap-x-0 lg:px-0 lg:gap-x-12">
            <div className="w-full lg:w-1/2 relative flex justify-center px-6 lg:justify-end">
                <div className="w-full ml-auto block lg:w-1/3 lg:fixed">
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
            <div className="w-full lg:w-1/2">
                <div className="w-full px-6 lg:px-0 lg:w-96">
                    <p className="font-nunito font-extrabold text-lg">Produk</p>
                    <div>
                        <ComboBox name='Produk' placeholder={'Pilih Produk'} data={minipack} id={handleId} control={control} {...register('Produk')} />
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
                        <AlamatPage data={alamat} list={list} />
                    </div>
                    <div className='mb-24'>
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
                            <ComboBox
                                search={false}
                                placeholder={'Pilih Layanan'}
                                data={courier}
                                name='Courier'
                                {...register('Courier')}
                                control={control}
                                variant='default'
                                id={handleDataCourier}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}