import { Fragment, useState, useEffect } from 'react'
import { Menu, Dialog, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { getProfil } from '../../../../utils/apiHandlers';
import Cookies from 'js-cookie';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function getEmail() {
    const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
    const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
    const auth = Cookies.get('auth')
    const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);

    return decrypted
}

function Action() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Support
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default function ListAlamat({ close }) {
    const [open, setOpen] = useState(true)
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => (
        (async () => {
            try {
                const getDetail = await getProfil(getEmail())
                setData(getDetail?.data?.result?.addresses)
            } catch (e) {
                console.log(e)
            }
        })()
    ), [])

    const camelize = (str = '') => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    const results = !searchTerm
        ? data
        : data.filter(item =>
            item.receiver_fullname.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || item.customer_address.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto" onClose={() => { setOpen(false), close(false) }}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-top sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-12 py-12 text-left overflow-auto shadow-xl transform transition-all w-2/5 rounded-lg sm:my-16 sm:align-middle">

                            <div>
                                <div className="mx-auto flex items-center justify-center">
                                    <div className="relative flex items-stretch flex-grow ">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm leading-5">
                                            <img src={'../../png/search.png'} />
                                        </div>
                                        <input
                                            type="text"
                                            name="search"
                                            placeholder="Cari Alamat"
                                            className="py-2.5 pl-12 pr-7 block w-full font-semibold sm:text-sm rounded-lg"
                                            style={{ border: 'solid 1px #ccd2e3' }}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {results.map((data, idx) => (
                                    <div className="mt-10 text-center" key={idx}>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row'>
                                                <div className='my-auto'>
                                                    <img src={data?.main_address === '1' ? '../../../../png/iconmapsblue.png' : '../../../../png/iconmaps.png'} />
                                                </div>
                                                <div className='ml-2.5 my-auto'>
                                                    <p className='font-semibold text-sm' style={{ color: data?.main_address === '1' ? '#0285e4' : '#000000' }}>{data?.receiver_fullname}</p>
                                                </div>
                                                {data?.main_address === '1' &&
                                                    <div className='ml-5 my-auto'>
                                                        <div className='px-4 py-2 rounded-full' style={{ backgroundColor: 'rgba(2, 133, 228, 0.2)' }}>
                                                            <p className='font-semibold text-sm' style={{ color: '#0285e4' }}>Alamat Utama</p>
                                                        </div>
                                                    </div>
                                                }
                                                <div className='ml-auto my-auto'>
                                                    <Action />
                                                </div>
                                            </div>
                                            <div className='text-left mt-3 ml-8'>
                                                <p className='text-sm text-gray-500 font-semibold'>{camelize(data?.customer_address)}, {camelize(data?.customer_city)}, {camelize(data?.customer_province)}, {data?.customer_zipcode}</p>
                                            </div>
                                            <div className='text-left mt-4 ml-8 flex flex-row gap-x-4'>
                                                {data?.main_address === '0' &&
                                                    <div>
                                                        <button className='bg-gray-200 py-3.5  px-7 rounded-full'>
                                                            <p className='font-semibold'>Jadikan Alamat Utama</p>
                                                        </button>
                                                    </div>
                                                }
                                                <div>
                                                    <button className='bg-gray-200 py-3.5  px-7 rounded-full'>
                                                        <p className='font-semibold'>Ubah</p>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className='bg-gray-200 py-3.5 px-7 rounded-full'>
                                                        <p className='font-semibold'>Hapus</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
