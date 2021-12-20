import { Fragment, useState, useEffect } from 'react'
import { Switch, Dialog, Transition } from '@headlessui/react'
import { Tab } from '@headlessui/react'
import CustomInput from '../../../shared/CustomInput/CustomInput'
import { useForm } from 'react-hook-form'
import ComboBox from '../../../shared/ComboBox/ComboBox'
import { getCity, getDistrict, getProvince, getSubDistrict, getZipCode, saveAddress } from '../../../../utils/apiHandlers'
import Cookies from 'js-cookie'

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

export default function AddAlamat({ id, close }) {
    let [categories] = useState(['Rumah', 'Kantor', 'Lainnya'])
    const { watch, control, register, handleSubmit } = useForm();
    const name = watch("receiver_fullname")
    const hp = watch("receiver_phone_number")
    const alamat = watch("customer_address")
    const prov = watch("customer_province");
    const kab = watch("customer_city");
    const kec = watch("customer_district");
    const kel = watch("customer_subdistrict");
    const kodePos = watch("customer_zipcode");
    const watchAllFields = watch();

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(true)
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [subDistrict, setSubDistrict] = useState([])
    const [city, setCity] = useState([])
    const [zipCode, setZipCode] = useState([])
    const [enabled, setEnabled] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [category, setCategory] = useState('Rumah')

    useEffect(() => {
        (async () => {
            try {
                const getData = await getProvince()
                const transformProvince = getData.data.result.map((data, idx) => ({
                    id: idx,
                    name: data,
                }))
                setProvince(transformProvince)
            } catch (e) {
                console.log(e)

            }
        })();
    }, []);

    const getDataCity = async (data) => {
        try {
            const getData = await getCity(data)
            const transformCity = getData.data.result.map((data, idx) => ({
                id: idx,
                name: data,
            }))
            setCity(transformCity)
        } catch (e) {
            console.log(e)

        }
    }

    const getDataDistrict = async (prov, kec) => {
        try {
            const getData = await getDistrict(prov, kec)
            const transformDistrict = getData.data.result.map((data, idx) => ({
                id: idx,
                name: data,
            }))
            setDistrict(transformDistrict)
        } catch (e) {
            console.log(e)

        }
    }

    const getDataSubDistrict = async (prov, kec, kab) => {
        try {
            const getData = await getSubDistrict(prov, kec, kab)
            const transformSubDistrict = getData.data.result.map((data, idx) => ({
                id: idx,
                name: data,
            }))
            setSubDistrict(transformSubDistrict)
        } catch (e) {
            console.log(e)

        }
    }

    const getDataZipCode = async (prov, kec, kab, kel) => {
        try {
            const getData = await getZipCode(prov, kec, kab, kel)
            const transformZipCode = getData.data.result.map((data, idx) => ({
                id: idx,
                name: data,
            }))
            setZipCode(transformZipCode)
        } catch (e) {
            console.log(e)

        }
    }

    const handleCategory = (data) => {
        const dataCategory = categories[data]
        setCategory(dataCategory)
    }

    useEffect(() => {
        if (prov !== '' && typeof prov !== 'undefined') {
            getDataCity(prov)
        }

        if (kab !== '' && typeof kab !== 'undefined') {
            getDataDistrict(prov, kab)
        }

        if (kec !== '' && typeof kec !== 'undefined') {
            getDataSubDistrict(prov, kab, kec)
        }

        if (kel !== '' && typeof kel !== 'undefined') {
            getDataZipCode(prov, kab, kec, kel)
        }

        let count = 0
        Object.keys(watchAllFields).map((key) => {
            const cek = watchAllFields[key]
            if (cek === '' || typeof cek === 'undefined') {
                count++
            }
        });

        if (count > 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }

    }, [name, hp, alamat, prov, kec, kab, kel, kodePos])

    const handlePost = async (handleSubmit) => {
        setLoading(true)
        if (!disabled) {
            let data = {
                ...handleSubmit,
                customer_address_id: 0,
                main_address: enabled ? "1" : "0",
                address_category: category,
                email: getEmail()
            }
            try {
                const postData = await saveAddress(data)
                setLoading(false)
                setOpen(false)
                close(false)

            } catch (e) {
                console.log(e)
                setLoading(false)
                setOpen(false)
                close(false)
            }
        }
    };

    const handleId = () => {
        //nothing
    }

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
                        <div className="inline-block align-bottom bg-white rounded-lg px-12 py-12 text-left overflow-auto shadow-xl transform transition-all w-full lg:w-2/5 rounded-lg sm:my-16 sm:align-middle">
                            <p className='text-center font-nunito text-lg font-extrabold'>Tambah Alamat Baru</p>
                            <div className="w-full mt-10">
                                <Tab.Group onChange={(index) => { handleCategory(index) }}>
                                    <Tab.List className="flex p-1.5 space-x-1 bg-white rounded-full" style={{ border: 'solid 2px #ebeef2' }}>
                                        {categories.map((category) => (
                                            <Tab
                                                key={category}
                                                className={({ selected }) =>
                                                    classNames(
                                                        'w-full py-3 text-sm leading-5 font-semibold text-gray-700 rounded-full',
                                                        selected
                                                            ? 'bg-gray-200 shadow'
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                    )
                                                }
                                            >
                                                {category}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </Tab.Group>
                            </div>
                            <div>
                                <form onSubmit={handleSubmit(handlePost)} autoComplete='off'>
                                    <CustomInput placeholder="Masukan Nama Anda" label="Nama" {...register("receiver_fullname")} />
                                    <CustomInput placeholder='Masukan Nomor Telepon Anda' type={'number'} label='Nomor Telepon' {...register("receiver_phone_number")} />
                                    <CustomInput placeholder='Masukan Alamat Anda' label='Alamat' {...register("customer_address")} />
                                    <div className="mt-8"></div>
                                    <ComboBox data={province} id={handleId} variant='white' name="customer_province" placeholder="Provinsi" control={control} />
                                    <div className="mt-8"></div>
                                    <ComboBox data={city} id={handleId} variant='white' name='customer_city' placeholder='Kota/Kabupaten' message={'Silahkan pilih provinsi terlebih dahulu'} control={control} />
                                    <div className="mt-8"></div>
                                    <ComboBox data={district} id={handleId} variant='white' name='customer_district' placeholder='Kecamatan' message={'Silahkan pilih Kota/Kabupaten terlebih dahulu'} control={control} />
                                    <div className="mt-8"></div>
                                    <ComboBox data={subDistrict} id={handleId} variant='white' name='customer_subdistrict' placeholder='Kelurahan' message={'Silahkan pilih Kecamatan terlebih dahulu'} control={control} />
                                    <div className="mt-8"></div>
                                    <ComboBox data={zipCode} id={handleId} variant='white' name='customer_zipcode' placeholder='Kode Pos' message={'Silahkan pilih Kelurahan terlebih dahulu'} control={control} />
                                    <div className="mt-8"></div>
                                    <div className='grid grid-cols-2'>
                                        <div>
                                            <p className='text-sm font-semibold'>Jadikan Alamat Utama</p>
                                        </div>
                                        <div className='flex'>
                                            <Switch
                                                checked={enabled}
                                                onChange={setEnabled}
                                                className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                                                    } relative inline-flex items-center h-6 rounded-full w-11 ml-auto`}
                                            >
                                                <span className="sr-only">Enable notifications</span>
                                                <span
                                                    className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                                                />
                                            </Switch>
                                        </div>
                                    </div>

                                    <button type="submit" className='w-full py-5 rounded-full mt-10' style={{ backgroundColor: disabled ? '#c9c9c9' : '#0285e4' }}>
                                        {loading ?
                                            <>
                                                <p className='text-white'>Processing...</p>
                                            </>
                                            :
                                            <p className='text-white'>Simpan</p>
                                        }
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
