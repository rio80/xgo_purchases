import * as React from 'react'
import AddAlamat from './AddAlamat'
import ShowAlamat from './ShowAlamat'

export default function AlamatPage({ data = '', list = false }) {
    const [openList, setOpenList] = React.useState(false)
    const [openAdd, setOpenAdd] = React.useState(false)

    const handleList = () => {
        setOpenList(!openList)
    }

    const closeList = (data) => {
        setOpenList(data)
    }

    const handleAdd = () => {
        setOpenAdd(!openAdd)
    }

    const closeAdd = (data) => {
        setOpenAdd(data)
    }

    return (
        <>
            <p className="font-nunito font-extrabold text-lg mt-12">Alamat</p>
            {data ? (
                <>
                    <div className="mt-3.5 flex flex-row">
                        <div className="row-span-2 w-8">
                            <img src={'../../../../png/iconmaps.png'} />
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <p className="font-semibold text-sm"> {data?.receiver_fullname}</p>
                            </div>
                            <div className="mt-2">
                                <p className="text-gray-500"> {data?.customer_address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-row gap-x-5">
                        <div className="relative flex items-stretch flex-grow cursor-pointer" onClick={handleAdd}>
                            <button
                                type="button"
                                className="bg-gray-100 relative w-full border-none rounded-lg shadow-sm py-3 px-4 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ariaHaspopup="listbox"
                                ariaExpanded="true"
                                ariaLabelledby="listbox-label"
                            >
                                <span class="block truncate font-semibold">
                                    Tambah Alamat
                                </span>
                            </button>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative flex items-stretch flex-grow cursor-pointer" onClick={handleList}>
                            <button
                                type="button"
                                className="bg-gray-100 relative w-full border-none rounded-lg shadow-sm py-3 px-4 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <span class="block truncate font-semibold">
                                    Daftar Alamat
                                </span>
                            </button>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <img src={'../../../../png/iconmaps2.png'} className="text-gray-500" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="mt-6 flex flex-row gap-x-5">
                    <div className="mt-3.5 relative flex items-stretch flex-grow cursor-pointer" onClick={handleAdd}>
                        <button
                            type="button"
                            className="bg-gray-100 relative w-full border-none rounded-lg shadow-sm py-3 px-4 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ariaHaspopup="listbox"
                            ariaExpanded="true"
                            ariaLabelledby="listbox-label"
                        >
                            <span class="block truncate font-semibold">
                                Tambah Alamat
                            </span>
                        </button>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    {list && <div className="mt-3.5 relative flex items-stretch flex-grow cursor-pointer" onClick={handleList}>
                        <button
                            type="button"
                            className="bg-gray-100 relative w-full border-none rounded-lg shadow-sm py-3 px-4 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <span class="block truncate font-semibold">
                                Daftar Alamat
                            </span>
                        </button>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <img src={'../../../../png/iconmaps2.png'} className="text-gray-500" />
                        </div>
                    </div>}
                </div>


            )}
            {openList && <ShowAlamat close={closeList} />}
            {openAdd && <AddAlamat close={closeAdd} />}
        </>
    )
}
