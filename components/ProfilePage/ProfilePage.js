export default function ProfilePage() {
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
                            <p className="text-xl font-normal text-gray-500">beruangair@gmail.com</p>
                        </div>
                        <div className="pr-8">
                            <p className="text-xl font-normal text-gray-500">085717807865</p>
                        </div>
                        <div>
                            <div className="mt-8 w-full border-t border-gray-300" />
                        </div>
                        <div className="self-end">
                            <p className="text-4xl font-semibold text-gray-500">1</p>
                            <p className="text-xl font-light text-gray-500 mt-2">Paket Aktif</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                <div className="w-2/5">
                    <p className="font-light text-4xl text-left">Beruangair</p>
                    <div>
                        <div className="mt-12 w-full border-t border-gray-300" />
                    </div>
                    <div className="mt-12">
                        <p className="text-2xl text-gray-500">Paket 30 Hari VOD</p>
                    </div>
                    <div className="grid grid-cols-2 mb-24">
                        <div className="flex">
                            <p className="self-center text-2xl" style={{color:'#0285e4'}}>14</p>
                            <p className="ml-4 self-center text-gray-500 text-2xl">Hari Tersisa</p>
                        </div>
                        <div>
                            <div className="flex gap-x-4">
                                <div className="rounded-xl flex flex-col bg-white w-36 h-36" style={{boxShadow: '-7px 20px 100px 0 rgba(0, 0, 0, 0.1)'}}>
                                    <p className="my-4 text-center text-gray-500">Mulai</p>
                                    <div className="self-center text-center">
                                        <p className="text-4xl text-gray-500"> 25</p>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p className="text-gray-500"> April 2021</p>
                                    </div>
                                    
                                </div>
                                <div className="rounded-l-xl flex flex-col w-36 h-36" style={{backgroundColor:'#0285e4'}}>
                                    <p className="my-4 text-center text-white">Mulai</p>
                                    <div className="self-center text-center">
                                        <p className="text-4xl text-white"> 25</p>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p className="text-white"> Mei 2021</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}