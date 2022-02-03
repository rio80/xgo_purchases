import { useSelector } from 'react-redux';
import * as React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { saveAs } from 'file-saver'

const downloadImage = async (file) => {

    saveAs(file, 'qrcode' + '.png')
}

export default function KodeBayarPage() {
    const url_qrcode = useSelector((state) => state.KodeReducer.url_qrcode)
    const router = useRouter()

    const cookie_qrcode = Cookies.get('qrcode')

    let qrcode = ''
    // if (typeof cookie_qrcode !== 'undefined') {
    //     if (url_qrcode !== '') {
    //         if (url_qrcode !== cookie_qrcode) {
    //             Cookies.set('qrcode', url_qrcode)
    //         }
    //     }
    //     qrcode = Cookies.get('qrcode')

    // } else {

    //     Cookies.set('qrcode', url_qrcode)
    //     qrcode = Cookies.get('qrcode')

    // }

    if (typeof cookie_qrcode !== 'undefined') {
        if (typeof url_qrcode !== 'undefined') {
            if (url_qrcode !== cookie_qrcode) {
                Cookies.set('qrcode', url_qrcode)
            }
        }
    } else {
        Cookies.set('qrcode', url_qrcode)
    }

    qrcode = Cookies.get('qrcode');

    let set_qrcode = qrcode;

    return (
        <>
            <div className="mt-40 flex justify-center">
                <p className="w-1/2 text-4xl font-semibold text-center">QR Code</p>
            </div>
            <div className="w-full justify-center mt-7">
                <p className="text-center text-stone-50">
                    Silahkan simpan atau scan QR Code dibawah untuk melanjutkan pembayaran
                </p>

            </div>
            <div className="w-full flex flex-col items-center mt-7">
                <img src={set_qrcode} width={283} height={283} />
            </div>
            <div className="flex justify-center mb-10">
                <button
                    type="button"
                    className="mx-auto lg:ml-auto w-48 mt-6 px-4 py-4 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    style={{ backgroundColor: '#0285e4' }}
                    onClick={() => downloadImage(set_qrcode)}
                >
                    Simpan QR Code
                </button>
            </div>
            <div className="w-full flex flex-row justify-center mt-1 gap-2 mb-32">
               <p>Powered by</p>
               <img src='../png/qris.png' width={117} height={20}/>
            </div>

        </>
    )
}