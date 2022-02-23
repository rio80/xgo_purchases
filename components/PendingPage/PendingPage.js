import css from './PendingPage.module.css'
import { format } from 'date-fns'
import router from 'next/router';
import { useRouter } from 'next/router';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PendingPage(prop) {
    const router = useRouter()
    const convertToRupiah = (angka) => {
        var rupiah = '';
        angka = angka.split('.');
        if(angka.length > 0){
            angka = angka[0];
        }
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return rupiah.split('', rupiah.length - 1).reverse().join('');
    }
    return (

        <div className="px-3.5">
            <div className={classNames("px-16 jutify-between w-full mx-auto lg:w-3/5 bg-white mt-72 rounded-md py-8 pt-16", css.customShadow)}>
                <div className="-mt-56 mb-6">
                    <img src={'../png/asset_pending.png'} width="274px" height="190px" />
                </div>
                <div className="w-full flex flex-col lg:flex-row">
                    <div className="lg:w-3/5 w-full">
                        <p className="text-3xl text-center lg:text-left font-semibold">
                            {prop.title}
                        </p>
                        <div className="flex mt-4">
                            <p className="text-[#5c5c5c] font-semibold font-base text-base lg:text-left text-center">
                            Silahkan kembali ke pembayaran yang Anda pilih dan segera lakukan pembayaran transaksi Anda.
                            </p>
                        </div>
                        <p className="font-base text-sm text-[#3b4452] lg:text-left text-center mt-8 lg:mt-4">
                            {format(new Date(), 'dd MMMM yyyy')}
                        </p>
                        <div className="flex flex-col lg:flex-row gap-x-12 lg:mt-7 mt-2 text-center">
                            <div className="flex flex-col self-center">
                                <div>
                                    <p className="text-gray-600 font-bold text-2xl my-auto">
                                        Rp {convertToRupiah(prop.harga)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col text-[#3b4452] font-semibold">
                                <div>
                                    Metode Pembayaran
                                </div>
                                <div className="mt-2">
                                    {/* <img src={prop.image} className="mx-auto lg:mx-0" width="66px" hegiht="15px" /> */}
                                   <span className='font-semibold text-lg'>{prop.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5">
                        <div className="flex justify-center lg:justify-end">
                            <button
                                type="button"
                                className="mx-auto lg:ml-auto w-auto mt-6 px-4 py-4 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                style={{ backgroundColor: '#0285e4' }}
                                onClick={()=>router.push(prop.onclick)}
                            >
                                {prop.title_back}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}