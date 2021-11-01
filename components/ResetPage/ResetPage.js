import * as React from 'react'
import { useRouter } from 'next/router'

export default function ResetPage() {
    const router = useRouter()

    return (
        <div className="ml-32 pt-36 w-96">
            <div>
                <p className="text-3xl font-bold">Lupa Password</p>
                <p className="mt-2.5 text-normal text-gray-400">Masukkan email terdaftar Anda di bawah ini untuk menerima instruksi reset kata sandi</p>
                <div className="mt-5">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-3.5">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                placeholder="Email Anda"
                                className="py-4 px-7 w-full text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        type="button"
                        className="w-full self-center items-center px-8 py-5 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        style={{ backgroundColor: '#0285e4' }}
                        onClick={()=>router.push('/notification')}
                    >
                        Kirim
                    </button>
                </div>
            </div>
        </div>
    )
}