import * as React from 'react'
import css from './HomePage.module.css'
import Alert from "../../../pages/shared/alert/Alert";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { Dialog, Popover, Transition } from '@headlessui/react'
import { activationBox } from '../../../utils/apiHandlers';
import { useDispatch } from 'react-redux';
import { AktivasiAction } from '../../../store/Aktivasi/AktivasiAction';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ActivationSection() {
    const dispatch = useDispatch()
    const { handleSubmit, register, reset, watch } = useForm();
    const watchAllFields = watch();
    const auth = Cookies.get('auth')
    const [err, setErr] = React.useState('')
    const [tnc, setTnc] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [login, setLogin] = React.useState(false)
    const [modalTnc, setModalTnc] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [aktivasi, setAktivasi] = React.useState(false)

    const getEmail = () => {
        const CryptoJS = require("crypto-js");
        const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
        const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
        const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);

        return decrypted
    }

    const Tooltip = () => {
        return (
            <div className=" px-1">
                <Popover className="relative">
                    {() => (
                        <>
                            <Popover.Button>
                                <button
                                    type={disabled ? "button" : "submit"}
                                    className={classNames(login && !disabled ? `${css.btn} bg-gray-50` : "text-gray-600 bg-gray-400", "w-40 w-full self-center items-center px-8 py-5 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm")}
                                >
                                    Aktivasi
                                </button>
                            </Popover.Button>
                            <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute z-10 w-60 px-4 mt-1 transform -translate-x-10">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="relative gap-8 bg-white p-2">
                                            <div className="">
                                                <p className="text-center text-xs font-base text-gray-900">
                                                    Silahkan lengkapi data lalu ikuti syarat & ketentuan
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        )
    }

    const closeModal = (data) => {
        setOpen(data);
    };

    const handleModalTnc = () => {
        setModalTnc(!modalTnc)
    }

    const expand = () => {
        setAktivasi(!aktivasi)
    }

    const handlePost = async (handleSubmit) => {
        try {
            if (!disabled) {
                let submit = {
                    email: handleSubmit.email,
                    voucher_code: handleSubmit.voucher_code,
                    box_pw: Buffer.from(handleSubmit?.box_pw).toString('base64')
                }

                const postData = await activationBox(handleSubmit)
                if (postData) { 
                    dispatch({
                        type: AktivasiAction.SET_AKTIVASI,
                        aktivasi: true
                    })
                }
            }
        } catch (e) {
            // setOpen(true)
            // setErr(e?.res?.data?.message?.[0])
        }
    };

    React.useEffect(() => {
        if (typeof auth !== 'undefined') {
            setLogin(true)
            reset({
                email: getEmail()
            })
        }
    }, [])

    React.useEffect(() => {
        let count = 0
        Object.keys(watchAllFields).map((key) => {
            const cek = watchAllFields[key]
            if (cek === '' || typeof cek === 'undefined') {
                count++
            }
        });

        if (count > 0 || !tnc) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [watchAllFields])

    return (
        <>
            {open && <Alert type={0} title={'Aktivasi Gagal'} message={err} close={closeModal} />}

            <Transition.Root show={modalTnc} as={React.Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setModalTnc}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className='max-h-96 overflow-auto'>
                                    <div className="mt-3 text-left sm:mt-5">
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-2 flex">
                                    <div className="flex items-center h-5 mt-6">
                                        <input
                                            id="comments"
                                            aria-describedby="comments-description"
                                            name="comments"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            onClick={() => setTnc(!tnc)}
                                            checked={tnc}
                                        />
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="comments" className="font-small text-xs text-gray-700">
                                                Saya menyetujui Syarat dan Ketentuan
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
                                        onClick={() => setModalTnc(false)}
                                    >
                                        Kembali
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="flex justify-center" style={{ backgroundColor: '#0285e4' }}>
                <div className={classNames(aktivasi ? css.open : css.close, css.activation, "w-full py-20 gap-x-6 px-14 lg:px-56")}>
                    <div className="flex justify-center">
                        <p className="font-nunito text-center text-white font-bold text-4xl px-4 lg:px-0">Aktivasi Xstream Box Anda</p>
                    </div>
                    <div className="flex mt-16">
                        <div className="flex flex-col w-64 pt-7 mx-auto px-20 gap-y-2 cursor-pointer" onClick={expand}>
                            <div className="flex justify-center">
                                <p className="text-white text-lg">Klik Disini</p>
                            </div>
                            <div className="flex justify-center">
                                <img src={'../../../png/gif/scrolldown.gif'} className={classNames(aktivasi ? "transform -rotate-180 transition duration-300" : "transform rotate-0 transition duration-300", "h-12 w-12")} />
                            </div>
                        </div>
                    </div>
                    {aktivasi ?
                        <form onSubmit={handleSubmit(handlePost)}>
                            <div className="flex justify-center mt-14 flex-col">
                                <div className="w-full lg:w-2/4 relative flex mx-auto mb-8">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center text-sm leading-5">
                                        <img src={'../../../svg/email.svg'} />
                                    </div>
                                    <div className="absolute inset-y-4 pl-16 flex items-center text-sm leading-5 border-r-2 " style={{ borderRight: '1px solid rgba(255, 255, 255, 0.37)' }}></div>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email Anda"
                                        className={classNames(css.input, "py-4 pl-20 block w-full mx-auto text-white placeholder-white sm:text-sm border-gray-300 rounded-md")}
                                        {...register("email", { required: true })}
                                        disabled
                                    />
                                </div>
                                <div className="w-full lg:w-2/4 relative flex mx-auto mb-8">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center text-sm leading-5">
                                        <img src={'../../../svg/password.svg'} />
                                    </div>
                                    <div className="absolute inset-y-4 pl-16 flex items-center text-sm leading-5 border-r-2 " style={{ borderRight: '1px solid rgba(255, 255, 255, 0.37)' }}></div>
                                    <input
                                        type="password"
                                        name="box_pw"
                                        placeholder="Password"
                                        className={classNames(css.input, "py-4 pl-20 block w-full mx-auto text-white placeholder-white sm:text-sm border-gray-300 rounded-md")}
                                        {...register("box_pw", { required: true })}
                                        disabled={!login}
                                    />
                                </div>
                                <div className="w-full lg:w-2/4 relative flex mx-auto">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center text-sm leading-5">
                                        <img src={'../../../svg/voucher.svg'} />
                                    </div>
                                    <div className="absolute inset-y-4 pl-16 flex items-center text-sm leading-5 border-r-2 " style={{ borderRight: '1px solid rgba(255, 255, 255, 0.37)' }}></div>
                                    <input
                                        type="text"
                                        name="voucher_code"
                                        placeholder="Voucher Xstream"
                                        className={classNames(css.input, "py-4 pl-20 block w-full mx-auto text-white placeholder-white sm:text-sm border-gray-300 rounded-md")}
                                        {...register("voucher_code", { required: true })}
                                        disabled={!login}
                                    />
                                </div>
                                <div className="mt-8 flex justify-center">
                                    {disabled ? <Tooltip /> :
                                        <button
                                            type={disabled ? "button" : "submit"}
                                            className={classNames(`${css.btn} bg-gray-50 w-40 w-full self-center items-center px-8 py-5 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm`)}
                                        >
                                            Aktivasi
                                        </button>
                                    }
                                </div>
                                <div className="ml-3 text-sm flex justify-center mt-8">
                                    {login ?
                                        <label htmlFor="comments" className="font-small text-xs" style={{ color: 'rgba(255, 255, 255, 0.6' }}>
                                            Dengan aktivasi berarti Anda menyetujui <label className="text-white cursor-pointer" onClick={handleModalTnc}>syarat dan ketentuan</label> yang berlaku
                                        </label>
                                        :
                                        <label htmlFor="comments" className="font-small text-xs" style={{ color: 'rgba(255, 255, 255, 0.6' }}>
                                            Anda harus login terlebih dahulu untuk aktivasi
                                        </label>
                                    }
                                </div>
                            </div>
                        </form>
                        : ''}
                    <div className="flex mt-20">
                        <div className="mx-auto flex flex-row">
                            <div className="flex justify-center gap-x-4">
                                <div className="flex justify-center">
                                    <img src={'../../../png/check-circle.png'} className="self-center" style={{ width: '19px', height: '18px' }} />
                                </div>
                                <p className="text-white text-base font-semibold">Cepat</p>
                            </div>
                            <div className="flex justify-center gap-x-4 ml-20">
                                <div className="flex justify-center">
                                    <img src={'../../../png/check-circle.png'} className="self-center" style={{ width: '19px', height: '18px' }} />
                                </div>
                                <p className="text-white text-base font-semibold">Mudah</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}