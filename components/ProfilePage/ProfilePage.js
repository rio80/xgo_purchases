import Cookies from 'js-cookie';
import * as React from 'react'
import Loader from 'react-loader-spinner';
import { getActiveMinipack, getProfil } from '../../utils/apiHandlers';
import { format, intervalToDuration, subDays } from 'date-fns'

export default function ProfilePage() {
    const [profil, setProfil] = React.useState([])
    const [minipack, setMinipack] = React.useState([])
    const [loading, setLoading] = React.useState(false)


    React.useEffect(() => {
        (async () => {
            setLoading(true)
            const CryptoJS = require("crypto-js");
            const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
            const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
            const auth = Cookies.get('auth')
            const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);
            try {
                const getData = await getProfil(decrypted);
                const getDataMinipack = await getActiveMinipack(decrypted);
                setProfil(getData)
                setMinipack(getDataMinipack)
                setLoading(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                // setError(true)
            }
        })();
    }, []);

    const sisa = (start,end) => {
        const date1 = new Date(start);
        const date2 = new Date(end);
        const Difference_In_Time = date2.getTime() - date1.getTime();
        const Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
        return Difference_In_Days
    }

    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
                <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
            </div>
        )

    }

    return (
        <>
            <div className="mt-40 flex justify-center">
                <div className="w-2/5 flex">
                    <div className="flex flex-col">
                        <img src={'../png/avatar.png'} width="291px" height="392px" />
                    </div>
                    <div className="flex flex-col text-right ml-auto space-y-12">
                        <div className="pr-8">
                            <p className="text-2xl font-normal">Profil :</p>
                        </div>
                        <div className="pr-8">
                            <p className="text-xl font-normal text-gray-500">{profil?.data?.result?.email}</p>
                        </div>
                        <div className="pr-8">
                            <p className="text-xl font-normal text-gray-500">{profil?.data?.result?.phone_number}</p>
                        </div>
                        <div>
                            <div className="mt-8 w-full border-t border-gray-300" />
                        </div>
                        <div className="self-end">
                            <p className="text-4xl font-semibold text-gray-500">{minipack?.data?.result.length}</p>
                            <p className="text-xl font-light text-gray-500 mt-2">Paket Aktif</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                <div className="w-2/5">
                    <p className="font-light text-4xl text-left">{profil?.data?.result?.name}</p>
                    <div>
                        <div className="mt-12 w-full border-t border-gray-300" />
                    </div>
                    {minipack?.data?.result.map((data) => (
                        <>
                            <div className="mt-12">
                                <p className="text-2xl text-gray-500">Paket {data.duration} Bulan {data.product_name}</p>
                            </div>
                            <div className="grid grid-cols-2 mb-24">
                                <div className="flex">
                                    <p className="self-center text-2xl" style={{ color: '#0285e4' }}>{sisa(data?.start_date,data?.end_date)}</p>
                                    <p className="ml-4 self-center text-gray-500 text-2xl">Hari Tersisa</p>
                                </div>
                                <div>
                                    <div className="flex gap-x-4">
                                        <div className="rounded-xl flex flex-col bg-white w-36 h-36" style={{ boxShadow: '-7px 20px 100px 0 rgba(0, 0, 0, 0.1)' }}>
                                            <p className="my-4 text-center text-gray-500">Mulai</p>
                                            <div className="self-center text-center">
                                                <p className="text-4xl text-gray-500">{format(new Date(data?.start_date), 'dd')}</p>
                                            </div>
                                            <div className="mt-2 text-center">
                                                <p className="text-gray-500"> {format(new Date(data?.start_date), 'MMM yyy')}</p>
                                            </div>

                                        </div>
                                        <div className="rounded-l-xl flex flex-col w-36 h-36" style={{ backgroundColor: '#0285e4' }}>
                                            <p className="my-4 text-center text-white">Berakhir</p>
                                            <div className="self-center text-center">
                                                <p className="text-4xl text-white"> {format(new Date(data?.end_date), 'dd')}</p>
                                            </div>
                                            <div className="mt-2 text-center">
                                                <p className="text-white"> {format(new Date(data?.end_date), 'MMM yyy')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>

    )
}