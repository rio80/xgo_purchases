export default function VerificationPage() {
    return (
        <>
            <div className="absolute top-0 left-0 w-full min-h-screen pb-10" style={{ backgroundColor: '#f6f9ff' }}>
                <div className="w-80 mx-auto">
                    <div className="overflow-hidden mt-24">
                        <div className="px-4 pt-5">
                            <p className="font-medium text-2xl text-center">QR  Code </p> <br />
                        </div>
                        <div className="w-full flex justify-center">
                            <img src={'../png/qrcode.png'} width="283px" height="283px" />
                        </div>
                        <button
                            type="button"
                            className="w-full justify-center flex self-center items-center px-8 py-3 border border-transparent text-xs leading-4 font-light rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Simpan QR Code
                        </button>
                        <div className="flex justify-center">

                            <p className="mt-14 text-lg font-base">
                                Powered by
                            </p>
                            <img src={'../png/qris.png'} width="106px" height="18px" className="ml-2 mt-auto mb-1" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}