export default function VoucherBerhasilPage() {
    return (
        <div className="mt-52 flex justify-center">
            <div className="flex w-2/4 px-16 py-16 bg-white my-auto rounded-2xl " style={{ boxShadow: '0 4px 31px 0 rgba(74, 105, 134, 0.15)' }}>
                <div className="w-38">
                    <p className="text-3xl font-semibold"> Selamat</p>
                    <p className="text-sm font-normal mt-2 text-gray-500"> Kode voucher yang Anda input benar</p>
                </div>
                <div className="flex ml-auto self-center">
                    <button
                        type="button"
                        className="w-full self-center items-center px-5 py-4 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        style={{ backgroundColor: '#0285e4' }}
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>


        </div>
    )
}