import css from './BerhasilPage.module.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function BerhasilPage() {
    return (
        <div className="absolute top-0 left-0 w-full min-h-screen pb-10" style={{ backgroundColor: '#f6f9ff' }}>
            <div className="px-3.5">
                <div className={classNames("w-full mx-auto lg:w-1/3 bg-white mt-28 rounded-md py-7",css.customShadow)}>
                    <div className="flex justify-center">
                        <img src={'../png/success.png'} width="154px" height="140px" />
                    </div>
                    <p className="mt-7 text-gray-600 font-semibold text-lg text-center">
                        Pembayaran Anda Berhasil
                    </p>
                    <p className="mt-4 text-gray-600 font-semibold text-lg text-center">
                        Rp9.900
                    </p>
                    <p className="mt-1 font-base text-sm text-center text-gray-400">
                        8 Oktober 2021
                    </p>
                    <p className="mt-7 text-gray-600 font-semibold text-md text-center">
                        Metode Pembayaran
                    </p>
                    <div className="flex justify-center mt-4">
                        <img src={'../png/telkomsel.png'} width="66px" hegiht="15px" />
                    </div>
                    <p className="mt-4 text-gray-600 font-semibold text-lg text-center">
                        Pulsa
                    </p>
                    <div className="flex justify-center mt-4 px-8 lg:px-20">
                        <p className="w-72 lg:w-80 text-gray-400 font-base text-sm text-center">
                            Terimakasih atas pembayaran Anda. Paket XGO Anda
                            langsung bisa digunakan sekarang.
                        </p>
                    </div>
                    <div className="w-64 flex mx-auto">
                        <button
                            type="button"
                            className="font-normal text-base text-white mt-8 w-full self-center items-center px-8 py-3 border border-transparent text-xs leading-4 font-light rounded-lg shadow-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: '#1d6eef' }}
                        >
                            Kembali ke Home
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}