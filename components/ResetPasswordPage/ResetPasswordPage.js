import * as React from 'react'
import { useRouter } from 'next/router'
import { requestResetPassword, resetPassword } from '../../utils/apiHandlers';
import Loader from 'react-loader-spinner';
import { useForm } from "react-hook-form";
import Alert from '../../pages/shared/alert/Alert';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

export default function ResetPasswordPage(props) {
    console.log()
    const [load, setLoad] = React.useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [error, setError] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [Password, setPassword] = React.useState(false);
    const router = useRouter()
    const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
    const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');

    const handleReset = async (handleSubmit) => {
        setLoad(true)
        const encrypted = CryptoJS.AES.encrypt(handleSubmit.password, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString();
        let newState = { ...handleSubmit }
        newState.email = props.data.email
        newState.reset_password_token = props.data.token
        newState.password = encrypted

        // console.log(newState)

        try {
            const post = await resetPassword(newState)
            if (post.data.status) {
                router.push('/login')
                setLoad(false);
            } else {
                setError(true)
            }
        } catch (e) {
            setError(true)
            setMessage(e?.res?.data?.message?.[0])
            setLoad(false);
        }
    };

    const closeModal = (data) => {
        setOpen(data);
    };

    return (
        <>
            {error && <Alert type={0} title={'Reset Password Gagal'} message={message} close={closeModal} />}
            {load &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                    <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
                </div>
            }
            <div className="ml-32 pt-36 w-96">
                <div>
                    <p className="text-3xl font-bold">Reset Password</p>
                    <p className="mt-2.5 text-normal text-gray-400">Silahkan masukan password baru Anda</p>
                    <form onSubmit={handleSubmit(handleReset)}>
                        <div className="mt-5">
                            <div>
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
                        </div>

                        <div className="mt-10">
                            <button
                                type="submit"
                                className="w-full self-center items-center px-8 py-5 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                style={{ backgroundColor: '#0285e4' }}
                            >
                                Kirim
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}