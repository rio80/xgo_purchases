import { Tab, Switch } from "@headlessui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AlamatAction } from "../../../../store/Alamat/AlamatAction";
import { getCity, getDistrict, getProfil, getProvince, getSubDistrict, getZipCode, saveAddress } from "../../../../utils/apiHandlers";
import ComboBox from "../../../shared/ComboBox/ComboBox";
import CustomInput from "../../../shared/CustomInput/CustomInput";

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

export default function EditAlamat({ id, close }) {
    const alamatRedux = useSelector((state) => state.AlamatReducer.main_address)
    const dispatch = useDispatch()
    let [categories] = useState(['Rumah', 'Kantor', 'Lainnya'])
    const [category, setCategory] = useState('Rumah')
    const { watch, control, register, handleSubmit, reset, setValue } = useForm();
    const [data, setData] = useState([])
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [subDistrict, setSubDistrict] = useState([])
    const [city, setCity] = useState([])
    const [zipCode, setZipCode] = useState([])
    const [enabled, setEnabled] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const watchAllFields = watch();
    const name = watch("receiver_fullname")
    const hp = watch("receiver_phone_number")
    const alamat = watch("customer_address")
    const prov = watch("customer_province");
    const kab = watch("customer_city");
    const kec = watch("customer_district");
    const kel = watch("customer_subdistrict");
    const kodePos = watch("customer_zipcode");

    const handleCategory = (data) => {
        const dataCategory = categories[data]
        setCategory(dataCategory)
    }

    const getDataCity = async (data) => {
        try {
            const getData = await getCity(data)
            const transformCity = getData.data.result.map((data, idx) => ({
                id: data,
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
                id: data,
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
                id: data,
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

    const handlePost = async (handleSubmit) => {
        setLoading(true)
        if (!disabled) {
            let data = {
                ...handleSubmit,
                customer_address_id: id,
                main_address: enabled ? "1" : "0",
                address_category: category,
                email: getEmail()
            }
            try {
                const postData = await saveAddress(data)
                setLoading(false)
                close(false)
                dispatch({
                    type: AlamatAction.SET_MAIN,
                    main_address: !alamatRedux
                })
            } catch (e) {
                console.log(e)
                setLoading(false)
                close(false)
            }
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const getData = await getProvince()
                const transformProvince = getData.data.result.map((data, idx) => ({
                    id: data,
                    name: data,
                }))
                setProvince(transformProvince)
            } catch (e) {
                console.log(e)

            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const getDetail = await getProfil(getEmail())
                const dataAlamat = getDetail?.data?.result?.addresses
                const alamatId = dataAlamat.filter((item) => item.customer_address_id === id)
                setEnabled(alamatId?.[0]?.main_address === "0" ? false : true)
                setCategory(alamatId?.[0]?.address_category.includes['Rumah', 'Kantor', 'Lainnya'] ? alamatId?.[0]?.address_category : 'Rumah')
                setData(alamatId[0])
                reset({
                    receiver_fullname: alamatId?.[0]?.receiver_fullname,
                    receiver_phone_number: alamatId?.[0]?.receiver_phone_number,
                    customer_address: alamatId?.[0]?.customer_address,
                    customer_province: alamatId?.[0]?.customer_province,
                    customer_city: alamatId?.[0]?.customer_city,
                    customer_district: alamatId?.[0]?.customer_district,
                    customer_subdistrict: alamatId?.[0]?.customer_subdistrict,
                    customer_zipcode: alamatId?.[0]?.customer_zipcode
                })
            } catch (e) {
                console.log(e)
            }
        })()
    }, []);

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

        Object.keys(watchAllFields).map((key) => {
            const cek = watchAllFields[key]
            if (cek === '' || typeof cek === 'undefined') {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        });

    }, [name, hp, alamat, prov, kec, kab, kel, kodePos])

    const handleProv = (id) => {
        if (id !== prov) {
            setValue('customer_province', id, {})
            setValue('customer_city', '', {})
            setValue('customer_district', '', {})
            setValue('customer_subdistrict', '', {})
            setValue('customer_zipcode', '', {})
        }
    }

    const handleKec = (id) => {
        if (id !== kec) {
            setValue('customer_city', id, {})
            setValue('customer_district', '', {})
            setValue('customer_subdistrict', '', {})
            setValue('customer_zipcode', '', {})
        }
    }

    const handleKab = (id) => {
        if (id !== kab) {
            setValue('customer_district', id, {})
            setValue('customer_subdistrict', '', {})
            setValue('customer_zipcode', '', {})
        }
    }

    const handleKel = (id) => {
        if (id !== kel) {
            setValue('customer_subdistrict', id, {})
            setValue('customer_zipcode', '', {})
        }
    }

    const handleId = () => {
        // console.log(prov)
    }

    return (
        <>
            <p className='text-center font-nunito text-lg font-extrabold'>Ubah Alamat </p>
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
                    <ComboBox data={province} id={handleProv} variant='white' name="customer_province" placeholder="Provinsi" dataValue={'cek'} control={control} />
                    <div className="mt-8"></div>
                    <ComboBox data={city} id={handleKec} variant='white' name='customer_city' placeholder='Kota/Kabupaten' message={'Silahkan pilih provinsi terlebih dahulu'} dataValue={'cek'} control={control} />
                    <div className="mt-8"></div>
                    <ComboBox data={district} id={handleKab} variant='white' name='customer_district' placeholder='Kecamatan' message={'Silahkan pilih Kota/Kabupaten terlebih dahulu'} dataValue={'cek'} control={control} />
                    <div className="mt-8"></div>
                    <ComboBox data={subDistrict} id={handleKel} variant='white' name='customer_subdistrict' placeholder='Kelurahan' message={'Silahkan pilih Kecamatan terlebih dahulu'} dataValue={'cek'} control={control} />
                    <div className="mt-8"></div>
                    <ComboBox data={zipCode} id={handleId} variant='white' name='customer_zipcode' placeholder='Kode Pos' message={'Silahkan pilih Kelurahan terlebih dahulu'} dataValue={'cek'} control={control} />
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
        </>
    )
}