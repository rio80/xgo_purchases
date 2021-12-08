import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Cookies from 'js-cookie';
import * as React from 'react'
import { getActiveMinipack, getProfil, getTransactionHistory } from '../../utils/apiHandlers';
import PaketPage from './PaketPage/PaketPage';
import RiwayatTransaksi from './RiwayatPage/RiwayatTransaksi';
import { format } from 'date-fns'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfilePage() {
    const [profil, setProfil] = React.useState([])
    const [minipack, setMinipack] = React.useState([])
    const [history, setHistory] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState('')

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            const CryptoJS = require("crypto-js");
            const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
            const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
            const auth = Cookies.get('auth')
            const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);
            setEmail(decrypted)
            const data = {page: 1, email: decrypted, start_date: '2019-01-01', end_date:  format(new Date(), 'yyyy-MM-dd'), page_size: '10', payment_status: '', keyword: '' }
            try {
                const [getData, getDataMinipack, getHistory] = await Promise.all([getProfil(decrypted), getActiveMinipack(decrypted), getTransactionHistory(data)])
                setProfil(getData)
                setMinipack(getDataMinipack)
                setHistory(getHistory.data.result.data)
                setLoading(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                // setError(true)
            }
        })();
    }, []);

    if (loading) {
        return (
            <>
                <div className="mb-24">
                    <div className="mt-40 flex justify-center animate-pulse">
                        <div className="w-2/5 flex">
                            <div className="flex flex-col">
                                <div className="bg-gray-200 w-72 h-96 rounded-lg" />
                            </div>
                            <div className="flex flex-col text-right ml-auto space-y-12 w-52">
                                <div>
                                    <div className="bg-gray-200 h-8 w-full rounded-lg" />
                                </div>
                                <div>
                                    <div className="bg-gray-200 h-8 w-full rounded-lg" />
                                </div>
                                <div>
                                    <div className="bg-gray-200 h-8 w-full rounded-lg" />
                                </div>
                                <div>
                                    <div className="mt-8 w-full border-t border-gray-300" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="ml-auto bg-gray-200 h-8 w-24 rounded-lg" />
                                    <div className="bg-gray-200 h-8 w-52 mt-8 rounded-lg" />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="mt-8 flex justify-center">
                        <div className="w-2/5">
                            <div className="bg-gray-200 h-8 w-60 rounded-lg" />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="mb-14">
                <div className="mt-40 flex justify-center">
                    <div className="w-2/5 flex">
                        <div className="flex flex-col">
                            <img src={'../png/avatar.png'} width="291px" height="392px" />
                        </div>
                        <div className="flex flex-col text-right ml-auto space-y-12">
                            <div className="pr-8">
                                <p className="text-2xl font-normal">Profil :</p>
                            </div>
                            <div className="pr-8">
                                <p className="text-xl font-normal text-gray-500">{profil?.data?.result?.email}</p>
                            </div>
                            <div className="pr-8">
                                <p className="text-xl font-normal text-gray-500">{profil?.data?.result?.phone_number}</p>
                            </div>
                            <div>
                                <div className="mt-8 w-full border-t border-gray-300" />
                            </div>
                            <div className="self-end">
                                <p className="text-4xl font-semibold text-gray-500">{minipack?.data?.result.length}</p>
                                <p className="text-xl font-light text-gray-500 mt-2">Paket Aktif</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <div className="w-2/5 bg-white">
                        <p className="font-light text-4xl text-left">{profil?.data?.result?.name}</p>
                        <div>
                            <div className="mt-12 w-full border-t border-gray-300" />
                        </div>
                        <dl class="space-y-0 divide-y divide-gray-200">
                            <Disclosure as="div" className="pt-20 pb-12">
                                {({ open }) => (
                                    <>
                                        <dt className="text-lg">
                                            <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                                <span className="font-semibold text-2xl text-gray-600">Paket Saya</span>
                                                <span className="ml-6 h-7 flex items-center">
                                                    <ChevronRightIcon
                                                        className={classNames(open ? 'transform rotate-90 transition duration-300' : 'transform rotate-0 transition duration-300', 'h-6 w-6 transform')}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd">
                                            <PaketPage minipack={minipack} />
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <Disclosure as="div" className="pt-16">
                                {({ open }) => (
                                    <>
                                        <dt className="text-lg">
                                            <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                                <span className="font-semibold text-2xl text-gray-600">Riwayat Transaksi</span>
                                                <span className="ml-6 h-7 flex items-center">
                                                    <ChevronRightIcon
                                                        className={classNames(open ? 'transform rotate-90 transition duration-300' : 'transform rotate-0 transition duration-300', 'h-6 w-6 transform')}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd">
                                            <RiwayatTransaksi history={history} email={email} />
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}