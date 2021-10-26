import css from './HomePage.module.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
    return (
        <>
            <div className="absolute px-32 mt-30 z-10">
                <img src={'../png/background.png'} className="mt-20" />
            </div>

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
            </div>

            <div className="pt-40">
                <div className="w-full absolute z-10" style={{ marginTop: '65vw' }}>
                    <div className="flex justify-center">
                        <p className="text-4xl text-white">Pilih Produk</p>
                    </div>
                    <div className="flex justify-center mt-2">
                        <p className="text-base text-white text-center" style={{ width: '565px' }}>
                            Nikmati ragam pilihan program tayangan yang sesuai dengan kebutuhan dan hobi Anda sekeluarga
                        </p>
                    </div>

                    <div className="w-full px-32 mt-14">
                        <div className="grid gap-8 grid-cols-2">
                            <div className="bg-white rounded-lg py-12 px-28">
                                <p className="text-4xl font-semibold text-center">XGO</p>
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
                                <p className="text-4xl font-semibold text-center">Xstream Seru Minipack</p>
                                <div className="flex justify-center mt-7 px-28">
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
                                    <img src={'../png/xstream.png'} width="319px" height="251px" className="mt-7" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-24 mt-12">
                        <div style={{ width: '492px' }}>
                            <p className="text-4xl font-medium text-white">Download aplikasi Transvision XGO sekarang </p>
                        </div>

                    </div>
                </div>



                <div className={classNames(css.trapezoid, 'mt-80 rotate-180')} >
                    <div className="w-full absolute z-10" style={{ marginTop: '65vw' }}>
                        <div className="pt-40">
                            <div className="w-full px-24 mt-12">
                                <div style={{ width: '492px' }}>
                                    <p className="text-4xl font-medium text-white">Download aplikasi Transvision XGO sekarang </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}