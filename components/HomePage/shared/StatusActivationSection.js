import * as React from 'react'
import css from './HomePage.module.css'
import Alert from "../../../pages/shared/alert/Alert";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { Dialog, Popover, Transition } from '@headlessui/react'
import { activationBox, activationStatus, reprocessActivation } from '../../../utils/apiHandlers';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function StatusActivationSection({ data = '' }) {
    const [dataAktivasi, setDataAktivasi] = React.useState(data)
    const [aktivasi, setAktivasi] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [on, setOn] = React.useState(false)
    const auth = Cookies.get('auth')

    const getEmail = () => {
        const CryptoJS = require("crypto-js");
        const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
        const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
        const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);

        return decrypted
    }

    const handleData = async () => {
        setLoading(true)
        try {
            if (dataAktivasi?.activation_status === 'Failed') {
                const postData = await reprocessActivation({ email: dataAktivasi?.email, activation_id: dataAktivasi?.activation_id })
                if (postData) {
                    const getData = await activationStatus(getEmail())
                    setDataAktivasi(getData?.data?.result)
                }
            } else {
                const getData = await activationStatus(getEmail())
                setDataAktivasi(getData?.data?.result)
            }
        } catch (e) {
            // console.log(e)
        }
        setLoading(false)
    }

    const expand = () => {
        setAktivasi(!aktivasi)
    }

    function Password(data = '') {
        let pass = []
        if (data.data !== '') {
            for (let i = 0; i < 10; i++) {
                pass.push(<div className='my-auto mx-1 w-2 h-2 rounded-full bg-white'></div>)
            }
        } else {
            pass.push(<div className='text-white'>-</div>)
        }

        return (
            <div className='flex'>
                {pass}
                {data.data !== '' &&
                    <div>
                        <EyeOffIcon className='text-gray-50 h-5 w-5 ml-3 cursor-pointer' onClick={() => setOn(!on)} />
                    </div>
                }
            </div>
        )
    }

    function ButtonStatus(data = '') {
        let view = ''
        if (data?.data === 'Failed') {
            view = (
                <>
                    <div>
                        <img src={'../../../png/iconrefreshwhite.png'} />
                    </div>
                    <div className='text-white'>Ulangi Aktivasi</div>
                </>
            )
        } else if (data?.data === 'In Process') {
            view = (
                <>
                    <div>
                        <img src={'../../../png/iconrefreshwhite.png'} />
                    </div>
                    <div className='text-white'>Refesh</div>
                </>
            )
        } else {
            ''
        }

        return view
    }

    const reprocess = () => {
        
    }

    return (
        <>
            <div className="flex justify-center" style={{ backgroundColor: '#0285e4' }}>
                <div className={classNames(aktivasi ? css.openAktivasi : css.closeAktivasi, css.activation, "w-full py-20 gap-x-6 px-14 ")}>
                    <div className="flex justify-center">
                        <p className="font-nunito text-center text-white font-bold text-4xl px-4 lg:px-0">Status Aktivasi Xstream Box Anda</p>
                    </div>
                    <div className="flex mt-16">
                        <div className="flex flex-col w-64 pt-7 mx-auto px-20 gap-y-2 cursor-pointer" onClick={expand}>
                            <div className="flex justify-center">
                                <p className="text-white text-lg">Klik Disini</p>
                            </div>
                            <div className="flex justify-center">
                                <img src={'../../../png/gif/scrolldown.gif'} className={classNames(aktivasi ? "transform -rotate-180 transition duration-300" : "transform rotate-0 transition duration-300", "h-12 w-12")} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-14 flex mx-auto" style={{ maxWidth: '1024px' }}>
                        <div className='flex flex-col lg:grid lg:grid-cols-6 lg:grid-rows-4 lg:gap-y-8 gap-x-8 mt-8 mx-auto justify-between gap-y-8'>
                            <div className='lg:col-span-2 row-span-4 flex my-auto flex-col'>
                                <p className='mx-auto text-gray-50 font-nunito font-extrabold text-xl lg:mx-0 lg:text-4xl'>{dataAktivasi?.activation_status}</p>
                                <div className='flex flex-row mt-4 gap-x-4 mx-auto lg:mx-0'>
                                    <div className='my-auto'>
                                        <p className='text-gray-50 font-regular text-base'>Status</p>
                                    </div>
                                    {dataAktivasi.activation_status !== 'Activated' &&
                                        <div className='flex max-w-96'>
                                            <button
                                                type="submit"
                                                className="flex gap-x-2 justify-center flex-row w-full self-center items-center px-6 py-2 border border-transparent text-base font-semibold rounded-lg shadow-sm text-gray-600"
                                                style={{ backgroundColor: '#0285e4', border: 'solid 2px rgba(255, 255, 255, 0.37)' }}
                                                onClick={handleData}
                                            >
                                                {loading ?
                                                    <div className='text-white'>Processing</div>
                                                    :
                                                    <ButtonStatus data={dataAktivasi?.activation_status} />
                                                }
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='col-span-2 row-span-2 flex gap-x-5'>
                                <img src={'../../../png/status/box.png'} className='mx-2 my-auto' />
                                <div className='flex flex-col my-auto gap-y-2'>
                                    <p className='font-bold text-gray-50 text-xl'>{dataAktivasi?.box_id || '-'}</p>
                                    <p className='font-base text-gray-50'>ID Box Anda</p>
                                </div>
                            </div>
                            <div className='col-span-2 row-span-2 flex gap-x-5'>
                                <img src={'../../../png/status/id.png'} className='my-auto' />
                                <div className='flex flex-col my-auto gap-y-2'>
                                    <p className='font-bold text-gray-50 text-xl'>{dataAktivasi?.customer_id || '-'}</p>
                                    <p className='font-base text-gray-50'>ID Pelanggan</p>
                                </div>
                            </div>
                            <div className='col-span-2 row-span-2 flex gap-x-5'>
                                <img src={'../../../png/status/email.png'} className='my-auto' />
                                <div className='flex flex-col my-auto gap-y-2'>
                                    <p className='font-bold text-gray-50 text-xl break-all'>{dataAktivasi?.email || '-'}</p>
                                    <p className='font-base text-gray-50'>Login Box Anda</p>
                                </div>
                            </div>
                            <div className='col-span-2 row-span-2 flex gap-x-5'>
                                <img src={'../../../png/status/password.png'} className='my-auto' />
                                <div className='flex flex-col my-auto gap-y-2'>
                                    {on ?
                                        <>
                                            <div className='flex'>
                                                <p className='font-bold text-gray-50 text-xl break-all'>{dataAktivasi?.box_pw} </p>
                                                <EyeIcon className='text-gray-50 h-5 w-5 ml-3 cursor-pointer my-auto' onClick={() => setOn(!on)} />
                                            </div>
                                        </>
                                        :
                                        <Password data={data?.box_pw} />
                                    }

                                    <p className='font-base text-gray-50'>Password</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}