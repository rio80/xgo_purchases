import Cookies from 'js-cookie';
import * as React from 'react'
import config from '../../../utils/config';
import DetailRiwayatPage from '../DetailRiwayatPage/DetailRiwayatPage';
import { useRouter } from 'next/router';

export default function RiwayatTransaksi({ history, email }) {
    const Router = useRouter()
    const [idxcontent, setIdxcontent] = React.useState('')

    const select = (idx) => {
        if (idxcontent === idx) {
            setIdxcontent('')
        } else {
            setIdxcontent(idx)
        }
    }

    const convertToRupiah = (angka = 0) => {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    const camelize = (str = '') => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    const handleReorder = (id_minipack, price, minipack) => {
        const data = {
            package_id: '' + config.idPackage,
            receiver_type: 'SELF',
            activation_process: 'IMMEDIATE',
            minipack_id: id_minipack,
            total_amount: price
        }

        const payment = {
            app_id: "webxgo",
            payment_type: "internal_app",
            app_url_validation: "https://xgo.co.id/api/validate/id=123321",
            app_url_callback: config.domain,
            amount: +price,
            item_details: [
                {
                    id: id_minipack,
                    price: +price,
                    quantity: 1,
                    name: minipack
                }
            ]
        }

        const dataMinipack = minipack.split(' ')
        const dataPaket = {
            paket: dataMinipack[0],
            durasi: dataMinipack[1]
        }

        Cookies.set('paket', JSON.stringify(dataPaket));
        localStorage.setItem('checkout', JSON.stringify(data));
        localStorage.setItem('payment', JSON.stringify(payment));

        Router.push('/pembayaran')
    }

    return (
        <>
            {history.map((data, idx) => (
                <div className="mt-14" key={idx}>
                    <div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-xl text-gray-500">{data?.transaction_date_fmt}</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: '#0285e4' }}>Rp{convertToRupiah(data?.product_amount)}</p>
                            </div>
                        </div>
                        <div className="flex flex-row mt-14">
                            <div style={{ width: '300px', height: '160px' }} className="mr-14">
                                <img className="object-cover w-full h-full" src={data?.thumbnail_img} alt="decoder1" />
                            </div>
                            <div className="flex flex-col w-full">
                                <div>
                                    <p className="text-base font-bold" style={{ color: '#3abf94' }}>{camelize(data?.payment_status)}</p>
                                </div>
                                <div className="mt-5">
                                    <p className="font-nunito text-3xl font-bold">{camelize(data?.product_name)}</p>
                                </div>
                                <div className="flex h-full">
                                    <div className="mt-auto">
                                        <div>
                                            <button
                                                type="button"
                                                className="flex flex-row w-full items-center px-6 py-3 border border-transparent text-base rounded-full shadow-sm text-gray-600"
                                                style={{ backgroundColor: '#ededed' }}
                                                onClick={() => select(idx)}
                                            >
                                                <div>
                                                    <p className="leading-4 font-semibold">Lihat Transaksi</p>
                                                </div>
                                                <div>
                                                    <img src={'../../png/iconarrow.png'}
                                                        className="ml-2 h-5 w-5 text-gray-400 cursor-pointer"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    {data?.purchase_type === 'BOX' ? (
                                        <div className="mt-auto">
                                            <button
                                                type="button"
                                                className="flex flex-row w-full items-center px-6 py-3 ml-3 border border-transparent text-base leading-4 font-semibold rounded-full shadow-sm text-gray-600"
                                                style={{ backgroundColor: '#ededed' }}
                                            >
                                                <div>
                                                    <p className="leading-4 font-semibold">Tracking</p>
                                                </div>
                                                <div>
                                                    <img src={'../../png/icontracking.png'}
                                                        className="ml-4 h-5 w-5 text-gray-400 cursor-pointer"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    ) : data?.payment_status === 'PAID' ?
                                        (
                                            ''
                                            // <div className="mt-auto">
                                            //     <button
                                            //         type="button"
                                            //         className="flex w-full items-center px-6 py-3.5 ml-3 border border-transparent text-base leading-4 font-semibold rounded-full shadow-sm text-white"
                                            //         style={{ backgroundColor: '#0285e4' }}
                                            //         onClick={() => handleReorder(data?.package_id, data?.product_amount, data?.product_name)}
                                            //     >
                                            //         <div className="mx-auto">
                                            //             <p className="leading-4 font-semibold">Beli Lagi</p>
                                            //         </div>
                                            //     </button>
                                            // </div>
                                        ) : ''}
                                </div>
                            </div>
                        </div>
                        {idxcontent !== '' && idx === idxcontent ? (
                            <DetailRiwayatPage type={data?.purchase_type} transactionId={data?.transaction_id} email={email} />
                        ) : (
                            ''
                        )}
                    </div>
                    <div>
                        <div className="mt-12 w-full border-t border-gray-300" />
                    </div>
                </div>
            ))}
        </>
    )
}