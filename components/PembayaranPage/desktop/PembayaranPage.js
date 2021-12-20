import { useEffect, useState, Fragment } from 'react'
import { RadioGroup, Listbox, Transition, Popover } from '@headlessui/react'
import { CheckIcon, MailIcon, SelectorIcon } from '@heroicons/react/solid'
import css from './PembayaranPage.module.css'
import { createOrderBox, createOrderMinipack, createRequestPayment, getProfil } from '../../../utils/apiHandlers'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Alert from '../../../pages/shared/alert/Alert'
import Tooltip from '../Tooltip'
import { useDispatch } from 'react-redux'
import { KodeAction } from '../../../store/KodeBayar/KodeBayarAction'
import { addMonths, format } from 'date-fns'

const plans = [
    { name: 'Kode Bayar', logo: '../png/v+.png', width: '32px', height: '14px', id: '4' },
    { name: 'Doku OVO', logo: '../png/dokuovo.png', width: '51px', height: '21px', id: '6' },
    { name: 'Gopay', logo: '../png/gopay.png', width: '59px', height: '14px', id: '' },
    { name: 'Pulsa', logo: '../png/telkomsel.png', width: '66px', height: '16px', id: '' },
]

const people = [
    { id: 1, name: 'Telkomsel' },
    { id: 2, name: 'Smartfren' }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PembayaranPage({ type = 'minipack' }) {
    const [profil, setProfil] = useState([])
    const datapayment = JSON.parse(localStorage.getItem('payment'))
    const paket = JSON.parse(Cookies.get('paket'))
    const dispatch = useDispatch()
    const router = useRouter()
    const [selected, setSelected] = useState(plans[0])
    const [selected2, setSelected2] = useState(people[0])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false);
    const today = new Date()
    const start = format(today, 'dd MMM yyyy')
    const sum = addMonths(today, paket.durasi);
    const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
    const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
    const auth = Cookies.get('auth')
    const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);
    const [coming, setComing] = useState(false);

    const closeComing = (data) => {
        setComing(data);
    };

    const handleBayar = async () => {
        createOrder()
    }

    const checkPayment = async () => {
        const datapayment = JSON.parse(localStorage.getItem('payment'))
        const phone = profil?.data?.result?.phone_number
        try {
            let submit = ''
            if (type === 'minipack') {
                submit = {
                    ...datapayment,
                    order_id: Cookies.get('order_id'),
                    customer_email: profil?.data?.result?.email,
                    customer_mobilephone: phone.replace(/\D/gm, ''),
                    customer_name: profil?.data?.result?.name
                }
            } else {
                submit = {
                    ...datapayment,
                    customer_email: profil?.data?.result?.email,
                    order_id: Cookies.get('order_id')
                }
            }

            const reqPayment = await createRequestPayment(submit)
            setLoading(false)
            router.push(reqPayment?.data?.result?.url_doku)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    const createOrder = async () => {
        setLoading(true)
        try {
            const createorder = JSON.parse(localStorage.getItem('checkout'))
            let submit = ''
            let postData = ''

            if (type === 'minipack') {
                submit = {
                    ...createorder,
                    payment_method_id: selected.id,
                    email: profil?.data?.result?.email,
                    receiver_email: profil?.data?.result?.email
                }

                postData = await createOrderMinipack(submit);
            } else {
                submit = {
                    ...createorder,
                    PaymentMethodId: selected.id
                }

                postData = await createOrderBox(submit);
            }

            const orderId = type === 'minipack' ? postData?.data?.result?.order_id : postData?.data?.result?.OrderId
            Cookies.set('order_id', orderId)
            if (selected.id === '6') {
                checkPayment()
            } else {
                dispatch({
                    type: KodeAction.SET_KODE,
                    kode: type === 'minipack' ? postData?.data?.result?.payment_code : postData?.data?.result?.PaymentCode,
                });
                router.push('/kode-bayar')
            }
        } catch (e) {
            setLoading(false)
            setError(e?.res?.data?.message?.[0])
            setOpen(true)
            setLoading(false)
        }
    }

    const closeModal = (data) => {
        setOpen(data);
    };

    const convertToRupiah = (angka = 0) => {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    const sumAmount = () => {
        let totalHarga = 0
        if (selected.id === '6') {
            totalHarga = datapayment.amount + 5000
        } else {
            totalHarga = datapayment.amount
        }

        return totalHarga
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const getData = await getProfil(decrypted);
                setProfil(getData)
                setLoading(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
            }
        })();
    }, []);

    const handleComing = (data) => {
        // console.log('hai')
        if (data === 'Gopay' || data === 'Pulsa') {
            setComing(!coming)
        }
    }

    return (
        <>
            {loading &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                    <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
                </div>
            }

            {open && <Alert type={0} title={'Pembayaran Gagal'} message={error} link={type === 'minipack' ? '/pembelian-minipack' : 'pembelian-box'} close={closeModal} />}
            {coming && <Alert type={1} title={'Coming Soon'} message={''} close={closeComing} />}

            <div className="grid grid-col-2 overflow-auto">
                <div className="absolute top-0 left-0 w-2/4 min-h-screen pb-10 pt-12 pl-56" style={{ backgroundColor: '#f6f9ff' }}>
                    <p className="font-medium text-2xl mt-24">
                        Pembayaran
                    </p>

                    <div className={classNames('w-5/6 bg-white shadow mt-8 px-8 py-7 rounded-lg', css.customShadow)}>
                        <p className="font-medium text-base">
                            Informasi Kontak
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        defaultValue={decrypted}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <p className="mt-1 text-gray-400 font-light text-xs">Email ini adalah alamat email yang terdaftar di akun Anda</p>
                            </div>
                            <div className="mt-0.5 mx-1">
                                <div className="relative flex items-center">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="comments"
                                            aria-describedby="comments-description"
                                            name="comments"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="comments" className="font-small text-xs text-gray-700">
                                            Tetap kabari saya tentang penawaran eksklusif
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="w-5/6 bg-white shadow mt-8 px-8 py-7 rounded-lg" style={{ boxShadow: '0 4px 40px 0 rgba(112, 144, 176, 0.2)' }}>
                        <p className="font-medium text-base">
                            Metode Pembayaran
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
                            <div className="sm:col-span-3">
                                <RadioGroup value={selected} onChange={setSelected}>
                                    <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
                                    <div className="relative bg-white rounded-md -space-y-px">
                                        {plans.map((plan, planIdx) => (
                                            <div onClick={() => handleComing(plan.name)} key={plan.name}>
                                                <RadioGroup.Option
                                                    key={plan.name}
                                                    value={plan}
                                                    className={({ checked }) =>
                                                        classNames(
                                                            planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                                            planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                                            checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
                                                            'relative block border p-4 cursor-pointer focus:outline-none sm:flex sm:justify-between'
                                                        )
                                                    }
                                                    disabled={plan.name === 'Gopay' || plan.name === 'Pulsa' ? true : false}
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <div className="flex items-center text-sm" >
                                                                <span
                                                                    className={classNames(
                                                                        checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                                        active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                                                        'h-4 w-4 rounded-full border flex items-center justify-center'
                                                                    )}
                                                                    aria-hidden="true"
                                                                >
                                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                                </span>
                                                                <RadioGroup.Label
                                                                    as="span"
                                                                    className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'ml-3 font-medium')}
                                                                >
                                                                    {plan.name}
                                                                </RadioGroup.Label>
                                                            </div>
                                                            <RadioGroup.Description
                                                                className={classNames(
                                                                    checked ? 'text-indigo-700' : 'text-gray-500',
                                                                    'mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"'
                                                                )}
                                                            >

                                                                {plan.name === 'Pulsa' ?
                                                                    <span className="grid grid-cols-2">
                                                                        <span>
                                                                            <img src={'../png/telkomsel.png'} width="66px" height="16px" className="self-center" />
                                                                        </span>
                                                                        <span className="ml-4">
                                                                            <img src={'../png/smartfren.png'} width="56px" height="9px" className="self-center mt-1" />
                                                                        </span>
                                                                    </span>
                                                                    :
                                                                    <img src={plan.logo} width={plan.width} height={plan.height} />
                                                                }
                                                            </RadioGroup.Description>
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            {selected.name === 'Pulsa' &&
                                <>
                                    <div className="sm:col-span-3">
                                        <div className="mt-1">
                                            <Listbox value={selected2} onChange={setSelected2}>
                                                <Listbox.Label className="block text-sm font-medium text-gray-700">Pilih Operator</Listbox.Label>
                                                <div className="mt-1 relative">
                                                    <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <span className="block truncate">{selected2.name}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                            {people.map((person) => (
                                                                <Listbox.Option
                                                                    key={person.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                        )
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected2, active }) => (
                                                                        <>
                                                                            <span className={classNames(selected2 ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                {person.name}
                                                                            </span>

                                                                            {selected2 ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>


                                    <div className="col-span-3">
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                            Nomor Handphone
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                +62
                                            </span>
                                            <input
                                                type="text"
                                                name="company-website"
                                                id="company-website"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                placeholder="87873941697"
                                            />
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-2/4 h-full pl-20 bg-white">
                    <p className="font-medium text-base mt-36">
                        Ringkasan Pesanan
                    </p>

                    <div className="w-80 bg-white shadow mt-8 p-6 rounded-lg" style={{ background: 'linear-gradient(90deg, rgba(0,36,3,1) 0%, rgba(212,13,150,1) 0%, rgba(73,88,218,1) 100%)' }}>
                        <p className="font-normal text-base text-white">
                            {paket?.name ? (
                                <>
                                    Paket {paket?.name}
                                </>
                            ) : (
                                <>
                                    Paket {paket?.durasi} Bulan {paket.paket}
                                </>
                            )}
                        </p>
                        <p className="font-normal text-xs text-white mt-1">
                            {decrypted}
                        </p>
                        <div className="flex mt-7">
                            <div className="self-center">
                                <p className="text-xs text-white">{paket?.name ? (
                                    <>
                                        {paket?.name}
                                    </>
                                ) : (
                                    <>
                                        Paket {paket?.durasi} Bulan {paket.paket}
                                    </>
                                )}</p>
                            </div>
                            <div className="text-xs text-white ml-auto">
                                <p>RP {convertToRupiah(datapayment?.amount)}</p>
                            </div>
                        </div>
                        {selected.id === '6' ? (
                            <div className="flex mt-2">
                                <div className="self-center">
                                    <div className="flex flex-row">
                                        <div className="self-center"><p className="text-xs text-white">Biaya Admin OVO </p></div>
                                        <div className="pt-1"><Tooltip className="self-center" /></div>
                                    </div>
                                </div>

                                <div className="text-xs text-white ml-auto mt-1">
                                    <p>RP {convertToRupiah(5000)}</p>
                                </div>
                            </div>
                        ) : ('')}
                        <div className="relative mt-2.5">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-100" />
                            </div>
                        </div>
                        <div className="flex mt-5">
                            <div className="self-center">
                                <p className="text-xs text-white">Total</p>
                            </div>
                            <div className="text-lg font-semibold text-white ml-auto">
                                <p>RP {convertToRupiah(sumAmount())}</p>
                            </div>
                        </div>
                        <p className="font-normal text-xs text-white mt-6">
                            {paket.name === '' ? (
                                <>
                                    Mulai {start} - {format(sum, 'dd MMMM yyyy')}
                                </>
                            ) : (
                                ''
                            )}
                        </p>
                        <p className="font-light text-xs text-white mt-1">
                            <u>Syarat dan ketentuan</u> berlaku
                        </p>
                    </div>

                    <div className="w-80">
                        <button
                            type="button"
                            className="font-normal text-base text-white mt-8 w-full self-center items-center px-8 py-4 border border-transparent text-xs leading-4 font-light rounded-full shadow-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: '#0285e4' }}
                            onClick={handleBayar}
                        >
                            Lanjut Bayar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}