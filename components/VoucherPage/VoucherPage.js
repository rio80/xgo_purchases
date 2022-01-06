import React from 'react'
import Cookies from "js-cookie";
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { activationMinipack } from "../../utils/apiHandlers";

export default function VoucherPage() {
    const router = useRouter()
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [status, setStatus] = React.useState('')
    const [load, setLoad] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const auth = Cookies.get('auth')

    const handlePost = async (handleSubmit) => {
        setLoad(true)
        let data = {
            ...handleSubmit,
            email: getEmail()
        }
        try {
            const postVoucher = await activationMinipack(data)
            if (postVoucher) {
                setStatus('berhasil')
            }
        } catch (e) {
            setStatus('gagal')
            setMessage(e?.res?.data?.message?.[0])
        }
    };

    function StatusSuccess() {
        return (
            <div className="mt-56 flex justify-center px-4">
                <div className="flex w-full lg:w-2/4 px-16 py-16 bg-white my-auto rounded-2xl flex-col lg:flex-row" style={{ boxShadow: '0 4px 31px 0 rgba(74, 105, 134, 0.15)' }}>
                    <div className="w-38">
                        <p className="text-3xl font-semibold"> Selamat</p>
                        <p className="text-sm font-normal mt-2 text-gray-500"> Kode voucher yang Anda input benar</p>
                    </div>
                    <div className="flex mr-auto mt-5 lg:mt-0 lg:ml-auto self-center">
                        <button
                            type="button"
                            className="w-full self-center items-center px-5 py-4 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: '#0285e4' }}
                            onClick={() => router.push('/')}
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                </div>


            </div>
        )
    }

    function StatusFailed({ data = '' }) {
        return (
            <div className="mt-56 flex justify-center px-4">
                <div className="flex w-full lg:w-2/4 px-16 py-16 bg-white my-auto rounded-2xl flex-col lg:flex-row" style={{ boxShadow: '0 4px 31px 0 rgba(74, 105, 134, 0.15)' }}>
                    <div className="w-38">
                        <p className="text-3xl font-semibold"> Aktivasi Gagal</p>
                        <p className="text-sm font-normal mt-2 text-gray-500"> {data || 'Kode voucher yang Anda input salah'} </p>
                    </div>
                    <div className="flex mr-auto mt-5 lg:mt-0 lg:ml-auto self-center">
                        <button
                            type="button"
                            className="w-full self-center items-center px-5 py-4 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: '#0285e4' }}
                            onClick={() => router.push('/')}
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const getEmail = () => {
        const CryptoJS = require("crypto-js");
        const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
        const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
        const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);

        return decrypted
    }

    return (
        <>
            {status === 'berhasil' ? <StatusSuccess /> : status === 'gagal' ? <StatusFailed data={message} /> :
                <>
                    <div className="mt-40 flex justify-center">
                        <p className="w-full lg:w-1/2 text-4xl font-semibold text-center">Input Voucher</p>
                    </div>
                    <div className="flex justify-center mt-7 px-8 lg:px-0">
                        <p className="text-lg font-light text-center lg:text-left">Silahkan masukan kode voucher yang Anda miliki disini</p>
                    </div>
                    <form onSubmit={handleSubmit(handlePost)}>
                        <div className="flex justify-center mt-20 px-8">
                            <div className="w-full lg:w-2/4 relative flex">
                                <input
                                    type="text"
                                    name="first-name"
                                    placeholder="Masukan Kode Voucher Anda"
                                    className="h-16 lg:h-20 py-3.5 pl-24 pr-3.5 block w-full text-xs lg:text-sm border-0 rounded-full"
                                    style={{ boxShadow: '0 4px 31px 0 rgba(74, 105, 134, 0.15)' }}
                                    {...register("voucher_code", { required: true })}
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
                                        type="submit"
                                        className="w-full self-center items-center px-5 lg:px-11 py-2.5 lg:py-4 border border-transparent text-xs lg:text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        style={{ backgroundColor: '#0285e4' }}
                                    >
                                        {load ? 'Processing' : 'Aktivasi'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {errors.voucher_code && (
                            <p class="mt-5 text-red-500 text-xs text-center">
                                Mohon masukkan kode voucher anda
                            </p>
                        )}
                    </form>
                    <div className="mt-14 justify-center flex cursor-pointer" onClick={() => router.push('/pembelian-minipack')}>
                        <div className="flex flex-wrap content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#0285e4' }}>
                                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div style={{ color: '#0285e4' }}>
                            <p className="self-center ml-2 font-normal text-lg">Kembali ke Pembelian</p>
                        </div>
                    </div>
                </>
            }
        </>
    )
}