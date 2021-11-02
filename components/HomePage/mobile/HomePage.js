import * as React from 'react'
import css from './HomePage.module.css'
import { useRouter } from 'next/router';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
    const router = useRouter();

    return (
        <>
            <div>
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
                    <img src={'../png/background.png'} />
                </div>

                <div className="pt-52">
                    <div className={classNames(css.trapezoidM, 'mt-10 rotate-180')} ></div>
                    <div className="w-full" style={{ backgroundColor: '#0285e4' }}>
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
                                            >
                                                Berlangganan
                                            </button>
                                        </div>
                                        <div className="flex justify-center">
                                            <img src={'../png/xgo.png'} width="293px" height="253px" className="mt-7" />
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
                                            <img src={'../png/xstream.png'} width="319px" height="251px" className="mt-7" />
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
                                        <div className="flex w-full flex-col gap-x-4 gap-y-4 pt-6">
                                            <img src={'../png/google_play.png'} className="mx-auto" width="220px" height="64px" />
                                            <img src={'../png/apple_store.png'} className="mx-auto" width="220px" height="64px" />
                                        </div>
                                        <div className="w-full mt-16">
                                            <img src={'../png/iphone_white.png'} className="mx-auto" />
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