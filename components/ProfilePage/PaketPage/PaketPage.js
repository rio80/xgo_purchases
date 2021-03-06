import { format } from 'date-fns'

function Sisa({ end = '' }) {
    const date1 = new Date();
    const date2 = new Date(end);
    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

    return Difference_In_Days
}

export default function PaketPage({ minipack }) {


    return (
        <>
            {minipack?.data?.result.map((data,idx) => (
                <>
                    <div className="mt-12 w-60" key={idx}>
                        <p className="text-lg lg:text-xl text-gray-500">Paket {data.title}</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="flex">
                            <p className="self-center text-xl lg:text-2xl" style={{ color: '#0285e4' }}><Sisa end={data?.end_date.split(" ").join("T")} /></p>
                            <p className="ml-4 self-center text-gray-500 text-xl lg:text-2xl">Hari Tersisa</p>
                        </div>
                        <div>
                            <div className="flex gap-x-4">
                                <div className="rounded-xl flex flex-col bg-white w-36 h-36" style={{ boxShadow: '-7px 20px 100px 0 rgba(0, 0, 0, 0.1)' }}>
                                    <p className="my-4 text-center text-gray-500">Mulai</p>
                                    <div className="self-center text-center">
                                        <p className="text-3xl lg:text-4xl text-gray-500">{format(new Date(data?.start_date.split(" ").join("T")), 'dd')}</p>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p className="text-gray-500"> {format(new Date(data?.start_date.split(" ").join("T")), 'MMM yyy')}</p>
                                    </div>

                                </div>
                                <div className="rounded-l-xl flex flex-col w-36 h-36" style={{ backgroundColor: '#0285e4' }}>
                                    <p className="my-4 text-center text-white">Berakhir</p>
                                    <div className="self-center text-center">
                                        <p className="text-3xl lg:text-4xl text-white"> {format(new Date(data?.end_date.split(" ").join("T")), 'dd')}</p>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p className="text-white"> {format(new Date(data?.end_date.split(" ").join("T")), 'MMM yyy')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </>
    )
}