import * as React from 'react'
import css from './HomePage.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Iphone from '../../../public/png/iphone.png'
import GooglePlay from '../../../public/png/google_play.png'
import AppleStore from '../../../public/png/apple_store.png'
import Background from '../../../public/png/background.png'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
    const router = useRouter();

    return (
        <>
            <div>
                <div className="mt-44 flex justify-center">
                    <p className="text-5xl font-semibold">
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
                    <div className={classNames(css.trapezoid, 'mt-10 rotate-180')} ></div>
                    <div className="w-full" style={{ backgroundColor: '#0285e4' }}>
                        <div className="w-full">
                            <div className="flex justify-center">
                                <p className="text-4xl text-white">Pilih Produk</p>
                            </div>
                            <div className="flex justify-center mt-2">
                                <p className="text-base text-white text-center" style={{ width: '565px' }}>
                                    Nikmati ragam pilihan program tayangan yang sesuai dengan kebutuhan dan hobi Anda sekeluarga
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="mt-14 px-28" style={{ maxWidth: '1024px' }}>
                                <div className="grid gap-8 grid-cols-2">
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
                                            >
                                                Berlangganan
                                            </button>
                                        </div>
                                        <div className="flex justify-center">
                                            <img src={'../png/xgo.png'} width="293px" height="253px" className="mt-7" />
                                        </div>
                                    </div>


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
                                            <img src={'../png/xstream.png'} width="319px" height="251px" className="mt-7" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="grid grid-cols-2 mt-16 px-28" style={{ maxWidth: '1100px' }}>
                                <div>
                                    <div className="w-full">
                                        <div className="pt-44">
                                            <p className="text-4xl md:text-3xl font-medium text-white">Download aplikasi <br />Transvision XGO sekarang </p>
                                        </div>
                                        <div className="pt-6 pr-5">
                                            <p className="text-xl md:text-lg font-light text-white">Download aplikasi Transvision XGO di App Store atau Play Store melalui link dibawah ini</p>
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