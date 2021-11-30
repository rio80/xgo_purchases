import * as React from 'react'
import css from './HomePage.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Iphone from '../../../public/png/iphone_white.png'
import GooglePlay from '../../../public/png/google_play.png'
import AppleStore from '../../../public/png/apple_store.png'
import Background from '../../../public/png/background.png'
import Xstream from '../../../public/png/xstream.png'
import Xgo from '../../../public/png/xgo.png'
import Alert from '../../../pages/shared/alert/Alert';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const closeModal = (data) => {
        setOpen(data);
    };


    return (
        <>
            {open && <Alert type={1} title={'Coming Soon'} message={''} close={closeModal} />}

            <div id="Home">
                <div className="mt-44 flex justify-center">
                    <p className="text-4xl text-center font-semibold">
                        Satu Aplikasi, <br />Jutaan Hiburan
                    </p>
                </div>

                <div className="mt-6 flex justify-center gap-x-1 px-7">
                    <p className="text-lg font-light text-center">
                        Nikmati Streaming Kapanpun  <br /> Dimanapun dalam Satu Aplikasi
                    </p>
                </div>
                <div className="absolute z-10 mt-16 w-full">
                    <Image
                        src={Background}
                        alt="main background"
                        priority
                    />
                </div>

                <div className="pt-52">
                    <div className={classNames(css.trapezoidM, 'mt-10 rotate-180')} ></div>
                    <div className="w-full" style={{ backgroundColor: '#0285e4' }} id="Product">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <p className="text-4xl text-white">Pilih Produk</p>
                            </div>
                            <div className="flex justify-center mt-2 px-6">
                                <p className="text-base text-white text-center" style={{ width: '565px' }}>
                                    Nikmati ragam pilihan program tayangan yang sesuai dengan kebutuhan dan hobi Anda sekeluarga
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="mt-14 px-3.5">
                                <div className="grid gap-8 grid-cols-1">
                                    <div className="bg-white rounded-lg py-12 px-10">
                                        <p className="text-3xl font-semibold text-center">XGO</p>
                                        <div className="flex justify-center mt-7">
                                            <p className="text-gray-400 text-center">GRATIS! tayangan 42+ Live Channel TV dan 1000+ Video on Demand Premium</p>
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
                                            <Image
                                                src={Xgo}
                                                alt="xgo"
                                                className="my-4 mx-4"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-8 grid-cols-1 py-3.5">
                                    <div className="bg-white rounded-lg py-12">
                                        <p className="text-3xl font-semibold text-center">Xstream Seru Minipack</p>
                                        <div className="flex justify-center mt-7 px-10">
                                            <p className="text-gray-400 text-center">GRATIS! tayangan 42+ Live Channel TV dan 1000+ Video on Demand Premium</p>
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
                                            <Image
                                                src={Xstream}
                                                alt="xstream"
                                                className="my-4 mx-4"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center px-8">
                            <div className="grid grid-cols-1">
                                <div>
                                    <div className="w-full">
                                        <div className="pt-44">
                                            <p className="text-4xl text-center md:text-3xl font-medium text-white">Download aplikasi <br />Transvision XGO sekarang </p>
                                        </div>
                                        <div className="pt-6 pr-5">
                                            <p className="text-md text-center md:text-lg font-light text-white">Download aplikasi Transvision XGO di App Store atau Play Store melalui link dibawah ini</p>
                                        </div>
                                        <div className="flex w-full flex-col gap-x-4 pt-6">
                                            <div className="w-56 mx-auto my-4">
                                                <Image
                                                    src={GooglePlay}
                                                    alt="google play"
                                                    className="my-4"
                                                />
                                            </div>
                                            <div className="w-56 mx-auto my-4">
                                                <Image
                                                    src={AppleStore}
                                                    alt="apple store"

                                                />
                                            </div>
                                        </div>
                                        <div className="w-full mt-10">
                                            <Image
                                                src={Iphone}
                                                alt="iphone white"

                                            />
                                        </div>
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