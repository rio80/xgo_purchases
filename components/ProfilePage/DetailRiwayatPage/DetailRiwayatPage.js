import * as React from 'react'
import { getTransactionHistoryBox, getTransactionHistoryMinipack } from '../../../utils/apiHandlers';
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DetailRiwayatPage({ email = '', transactionId = '', type = '' }) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            try {
                const getData = type === 'MINIPACK' ? await getTransactionHistoryMinipack({ email: email, transaction_id: transactionId }) : await getTransactionHistoryBox({ email: email, transaction_id: transactionId })
                console.log(getData)
                setData(getData.data.result)
                setLoading(false)
            } catch (e) {
                // console.log(e)
                setLoading(false)

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

    const copy = (data) => {
        navigator.clipboard.writeText(data)
    }


    if (loading) {
        return (
            <>
                <div className="mt-12 animate-pulse">
                    <div className="bg-gray-200 w-72 h-8 rounded-lg" />
                    <div className="flex justify-between">
                        <div>
                            <div className="mt-6 bg-gray-200 w-24 lg:w-44 h-8 rounded-lg" />
                        </div>
                        <div>
                            <div className="mt-6 bg-gray-200 w-40 lg:w-60 h-8 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="mt-6 bg-gray-200 w-24 lg:w-44 h-8 rounded-lg" />
                        </div>
                        <div>
                            <div className="mt-6 bg-gray-200 w-40 lg:w-60 h-8 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="mt-6 bg-gray-200 w-24 lg:w-44 h-8 rounded-lg" />
                        </div>
                        <div>
                            <div className="mt-6 bg-gray-200 w-40 lg:w-60 h-8 rounded-lg" />
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
                        <div className={classNames(data?.awb_no !== '' ? "mr-0" : "mr-4", "w-auto ml-auto mt-6")}>
                            {data?.awb_no === '' || data?.awb_no === null ? (
                                <p className="text-right">Nomor resi belum tersedia</p>
                            ) : (
                                <div className="ml-auto mt-3.5 relative flex items-stretch flex-grow ">
                                    <button
                                        type="button"
                                        className="bg-gray-100 relative w-full border-none rounded-l-full shadow-sm py-3 pl-7 pr-12 text-left cursor-default focus:outline-none sm:text-sm"
                                        ariaHaspopup="listbox"
                                        ariaExpanded="true"
                                        ariaLabelledby="listbox-label"
                                        style={{ backgroundColor: 'rgba(2, 133, 228, 0.2)' }}
                                    >
                                        <span class="block truncate font-semibold">
                                            {data?.awb_no}
                                        </span>
                                    </button>
                                    <Popover className="" style={{ backgroundColor: '#0285e4' }} onClick={() => copy(type === 'MINIPACK' ? data?.voucher_code : data?.payment_code)}>
                                        {() => (
                                            <>
                                                <Popover.Button
                                                    className="absolute inset-y-0 -right-4 px-3 flex items-center text-sm leading-5 rounded-r-full cursor-pointer"
                                                    style={{ backgroundColor: '#0285e4' }}
                                                >
                                                    <img src={'../../png/iconcopy.png'}
                                                        className="h-5 w-5 text-gray-400 self-center"
                                                        aria-hidden="true"
                                                    />
                                                </Popover.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="opacity-0 translate-y-1"
                                                    enterTo="opacity-100 translate-y-0"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="opacity-100 translate-y-0"
                                                    leaveTo="opacity-0 translate-y-1"
                                                >
                                                    <Popover.Panel className="absolute z-10 w-72 px-4 -mt-12 transform -translate-x-1/2">
                                                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                            <div className="relative gap-8 bg-green-400 p-2">
                                                                <div className="px-4">
                                                                    <p className="text-xs text-center font-semibold text-gray-600">
                                                                        Nomor Resi Berhasil tersalin
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Popover>
                                </div>
                            )}
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
                        <div className="ml-auto flex mt-6 w-48 lg:w-56">
                            <p className="self-center text-base text-right font-medium text-gray-500">{data?.receiver_address}</p>
                        </div>
                    </>
                )}
                <div className="flex mt-6">
                    <p className="self-center text-base font-medium text-gray-500">Cara Pembayaran</p>
                </div>
                <div className="ml-auto flex mt-6">
                    <p className="self-center text-base font-medium text-gray-500">{type === 'MINIPACK' ? data?.payment_method : data?.payment_name}</p>
                </div>
                {data?.payment_name !== 'OVO' && data?.voucher_code !== null && (
                    <>
                        <div className="flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">Kode Pembayaran</p>
                        </div>
                        <div className="w-auto ml-auto mr-4 mt-6">
                            <div className="ml-auto mt-3.5 relative flex items-stretch flex-grow ">
                                <button
                                    type="button"
                                    className="bg-gray-100 relative w-full border-none rounded-l-full shadow-sm py-3 pl-7 pr-12 text-left cursor-default focus:outline-none sm:text-sm"
                                    ariaHaspopup="listbox"
                                    ariaExpanded="true"
                                    ariaLabelledby="listbox-label"
                                    style={{ backgroundColor: 'rgba(2, 133, 228, 0.2)' }}
                                >
                                    <span class="block truncate font-semibold">
                                        {type === 'MINIPACK' ? data?.voucher_code : data?.payment_code}
                                    </span>
                                </button>

                                <Popover className="" style={{ backgroundColor: '#0285e4' }} onClick={() => copy(type === 'MINIPACK' ? data?.voucher_code : data?.payment_code)}>
                                    {() => (
                                        <>
                                            <Popover.Button
                                                className="absolute inset-y-0 -right-4 px-3 flex items-center text-sm leading-5 rounded-r-full cursor-pointer"
                                                style={{ backgroundColor: '#0285e4' }}
                                            >
                                                <img src={'../../png/iconcopy.png'}
                                                    className="h-5 w-5 text-gray-400 self-center"
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                            >
                                                <Popover.Panel className="absolute z-10 w-72 px-4 -mt-12 -right-7 ">
                                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                        <div className="relative gap-8 bg-green-400 p-2">
                                                            <div className="px-4">
                                                                <p className="text-xs text-center font-semibold text-white">
                                                                    Kode Pembayaran berhasil tersalin
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
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
                {data?.payment_method === 'OVO' || data?.payment_name === 'OVO' ? (
                    <>
                        <div className="flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">Biaya Admin</p>
                        </div>
                        <div className="ml-auto flex mt-6">
                            <p className="self-center text-base font-medium text-gray-500">Rp5.000</p>
                        </div>
                    </>
                ):''}
                <div className="flex mt-6">
                    <p className="self-center text-base font-medium text-gray-500">Qty</p>
                </div>
                <div className="ml-auto flex mt-6">
                    <p className="self-center text-base font-medium text-gray-500">{data?.product_qty}</p>
                </div>
                <div className="flex mt-6">
                    <p className="self-center text-base font-medium text-gray-500">Total Invoice</p>
                </div>
                <div className="ml-auto flex mt-6">
                    <p className="text-xl lg:text-2xl font-bold" style={{ color: '#0285e4' }}>Rp{convertToRupiah(data?.payment_method === 'OVO' || data?.payment_name === 'OVO' ? +data?.total_invoice + 5000 : data?.total_invoice)}</p>
                </div>
            </div>
        </div>
    )
}