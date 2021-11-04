import { useState, Fragment } from 'react'
import { RadioGroup, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, MailIcon, SelectorIcon } from '@heroicons/react/solid'
import css from './PembayaranPage.module.css'
import { createOrderMinipack, createRequestPayment } from '../../utils/apiHandlers'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const plans = [
    { name: 'Kode Bayar', logo: '../png/v+.png', width: '32px', height: '14px' },
    { name: 'Doku OVO', logo: '../png/dokuovo.png', width: '51px', height: '21px' },
    { name: 'Gopay', logo: '../png/gopay.png', width: '59px', height: '14px' },
    { name: 'Pulsa', logo: '../png/telkomsel.png', width: '66px', height: '16px' },
]

const people = [
    { id: 1, name: 'Telkomsel' },
    { id: 2, name: 'Smartfren' }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PembayaranPage() {
    const router = useRouter()
    const [selected, setSelected] = useState(plans[0])
    const [selected2, setSelected2] = useState(people[0])
    const [loading, setLoading] = useState(false)

    const handleBayar = async () => {
        setLoading(true)
        const createorder = JSON.parse(localStorage.getItem('checkout'))
        const datapayment = JSON.parse(localStorage.getItem('payment'))

        // if(typeof Cookies.get('order_id') === 'undefined'){
        //     const postData = await createOrderMinipack(createorder);
        // }

        const postData = await createOrderMinipack(createorder);
        if (postData.status) {
            const orderId = postData?.data?.result?.order_id
            Cookies.set('order_id', orderId)
            let submit = {
                ...datapayment,
                order_id: orderId
            }
            const reqPayment = await createRequestPayment(submit)
            router.push(reqPayment?.data?.result?.url_doku)
        }
        setLoading(false)
    }
    return (
        <>

            {loading &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                    <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
                </div>
            }

            <div className="grid grid-col-2 overflow-auto hidden lg:block">
                <div className="absolute top-0 left-0 w-2/4 min-h-screen pb-10 pl-56" style={{ backgroundColor: '#f6f9ff' }}>
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
                                        defaultValue={'testprojectrans@gmail.com'}
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
                                            >
                                                {({ active, checked }) => (
                                                    <>
                                                        <div className="flex items-center text-sm">
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
                                                                <div className="grid grid-cols-2">
                                                                    <div>
                                                                        <img src={'../png/telkomsel.png'} width="66px" height="16px" className="self-center" />

                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <img src={'../png/smartfren.png'} width="56px" height="9px" className="self-center mt-1" />
                                                                    </div>
                                                                </div>
                                                                :
                                                                <img src={plan.logo} width={plan.width} height={plan.height} />
                                                            }
                                                        </RadioGroup.Description>
                                                    </>
                                                )}
                                            </RadioGroup.Option>
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
                            Paket 30 Hari Gratis VOD
                        </p>
                        <p className="font-normal text-xs text-white mt-1">
                            testprojectrans@gmail.com
                        </p>
                        <div className="flex mt-5">
                            <div className="self-center">
                                <p className="text-xs text-white">Total</p>
                            </div>
                            <div className="text-lg font-semibold text-white ml-auto">
                                <p>RP 9000</p>
                            </div>
                        </div>
                        <p className="font-normal text-xs text-white mt-6">
                            Mulai 8 Okt 2021 - 8 Nov 2021
                        </p>
                        <p className="font-light text-xs text-white mt-1">
                            <u>Syarat dan ketentuan</u> berlaku
                        </p>
                    </div>

                    <div className="w-80">
                        <button
                            type="button"
                            className="font-normal text-base text-white mt-8 w-full self-center items-center px-8 py-3 border border-transparent text-xs leading-4 font-light rounded-lg shadow-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: '#1d6eef' }}
                            onClick={handleBayar}
                        >
                            Lanjut Bayar
                        </button>
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className="absolute top-0 left-0 w-full min-h-screen lg:hidden" style={{ backgroundColor: '#f6f9ff' }}>
                <div className="flex flex-col min-h-screen relative">
                    <div className="w-full px-7 mt-24">
                        <p className="font-medium text-2xl flex justify-center">
                            Pembayaran
                        </p>
                    </div>


                    <div className="mx-4 flex justify-center mt-8 ">
                        <div className="w-96 bg-white shadow p-6 rounded-lg" style={{ background: 'linear-gradient(90deg, rgba(0,36,3,1) 0%, rgba(212,13,150,1) 0%, rgba(73,88,218,1) 100%)' }}>
                            <p className="font-normal text-base text-white">
                                Paket 30 Hari Gratis VOD
                            </p>
                            <p className="font-normal text-xs text-white mt-1">
                                testprojectrans@gmail.com
                            </p>
                            <div className="flex mt-5">
                                <div className="self-center">
                                    <p className="text-xs text-white">Total</p>
                                </div>
                                <div className="text-lg font-semibold text-white ml-auto">
                                    <p>RP 9000</p>
                                </div>
                            </div>
                            <p className="font-normal text-xs text-white mt-6">
                                Mulai 8 Okt 2021 - 8 Nov 2021
                            </p>
                            <p className="font-light text-xs text-white mt-1">
                                <u>Syarat dan ketentuan</u> berlaku
                            </p>
                        </div>
                    </div>

                    <div className="w-full bg-white shadow mt-8 px-4 py-7">
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

                    <div className="w-full bg-white shadow mt-2 px-4 py-7 rounded-lg">
                        <p className="font-medium text-base">
                            Metode Pembayaran
                        </p>
                        <div className="mt-6 gap-y-6 gap-x-4">
                            <div className="sm:col-span-3">
                                <RadioGroup value={selected} onChange={setSelected}>
                                    <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
                                    <div className="relative bg-white rounded-md -space-y-px">
                                        {plans.map((plan, planIdx) => (
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
                                            >
                                                {({ active, checked }) => (
                                                    <>
                                                        <div className="flex items-center text-sm">
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
                                                            <RadioGroup.Description
                                                                className={classNames(
                                                                    checked ? 'text-indigo-700' : 'text-gray-500',
                                                                    'mt-2 flex ml-auto text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"'
                                                                )}
                                                            >

                                                                {plan.name === 'Pulsa' ?
                                                                    <div className="grid grid-cols-2">
                                                                        <div>
                                                                            <img src={'../png/telkomsel.png'} width="66px" height="16px" className="self-center" />

                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <img src={'../png/smartfren.png'} width="56px" height="9px" className="self-center mt-1" />
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <img src={plan.logo} className="ml-auto" width={plan.width} height={plan.height} />
                                                                }
                                                            </RadioGroup.Description>
                                                        </div>

                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* {selected.name === 'Pulsa' &&
                                <>
                                    <div className="sm:col-span-3">
                                        <div className="mt-6">
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


                                    <div className="mt-4 col-span-3">
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
                            } */}
                        </div>
                    </div>
                    <div className="sticky bottom-0 mt-2 bg-white drop-shadow-3xl h-20 px-4 z-50">
                        <div className="my-5">
                            <button
                                type="button"
                                className="w-full self-center items-center px-8 py-3 border border-transparent text-xs leading-4 font-light rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={handleBayar}
                            >
                                Lanjut Bayar
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}