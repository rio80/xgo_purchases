import * as React from 'react'
import { useRouter } from 'next/router'
import { requestResetPassword } from '../../utils/apiHandlers';
import Loader from 'react-loader-spinner';
import { useForm } from "react-hook-form";
import Alert from '../../pages/shared/alert/Alert';

export default function ForgetPasswordPage() {
    const [load, setLoad] = React.useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [error, setError] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const router = useRouter()
    const handleReset = async (handleSubmit) => {
        setLoad(true)
        try {
            const register = await requestResetPassword(handleSubmit)
            if (register.data.status) {
                router.push('/notification')
                setLoad(false);
            }else{
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
                    <p className="text-3xl font-bold">Lupa Password</p>
                    <p className="mt-2.5 text-normal text-gray-400">Masukkan email terdaftar Anda di bawah ini untuk menerima instruksi reset kata sandi</p>
                    <form onSubmit={handleSubmit(handleReset)}>
                        <div className="mt-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                            </div>
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-red-500 text-xs">
                                Mohon masukkan email anda dengan format yang benar
                            </p>
                        )}

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