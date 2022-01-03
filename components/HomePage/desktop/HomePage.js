import * as React from 'react'
import css from './HomePage.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Iphone from '../../../public/png/iphone.png'
import GooglePlay from '../../../public/png/google_play.png'
import AppleStore from '../../../public/png/apple_store.png'
import Background from '../../../public/png/background.png'
import MinipackSection from '../shared/MinipackSection';
import ActivationSection from '../shared/ActivationSection';
import FaqSection from '../shared/FaqSection';
import Alert from '../../../pages/shared/alert/Alert';
import { activationStatus } from '../../../utils/apiHandlers';
import Cookies from 'js-cookie';
import StatusActivationSection from '../shared/StatusActivationSection';
import { useSelector } from 'react-redux';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
    const aktivasi = useSelector((state) => state.AktivasiReducer.aktivasi)
    const router = useRouter();
    const auth = Cookies.get('auth')
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState('')

    const closeModal = (data) => {
        setOpen(data);
    };

    const getEmail = () => {
        const CryptoJS = require("crypto-js");
        const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
        const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
        const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);

        return decrypted
    }

    React.useEffect(() => {
        if (typeof auth !== 'undefined') {
            (async () => {
                try {
                    const getData = await activationStatus(getEmail())
                    setData(getData?.data?.result)
                } catch (e) {
                    console.log(e)
                }
            })()
        }
    }, [aktivasi])

    return (
        <>
            {open && <Alert type={1} title={'Coming Soon'} message={''} close={closeModal} />}

            <div id="Home">
                <div className="mt-44 flex justify-center">
                    <p className="text-5xl font-bold font-nunito">
                        Satu Aplikasi, Jutaan Hiburan
                    </p>
                </div>

                <div className="mt-5 flex justify-center gap-x-1">
                    <p className="text-lg font-light">
                        Nikmati Streaming{' '}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        Kapanpun Dimanapun{' '}
                    </p>
                    <p className="text-lg font-light">
                        dalam{' '}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        Satu Aplikasi
                    </p>

                    <div className="absolute z-10 px-24 mt-2" style={{ maxWidth: '1024px' }}>
                        <Image
                            src={Background}
                            alt="main background"
                            priority
                        />
                    </div>
                </div>

                <div className="lg:pt-72 xl:pt-60 overflow-x-hidden">
                    <div className={classNames(css.trapezoid, 'mt-10 rotate-180')}></div>
                    <div className="w-full" style={{ backgroundColor: '#0285e4' }} id="Product">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <p className="text-4xl text-white font-nunito font-semibold">Pilih Produk</p>
                            </div>
                            <div className="flex justify-center mt-2">
                                <p className="text-base text-white text-center" style={{ width: '565px' }}>
                                    Nikmati ragam pilihan program tayangan yang sesuai dengan kebutuhan dan hobi Anda sekeluarga
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="mt-14" style={{ maxWidth: '1024px' }}>
                                <div className="grid gap-8 grid-cols-2">
                                    <div className="bg-white rounded-lg py-12 px-10">
                                        <p className="text-3xl text-center font-nunito font-bold">XGO</p>
                                        <div className="flex justify-center mt-7">
                                            <p className="text-gray-500 text-center">GRATIS! tayangan 42+ Live Channel TV dan 1000+ Video on Demand Premium</p>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <button
                                                type="button"
                                                className="mt-10 w-48 self-center items-center px-9 py-3 border border-transparent text-sm leading-4 font-normal rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                style={{ backgroundColor: '#00b6f0', boxShadow: '0 4px 31px 0 rgba(0, 0, 0, 0.15)' }}
                                                onClick={() => setOpen(!open)}
                                            >
                                                Berlangganan
                                            </button>
                                        </div>
                                        <div className="flex justify-center">
                                            <img src={'../png/xgo.png'} width="293px" height="253px" className="mt-7" />
                                        </div>
                                    </div>


                                    <div className="bg-white rounded-lg py-12">
                                        <p className="text-3xl text-center font-nunito font-bold">Xstream Seru Minipack</p>
                                        <div className="flex justify-center mt-7 px-10">
                                            <p className="text-gray-500 text-center">GRATIS! tayangan 42+ Live Channel TV dan 1000+ Video on Demand Premium</p>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <button
                                                type="button"
                                                className="mt-10 w-48 self-center items-center px-9 py-3 border border-transparent text-sm leading-4 font-normal rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                style={{ backgroundColor: '#00b6f0', boxShadow: '0 4px 31px 0 rgba(0, 0, 0, 0.15)' }}
                                                onClick={() => router.push('/pembelian-minipack')}
                                            >
                                                Berlangganan
                                            </button>
                                        </div>
                                        <div className="flex justify-center">
                                            <img src={'../png/xstream.png'} width="319px" height="251px" className="mt-7" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <MinipackSection />
                        {data !== '' ? <ActivationSection /> : <StatusActivationSection data={data} />}
                        <FaqSection />

                        <div className="flex justify-center" style={{ backgroundColor: '#e1f1fd' }}>
                            <div className="grid grid-cols-2 mt-16 px-28" style={{ maxWidth: '1100px' }}>
                                <div>
                                    <div className="w-full">
                                        <div className="pt-44">
                                            <p className="text-4xl md:text-3xl font-bold text-black font-nunito">Download aplikasi <br />Transvision XGO sekarang </p>
                                        </div>
                                        <div className="pt-5 pr-5">
                                            <p className="text-xl md:text-lg font-base text-black">Download aplikasi Transvision XGO di App Store atau Play Store melalui link dibawah ini</p>
                                        </div>
                                        <div className="flex w-full gap-x-4 pt-6">
                                            <Image
                                                src={GooglePlay}
                                                alt="google play"
                                                width={'181px'}
                                                height={'54px'}
                                            />
                                            <Image
                                                src={AppleStore}
                                                alt="apple store"
                                                width={'181px'}
                                                height={'54px'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="w-full ml-14 md:ml-12" style={{ fontSize: 0 }}>
                                        <Image
                                            src={Iphone}
                                            alt="iphone"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}