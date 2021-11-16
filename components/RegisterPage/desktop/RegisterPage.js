import * as React from 'react'
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { postRegister } from '../../../utils/apiHandlers';
import Cookies from 'js-cookie';
import Alert from '../../../pages/shared/alert/Alert';
import Loader from 'react-loader-spinner';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RegisterPage() {
    const router = useRouter()
    const [Password, setPassword] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
    const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [phone, setPhone] = React.useState('')

    const handleRegister = async (handleSubmit) => {
        setLoad(true)
        const newState = { ...handleSubmit }
        const name = handleSubmit.email.split('@')[0]
        const encrypted = CryptoJS.AES.encrypt(handleSubmit.password, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString();
        newState.password = encrypted
        newState.phone_number = phone
        newState.name = name

        try {
            const register = await postRegister(newState)
            if (register.data.status) {
                setLoad(false);
                setSuccess(true)
                setMessage('Kami telah mengirimkan email verifikasi ke : '+handleSubmit.email+'. Klik tautan untuk menyelesaikan pendaftaran')
            }
        } catch (e) {
            setError(true)
            setMessage(e?.res?.data?.message?.[0])
            setLoad(false);
        }
    };

    const closeModal = (data) => {
        setOpen(data);
        setError(data);
    };

    const handlePhone = (e) => {
        e.target.validity.valid && setPhone(e.target.value)
    }

    return (
        <>
            {error && <Alert type={0} title={'Registrasi Gagal'} message={message} close={closeModal} />}
            {success && <Alert type={1} title={'Harap verifikasi email Anda'} link={'/'} message={message} close={closeModal} />}
            {load &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                    <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
                </div>
            }
            <div className="ml-32 pt-36 w-96">
                <div>
                    <p className="text-3xl font-bold">Daftar</p>
                    <p className="mt-2.5 text-normal text-gray-400">Buat akun Anda agar dapat menikmati semua <br /> konten hiburan dari Transvision</p>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="mt-5">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-3.5">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Email Anda"
                                        {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                                        className="py-4 px-7 w-full text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-full"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-red-500 text-xs">
                                        Mohon masukkan email anda dengan format yang benar
                                    </p>
                                )}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Nomor Telepon
                                </label>
                                <div className="mt-3.5">
                                    <input
                                        type="text"
                                        pattern="[0-9]*"
                                        name="phone"
                                        id="phone"
                                        placeholder="Nomor Telepon Anda"
                                        onInput={handlePhone}
                                        value={phone}
                                        {...register("phone_number", { required: true })}
                                        className="py-4 px-7 w-full text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-full"
                                    />
                                </div>
                                {errors.phone_number && (
                                    <p className="mt-1 text-red-500 text-xs">
                                        Mohon masukkan nomor telepon anda
                                    </p>
                                )}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-3.5 relative flex items-stretch flex-grow ">
                                    <input
                                        type={Password ? "text" : "password"}
                                        name="password"
                                        placeholder="Password Anda"
                                        {...register("password", { required: true, minLength: 8 })}
                                        className="py-4 px-7 block w-full sm:text-sm border-gray-300 rounded-full"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                        {Password ? (
                                            <EyeIcon
                                                className="h-5 w-5 text-gray-400 cursor-pointer"
                                                aria-hidden="true"
                                                onClick={() => setPassword(false)}
                                            />
                                        ) : (
                                            <EyeOffIcon
                                                className="h-5 w-5 text-gray-400 cursor-pointer"
                                                aria-hidden="true"
                                                onClick={() => setPassword(true)}
                                            />
                                        )}
                                    </div>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-red-500 text-xs">
                                        Password harus berisi minimal 8 karakter
                                    </p>
                                )}
                            </div>

                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="w-full self-center items-center px-8 py-5 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    style={{ backgroundColor: '#0285e4' }}
                                >
                                    Daftar
                                </button>
                            </div>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-white text-xs text-gray-500">atau</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    className="w-full text-gray-800 bg-white text-gray-800 px-10 py-5 font-semibold text-white items-center space-x-2 rounded-full"
                                    style={{ boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.08)' }}
                                >
                                    <div className="flex">
                                        <img src={'../png/google.png'} className="mr-14" width="24px" height="24px" />
                                        <span>Masuk dengan Google</span>
                                    </div>
                                </button>
                            </div>

                            <div className="mt-4 px-16 text-center">
                                <label className="font-small text-xs text-gray-500">
                                    Dengan mendaftar Anda berarti menyetujui <a href="#" className="text-blue-600">syarat dan ketentuan</a> yang berlaku.
                                </label>

                            </div>
                        </div>
                    </form>
                    <div className="mt-14 mb-28 flex justify-center">
                        <label htmlFor="comments" className="font-small text-base text-gray-700">
                            Sudah punya akun? <a href={'/login'} className="text-blue-600">Masuk</a>
                        </label>

                    </div>
                </div>
            </div>
        </>
    )
}