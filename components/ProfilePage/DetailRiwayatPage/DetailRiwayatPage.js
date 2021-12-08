import * as React from 'react'
import { getTransactionHistoryBox, getTransactionHistoryMinipack } from '../../../utils/apiHandlers';

export default function DetailRiwayatPage({ email = '', transactionId = '', type = '' }) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            try {
                const getData = type === 'MINIPACK' ? await getTransactionHistoryMinipack({ email: email, transaction_id: transactionId }) : await getTransactionHistoryBox({ email: email, transaction_id: transaction_id })
                setData(getData.data.result)
                setLoading(false)
            } catch (e) {
                console.log(e)

                // setError(true)
            }
        })();
    }, []);

    const convertToRupiah = (angka = 0) => {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return rupiah.split('', rupiah.length - 1).reverse().join('');
    }


    if (loading) {
        return (
            <>
                <div className="mt-12 animate-pulse">
                    <div className="bg-gray-200 w-72 h-8 rounded-lg" />
                    <div className="flex justify-between">
                        <div>
                            <div className="mt-6 bg-gray-200 w-44 h-8 rounded-lg" />
                        </div>
                        <div>
                            <div className="mt-6 bg-gray-200 w-60 h-8 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="mt-6 bg-gray-200 w-44 h-8 rounded-lg" />
                        </div>
                        <div>
                            <div className="mt-6 bg-gray-200 w-60 h-8 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="mt-6 bg-gray-200 w-44 h-8 rounded-lg" />
                        </div>
                        <div>
                            <div className="mt-6 bg-gray-200 w-60 h-8 rounded-lg" />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="mt-12">
            <p className="font-semibold text-xl text-gray-500">Invoice: {data?.payment_code}</p>
            <div className="grid grid-cols-2 flex">
                {type === 'BOX' && (
                    <>
                        <div className="flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">Nomor Resi</p>
                        </div>
                        <div className="w-40 ml-auto mr-4 mt-6">
                            <div className="ml-auto mt-3.5 relative flex items-stretch flex-grow ">
                                <button
                                    type="button"
                                    className="bg-gray-100 relative w-full border-none rounded-l-full shadow-sm py-3 px-7 text-left cursor-default focus:outline-none sm:text-sm"
                                    ariaHaspopup="listbox"
                                    ariaExpanded="true"
                                    ariaLabelledby="listbox-label"
                                    style={{ backgroundColor: 'rgba(2, 133, 228, 0.2)' }}
                                >
                                    <span class="block truncate font-semibold">
                                        {data?.awb_no}
                                    </span>
                                </button>
                                <div className="absolute inset-y-0 -right-4 px-3 flex items-center text-sm leading-5 rounded-r-full" style={{ backgroundColor: '#0285e4' }}>
                                    <img src={'../../png/iconcopy.png'}
                                        className="h-5 w-5 text-gray-400 cursor-pointer"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">Kurir</p>
                        </div>
                        <div className="ml-auto flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">{data?.courier_name_text}</p>
                        </div>
                        <div className="flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">Alamat</p>
                        </div>
                        <div className="ml-auto flex mt-6 w-56">
                            <p className="self-center text-base text-right font-medium text-gray-500">{data?.receiver_address}</p>
                        </div>
                    </>
                )}
                <div className="flex mt-6">
                    <p className="self-center text-base font-medium text-gray-500">Cara Pembayaran</p>
                </div>
                <div className="ml-auto flex mt-6">
                    <p className="self-center text-base font-medium text-gray-500">{data?.payment_method}</p>
                </div>
                {data?.payment_method !== 'OVO' && data?.voucher_code !== null && (
                    <>
                        <div className="flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">Kode Pembayaran</p>
                        </div>
                        <div className="w-40 ml-auto mr-4 mt-6">
                            <div className="ml-auto mt-3.5 relative flex items-stretch flex-grow ">
                                <button
                                    type="button"
                                    className="bg-gray-100 relative w-full border-none rounded-l-full shadow-sm py-3 px-7 text-left cursor-default focus:outline-none sm:text-sm"
                                    ariaHaspopup="listbox"
                                    ariaExpanded="true"
                                    ariaLabelledby="listbox-label"
                                    style={{ backgroundColor: 'rgba(2, 133, 228, 0.2)' }}
                                >
                                    <span class="block truncate font-semibold">
                                        {data?.voucher_code}
                                    </span>
                                </button>
                                <div className="absolute inset-y-0 -right-4 px-3 flex items-center text-sm leading-5 rounded-r-full" style={{ backgroundColor: '#0285e4' }}>
                                    <img src={'../../png/iconcopy.png'}
                                        className="h-5 w-5 text-gray-400 cursor-pointer"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="flex mt-6">
                    <p className="self-center text-base font-medium text-gray-500">Harga</p>
                </div>
                <div className="ml-auto flex mt-6">
                    <p className="self-center text-base font-medium text-gray-500">Rp{convertToRupiah(data?.product_amount)}</p>
                </div>
                {type === 'BOX' && (
                    <>
                        <div className="flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">Biaya Pengiriman</p>
                        </div>
                        <div className="ml-auto flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">Rp{convertToRupiah(data?.courier_fee)}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}