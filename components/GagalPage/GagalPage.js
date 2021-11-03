import css from './GagalPage.module.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GagalPage() {
    return (
        <div className="px-3.5">
            <div className={classNames("px-16 jutify-between w-full mx-auto lg:w-3/5 bg-white mt-72 rounded-md py-8 pt-16", css.customShadow)}>
                <div className="-mt-56 mb-6">
                    <img src={'../png/gagal_new.png'} width="375px" height="190px" />
                </div>
                <div className="w-full flex flex-row">
                    <div className="w-3/5">
                        <p className="text-3xl text-gray-600 font-semibold">
                            Pembayaran Anda Gagal
                        </p>
                        <div className="flex mt-4">
                            <p className="text-gray-400 font-base text-lg text-left">
                            Pembayaran transaksi Anda gagal. Silahkan coba lagi
                            </p>
                        </div>
                    </div>
                    <div className="w-2/5 ">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="ml-auto w-50 mt-6 px-4 py-4 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                style={{ backgroundColor: '#0285e4' }}
                            >
                                Kembali ke pembayaran
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}