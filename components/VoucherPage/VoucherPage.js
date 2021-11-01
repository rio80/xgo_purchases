import { EyeOffIcon } from "@heroicons/react/solid";

export default function VoucherPage() {
    return (
        <>
            <div className="mt-40 flex justify-center">
                <p className="w-1/2 text-4xl font-semibold text-center">Input Voucher</p>
            </div>
            <div className="flex justify-center mt-7">
                <p className="text-lg font-light">Silahkan masukan kode voucher yang Anda miliki disini</p>
            </div>

            <div className="flex justify-center mt-20">
                <div className="w-2/4 relative flex">
                    <input
                        type="text"
                        name="first-name"
                        placeholder="Masukan Kode Voucher Anda"
                        className="h-20 py-3.5 pl-24 pr-3.5 block w-full sm:text-sm border-0 rounded-full"
                        style={{boxShadow: '0 4px 31px 0 rgba(74, 105, 134, 0.15)'}}
                    />
                    <div class="absolute inset-y-0 left-0 pl-10 flex items-center text-sm leading-5">
                        <img
                            src={'../png/voucher.png'}
                            className="self-center items-center text-base leading-4 font-medium shadow-sm text-white"
                            width="28px"
                            height="28px"
                        />
                    </div>
                    <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-sm leading-5">
                        <button
                            type="button"
                            className="w-full self-center items-center px-11 py-4 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: '#0285e4' }}
                        >
                            Aktivasi
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="mt-14 flex cursor-pointer" onClick={() => router.push('/login')}>
                    <div className="flex flex-wrap content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#0285e4' }}>
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div style={{ color: '#0285e4' }}>
                        <p className="self-center ml-2 font-normal text-lg">Kembali ke Pembelian</p>
                    </div>
                </div>
            </div>
        </>
    )
}