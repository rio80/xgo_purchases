import { useRouter } from "next/router"

export default function EmailNotificationPage() {
    const router = useRouter()

    return (
        <div className="ml-32 pt-36 w-96">
            <div>
                <p className="text-3xl font-bold">Email telah terkirim</p>
                <p className="mt-2.5 text-normal text-gray-400">Silakan periksa email Anda dan klik link yang <br /> diterima untuk mengatur ulang kata sandi </p>
                <div className="mt-7 flex cursor-pointer" onClick={() => router.push('/login')}>
                    <div className="flex flex-wrap content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#0285e4' }}>
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div style={{ color: '#0285e4' }}>
                        <p className="self-center ml-2 font-normal text-lg">Kembali ke Login</p>
                    </div>
                </div>
            </div>
        </div>
    )
}