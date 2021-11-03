import css from './BerhasilPage.module.css'
import { compareAsc, format } from 'date-fns'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function BerhasilPage({harga}) {
    const convertToRupiah = (angka) => {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return rupiah.split('', rupiah.length - 1).reverse().join('');
    }
    return (

        <div className="px-3.5">
            <div className={classNames("px-16 jutify-between w-full mx-auto lg:w-3/5 bg-white mt-72 rounded-md py-8 pt-16", css.customShadow)}>
                <div className="-mt-56 mb-6">
                    <img src={'../png/success_new.png'} width="274px" height="190px" />
                </div>
                <div className="w-full flex flex-row">
                    <div className="w-3/5">
                        <p className="text-3xl text-gray-600 font-semibold">
                            Pembayaran Anda Berhasil
                        </p>
                        <div className="flex mt-4">
                            <p className="text-gray-400 font-base text-lg text-left">
                                Terimakasih atas pembayaran Anda. Paket XGO Anda langsung bisa digunakan sekarang.
                            </p>
                        </div>
                        <p className="mt-4 font-base text-sm text-gray-400">
                        {format(new Date(), 'dd MMMM yyyy')}
                        </p>
                        <div className="flex flex-row gap-x-12 mt-7">
                            <div className="flex">
                                <p className="text-gray-600 font-semibold text-2xl my-auto">
                                    Rp {convertToRupiah(harga)}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <div>
                                    Metode Pembayaran
                                </div>
                                <div className="mt-3.5">
                                    <img src={'../png/dokuovo.png'} width="66px" hegiht="15px" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/5 ">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="ml-auto w-48 mt-6 px-4 py-4 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                style={{ backgroundColor: '#0285e4' }}
                            >
                                Kembali ke beranda
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}