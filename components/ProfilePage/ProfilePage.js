import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import Cookies from 'js-cookie';
import * as React from 'react'
import { activationStatus, getActiveMinipack, getProfil, getTransactionHistory } from '../../utils/apiHandlers';
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
    const [loadingAktivasi, setLoadingAktivasi] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [data, setData] = React.useState('')
    const [on, setOn] = React.useState(false)

    function Password(data = '') {
        let pass = []
        if (data.data !== '') {
            for (let i = 0; i < 10; i++) {
                pass.push(<div className='my-auto mx-1 w-2 h-2 rounded-full bg-white'></div>)
            }
        } else {
            pass.push(<div className='font-bold text-2xl'>-</div>)
        }

        return (
            <div className='flex'>
                {pass}
                {data.data !== '' &&
                    <div>
                        <EyeOffIcon className='h-5 w-5 ml-3 cursor-pointer' onClick={() => setOn(!on)} />
                    </div>
                }
            </div>
        )
    }

    const handleData = async () => {
        setLoadingAktivasi(true)
        try {
            const CryptoJS = require("crypto-js");
            const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
            const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
            const auth = Cookies.get('auth')
            const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);
            const getData = await activationStatus(decrypted)
            setData(getData?.data?.result)
        } catch (e) {
            console.log(e)
        }
        setLoadingAktivasi(false)
    }

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            const CryptoJS = require("crypto-js");
            const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
            const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
            const auth = Cookies.get('auth')
            const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);
            setEmail(decrypted)
            const data = { page: 1, email: decrypted, start_date: '2019-01-01', end_date: format(new Date(), 'yyyy-MM-dd'), page_size: '10', payment_status: '', keyword: '' }
            try {

                const [getData, getDataMinipack, getHistory] = await Promise.all([getProfil(decrypted), getActiveMinipack(decrypted), getTransactionHistory(data)])
                setProfil(getData)
                setMinipack(getDataMinipack)
                setHistory(getHistory.data.result.data)
                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            try {
                const CryptoJS = require("crypto-js");
                const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
                const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
                const auth = Cookies.get('auth')
                const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);
                const getAktivasi = await activationStatus(decrypted)
                setData(getAktivasi?.data?.result)
            } catch (e) {
                //
            }
        })();
    }, []);

    if (loading) {
        return (
            <>
                <div className="mb-24">
                    <div className="mt-40 flex justify-center animate-pulse">
                        <div className="w-96 lg:w-2/5 flex">
                            <div className="flex flex-col">
                                <div className="bg-gray-200 w-28 lg:w-72 h-36 lg:h-96 rounded-lg" />
                            </div>
                            <div className="flex flex-col text-right ml-auto space-y-9 lg:space-y-12 w-52">
                                <div>
                                    <div className="bg-gray-200 h-6 lg:h-8 w-full rounded-lg" />
                                </div>
                                <div>
                                    <div className="bg-gray-200 h-6 lg:h-8 w-full rounded-lg" />
                                </div>
                                <div>
                                    <div className="bg-gray-200 h-6 lg:h-8 w-full rounded-lg" />
                                </div>
                                <div>
                                    <div className="mt-8 w-full border-t border-gray-300" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="ml-auto bg-gray-200 h-6 lg:h-8 w-24 rounded-lg" />
                                    <div className="bg-gray-200 h-6 lg:h-8 w-52 mt-8 rounded-lg" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-12 lg:mt-8 flex justify-center">
                        <div className="w-96 lg:w-2/5">
                            <div className="bg-gray-200 h-6 lg:h-8 w-60 rounded-lg" />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="mb-14 lg:px-1 px-6">
                <div className="mt-40 flex justify-center">
                    <div className="w-96 lg:w-2/5 flex">
                        <div className="flex flex-col">
                            <img src={'../png/avatar.png'} className="w-28 lg:w-72 h-36 lg:h-96" />
                        </div>
                        <div className="flex flex-col text-right ml-auto space-y-9 lg:space-y-12">
                            <div className="pr-0 lg:pr-8">
                                <p className="text-base lg:text-2xl font-normal">Profil :</p>
                            </div>
                            <div className="pr-0 lg:pr-8">
                                <p className="text-base lg:text-2xl font-normal text-gray-500 break-all">{profil?.data?.result?.email}</p>
                            </div>
                            <div className="pr-0 lg:pr-8">
                                <p className="text-base lg:text-2xl font-normal text-gray-500">{profil?.data?.result?.phone_number}</p>
                            </div>
                            <div>
                                <div className="mt-8 w-full border-t border-gray-300" />
                            </div>
                            <div className="self-end">
                                <p className="text-sm lg:text-4xl font-semibold text-gray-500">{minipack?.data?.result.length}</p>
                                <p className="text-lg lg:text-xl font-light text-gray-500 mt-2">Paket Aktif</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <div className="w-96 lg:w-2/5  bg-white">
                        <p className="font-light text-4xl text-left">{profil?.data?.result?.name}</p>
                        <div>
                            <div className="mt-12 w-full border-t border-gray-300" />
                        </div>

                        {data !== '' &&
                            <div className='mt-12'>
                                <div className='flex justify-center'>
                                    <p className='font-nunito text-3xl font-extrabold text-center'>Xstream Box Saya : {data?.activation_status}</p>
                                </div>
                                <div className='mt-5 flex'>
                                    <button
                                        type="submit"
                                        className="flex gap-x-2 justify-center flex-row mx-auto bg-gray-100 w-full self-center items-center w-36 px-6 py-3.5 border border-transparent text-base font-semibold rounded-full shadow-sm text-gray-600"
                                        onClick={handleData}
                                    >
                                         {loadingAktivasi ?
                                                <div>Processing</div>
                                                :
                                                <>
                                                    <div> <img src={'../../../png/iconrefresh.png'} /></div>
                                                    <div>Refesh</div>
                                                </>
                                            }
                                    </button>
                                </div>
                                <div className='w-full flex flex-row gap-x-4'>
                                    <div className='w-1/2 flex flex-col gap-y-12 py-12'>
                                        <div className='flex flex-row gap-x-5'>
                                            <img src={'../png/status/black/box.png'} className='mx-2 my-auto' />
                                            <div className='flex flex-col my-auto gap-y-2'>
                                                <p className='font-bold text-2xl'>{data?.box_id || '-'}</p>
                                                <p className='font-base'>ID Box Anda</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-row gap-x-5'>
                                            <img src={'../png/status/black/email.png'} className='my-auto' />
                                            <div className='flex flex-col my-auto gap-y-2'>
                                                <p className='font-bold text-2xl break-all'>{data?.email || '-'}</p>
                                                <p className='font-base'>Login Box Anda</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-1/2 flex flex-col gap-y-12 py-12'>
                                        <div className='flex flex-row gap-x-5'>
                                            <img src={'../png/status/black/id.png'} className='my-auto' />
                                            <div className='flex flex-col my-auto gap-y-2'>
                                                <p className='font-bold text-2xl'>{data?.customer_id || '-'}</p>
                                                <p className='font-base'>ID Pelanggan</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-row gap-x-5'>
                                            <img src={'../png/status/black/password.png'} className='my-auto' />
                                            <div className='flex flex-col my-auto gap-y-2'>
                                                {on ?
                                                    <>
                                                        <div className='flex'>
                                                            <p className='font-bold text-2xl break-all'>{data?.box_pw || '-'} </p>
                                                            <EyeIcon className='h-5 w-5 ml-3 cursor-pointer my-auto' onClick={() => setOn(!on)} />
                                                        </div>
                                                    </>
                                                    :
                                                    <Password data={data?.box_pw} />
                                                }
                                                <p className={classNames(on ? "" : "mt-3", 'font-base')}>Password</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <dl class="space-y-0 divide-y divide-gray-200">
                            <Disclosure as="div" className="pt-20 pb-12">
                                {({ open }) => (
                                    <>
                                        <dt className="text-lg">
                                            <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                                <span className="font-semibold text-xl lg:text-2xl text-gray-600">Paket Saya</span>
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
                                                <span className="font-semibold text-xl lg:text-2xl text-gray-600">Riwayat Transaksi</span>
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