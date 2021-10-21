import css from './GagalPage.module.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GagalPage() {
    return (
        <div className="absolute top-0 left-0 w-full min-h-screen pb-10" style={{ backgroundColor: '#f6f9ff' }}>
            <div className="px-3.5">
                <div className={classNames("w-full lg:w-1/3 mx-auto bg-white mt-28 rounded-md py-7",css.customShadow)}>
                    <div className="flex justify-center">
                        <img src={'../png/failed.png'} width="139px" height="139px" />
                    </div>
                    <p className="mt-7 text-gray-600 font-semibold text-lg text-center">
                        Pembayaran Anda Gagal
                    </p>
                    <div className="flex justify-center mt-4">
                        <p className="w-60 text-gray-400 font-base text-sm text-center">
                            Pembayaran transaksi Anda gagal.
                            Silakan coba lagi
                        </p>
                    </div>
                    <div className="w-64 flex mx-auto">
                        <button
                            type="button"
                            className="font-normal text-base text-white mt-8 w-full self-center items-center px-8 py-3 border border-transparent text-xs leading-4 font-light rounded-lg shadow-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: '#1d6eef' }}
                        >
                            Kembali ke Pembayaran
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}