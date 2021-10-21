import * as React from 'react';
export default function OtpPage() {
    return (
        <>
            <div className="absolute top-0 left-0 w-full min-h-screen pb-10" style={{ backgroundColor: '#f6f9ff' }}>
                <div className="w-80 mx-auto">
                    <div className="overflow-hidden mt-24">
                        <div className="w-full pt-8">
                            <img src={'../png/otp.png'} width="120px" height="120px" className="ml-32" />
                        </div>
                        <div className="px-4 mt-10 flex justify-center">
                            <p className="font-medium text-2xl">Verifikasi OTP </p> <br />
                        </div>
                        <div className="w-full mt-4">
                            <p className="text-sm text-gray-400 text-center">Masukkan 4 digit kode verifikasi yang baru saja kami kirim ke nomor Anda</p>
                        </div>
                        <div className="flex justify-center mt-6">
                            <p className="text-lg font-semibold text-blue-500">
                                081217807865
                            </p>
                            <img src={'../png/checklist-circle-blue.png'} width="18px" height="18px" className="ml-2 self-center" />
                        </div>
                        <div className="w-full">
                            <div className="py-3 text-center">
                                <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                                    <input className="m-2 h-12 w-12 text-center form-control rounded-full border-none drop-shadow-3xl" type="text" id="first" maxlength="1" />
                                    <input className="m-2 h-12 w-12 text-center form-control rounded-full border-none drop-shadow-3xl" type="text" id="second" maxlength="1" />
                                    <input className="m-2 h-12 w-12 text-center form-control rounded-full border-none drop-shadow-3xl" type="text" id="third" maxlength="1" />
                                    <input className="m-2 h-12 w-12 text-center form-control rounded-full border-none drop-shadow-3xl" type="text" id="fourth" maxlength="1" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 px-1">
                            <button
                                type="button"
                                className="w-full self-center items-center px-8 py-3 border border-transparent text-sm leading-4 font-normal rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Verifikasi
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}