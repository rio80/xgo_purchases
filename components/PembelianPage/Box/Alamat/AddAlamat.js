import { Fragment, useState, useEffect } from 'react'
import { Switch, Dialog, Transition } from '@headlessui/react'
import { Tab } from '@headlessui/react'
import CustomInput from '../../../shared/CustomInput/CustomInput'
import { useForm } from 'react-hook-form'
import css from '../../../shared/CustomInput/CustomInput.module.css'
import ComboBox from '../../../shared/ComboBox/ComboBox'
import { getProvince } from '../../../../utils/apiHandlers'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AddAlamat({ close }) {
    let [categories] = useState(['Rumah', 'Kantor', 'Lainnya'])

    const onSubmit = data => console.log(data);
    const { control, register, handleSubmit } = useForm();

    const [open, setOpen] = useState(true)
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [subDistrict, setsubDistrict] = useState([])
    const [city, setCity] = useState([])
    const [zipCode, setZipCode] = useState([])
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const getData = await getProvince()
                // console.log(getData)
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
                            <p className='text-center font-nunito text-lg font-extrabold'>Tambah Alamat Baru</p>
                            <div className="w-full mt-10">
                                <Tab.Group>
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
                                <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                                    <CustomInput placeholder="Masukan Nama Anda" label="Nama" {...register("Nama")} />
                                    <CustomInput placeholder='Masukan Nomor Telepon Anda' label='Nomor Telepon'  {...register("Telepon")} />
                                    <CustomInput placeholder='Masukan Alamat Anda' label='Alamat' {...register("Alamat")} />

                                    <div className='grid grid-cols-2 gap-x-4'>
                                        <div>
                                            <div>
                                                <div class={classNames("w-full", css.materialTextfield)}>
                                                    <input className={classNames("focus:outline-none", css.materialInput)} placeholder="Masukan RT Anda" type="text" name="RT"  {...register("RT")} />
                                                    <label className={classNames("font-semibold text-gray-900", css.materialLabel)}> RT </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div class={classNames("w-full", css.materialTextfield)}>
                                                    <input className={classNames("focus:outline-none", css.materialInput)} placeholder="Masukan RW Anda" type="text" name="RT"  {...register("RW")} />
                                                    <label className={classNames("font-semibold text-gray-900", css.materialLabel)}> RW </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8"></div>
                                    <ComboBox data={province} variant='white' name="Provinsi" placeholder="Provinsi" control={control} />
                                    <div className="mt-8"></div>
                                    <ComboBox data={city} placeholder='Kota/Kabupaten' message={'Silahkan pilih provinsi terlebih dahulu'} variant='white'  />
                                    <div className="mt-8"></div>
                                    <ComboBox data={district} placeholder='Kecamatan' variant='white' message={'Silahkan pilih Kota/Kabupaten terlebih dahulu'} />
                                    <div className="mt-8"></div>
                                    <ComboBox data={subDistrict} placeholder='Kelurahan' variant='white' message={'Silahkan pilih Kecamatan terlebih dahulu'} />
                                    <div className="mt-8"></div>
                                    <ComboBox data={zipCode} placeholder='Kode Pos' variant='white' message={'Silahkan pilih Kelurahan terlebih dahulu'} />
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
                                    <button type="submit" className='w-full py-5 rounded-full mt-10' style={{ backgroundColor: '#0285e4' }}>
                                        <p className='text-white'>Simpan</p>
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
