import Cookies from "js-cookie";
import { Menu, Dialog, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, getProfil, saveAddress } from "../../../../utils/apiHandlers";
import { AlamatAction } from '../../../../store/Alamat/AlamatAction'

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

export default function ListAlamat({ edit, close }) {
    const dispatch = useDispatch()
    const alamatRedux = useSelector((state) => state.AlamatReducer.main_address)
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([])
    const [loadingUtama, setLoadingUtama] = useState(false)

    const camelize = (str = '') => {
        if (str !== null) {
            return str.replace(
                /\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
    }

    const results = !searchTerm ? data : data.filter(item =>
        item.receiver_fullname.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || item.customer_address.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (data) => {
        let dataDel = { email: getEmail(), customer_address_id: [data] }
        try {
            const delData = await deleteAddress(dataDel)
            if (delData) {
                (async () => {
                    try {
                        const getDetail = await getProfil(getEmail())
                        setData(getDetail?.data?.result?.addresses)
                        dispatch({
                            type: AlamatAction.SET_MAIN,
                            main_address: !alamatRedux
                        })
                    } catch (e) {
                        console.log(e)
                    }
                })()
            }

        } catch (e) {
            console.log(e)
        }
    }

    const handleDefault = async (dataId) => {
        setLoadingUtama(true)
        const alamatId = data.filter((item) => item.customer_address_id === dataId)
        let dataAlamat = {
            receiver_fullname: alamatId?.[0]?.receiver_fullname,
            receiver_phone_number: alamatId?.[0]?.receiver_phone_number,
            customer_address: alamatId?.[0]?.customer_address,
            customer_province: alamatId?.[0]?.customer_province,
            customer_city: alamatId?.[0]?.customer_city,
            customer_district: alamatId?.[0]?.customer_district,
            customer_subdistrict: alamatId?.[0]?.customer_subdistrict,
            customer_zipcode: alamatId?.[0]?.customer_zipcode,
            address_category: alamatId?.[0]?.address_category,
            customer_address_id: dataId,
            main_address: "1",
            email: getEmail()
        }
        try {
            const postData = await saveAddress(dataAlamat)
            if (postData) {
                (async () => {
                    try {
                        const getDetail = await getProfil(getEmail())
                        setData(getDetail?.data?.result?.addresses)
                        setLoadingUtama(false)
                    } catch (e) {
                        setLoadingUtama(false)
                        console.log(e)
                    }
                })()
            }

        } catch (e) {
            setLoadingUtama(false)
            console.log(e)
        }
    }

    const handleKirim = (id, nama, alamat, hp) => {
        dispatch({
            type: AlamatAction.SET_ALAMAT,
            receiver_fullname: nama,
            customer_address: alamat,
            customer_address_id: id,
            customer_name: nama,
            customer_mobilephone: hp
        });
        close(false)
    }

    function Action({data}) {
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
                                        onClick={() => edit(data)}
                                    >
                                        Ubah
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
                                        onClick={() => handleDelete(data)}
                                    >
                                        Hapus
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        )
    }

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

    return (
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
                                <Action data={data?.customer_address_id} />
                            </div>

                        </div>
                        <div className='text-left mt-3 ml-8'>
                            <p className='text-sm text-gray-500 font-semibold'>{camelize(data?.customer_address)}, {camelize(data?.customer_city)}, {camelize(data?.customer_province)}, {data?.customer_zipcode}</p>
                        </div>
                        <div className='text-left mt-4 ml-8 flex flex-col lg:flex-row gap-x-4'>
                            <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4">
                                <div>
                                    <button className='bg-gray-200 py-3.5 px-6 rounded-full' onClick={() => handleKirim(data?.customer_address_id, data?.receiver_fullname, data?.customer_address, data?.receiver_phone_number)}>
                                        <p className='font-semibold'>Jadikan Alamat Pengiriman</p>
                                    </button>
                                </div>
                                {data?.main_address === '0' &&
                                    <div>
                                        <button className='bg-gray-200 py-3.5 px-6 rounded-full' onClick={() => handleDefault(data?.customer_address_id)}>
                                            {loadingUtama ?
                                                <>
                                                    <p className='font-semibold'>Processing...</p>
                                                </>
                                                :
                                                <p className='font-semibold'>Jadikan Alamat Utama</p>
                                            }
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>


                    </div>
                </div>
            ))}
        </div>
    )
}