import { useSelector } from 'react-redux';
import * as React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function KodeBayarPage() {
    const kode_bayar = useSelector((state) => state.KodeReducer.kode)
    const [copied, setCopied] = React.useState('')
    const textAreaRef = React.useRef(null)
    const router = useRouter()
    const cookie_kode_bayar = Cookies.get('kode_bayar')

    let kode = ''
    if (typeof cookie_kode_bayar !== 'undefined') {
        if (kode_bayar !== '') {
            if (kode_bayar !== cookie_kode_bayar) {
                Cookies.set('kode_bayar', kode_bayar)
            }
        }
        kode = Cookies.get('kode_bayar')
    } else {
        Cookies.set('kode_bayar', kode_bayar)
        kode = Cookies.get('kode_bayar')
    }

    const copy = () => {
        navigator.clipboard.writeText(kode_bayar)
        setCopied('Kode Bayar berhasil di salin!');
        localStorage.removeItem('payment')
        localStorage.removeItem('checkout')
    }

    return (
        <>
            <div className="mt-40 flex justify-center">
                <p className="w-1/2 text-4xl font-semibold text-center">Kode Bayar</p>
            </div>
            <div className="flex justify-center mt-7">
                <p className="text-lg font-light">Silahkan simpan kode bayar Anda berikut ini</p>
            </div>

            <div className="flex justify-center mt-20 px-8 lg:px-0">
                <div className="w-full lg:w-2/4 relative flex">
                    <input
                        type="text"
                        name="first-name"
                        defaultValue={kode}
                        disabled
                        ref={textAreaRef}
                        className="h-20 py-3.5 pl-11 pr-3.5 block w-full sm:text-sm border-0 rounded-full"
                        style={{ boxShadow: '0 4px 31px 0 rgba(74, 105, 134, 0.15)' }}
                    />
                    <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-sm leading-5">
                        <button
                            type="button"
                            className="w-full self-center items-center px-11 py-4 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: '#0285e4' }}
                            onClick={copy}
                        >
                            {copied !== '' ? 'Tersalin' : 'Salin'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-52">
                <div className="mt-14 flex cursor-pointer" onClick={() => router.push('/')}>
                    <div className="flex flex-wrap content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#0285e4' }}>
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div style={{ color: '#0285e4' }}>
                        <p className="self-center ml-2 font-normal text-lg" onClick={() => router.push('/')}>Kembali ke Home</p>
                    </div>
                </div>
            </div>
        </>
    )
}