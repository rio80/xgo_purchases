import { EyeIcon } from '@heroicons/react/solid'
import * as React from 'react'

export default function ComboBox({ search = true, placeholder = 'Silahkan Pilih' }) {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        console.log(open)
        setOpen(!open)
    }
    return (
        <div>
            <div className="mt-3.5 relative flex items-stretch flex-grow ">
                <button
                    type="button"
                    className="bg-gray-100 relative w-full border-none rounded-lg shadow-sm py-3 px-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ariaHaspopup="listbox"
                    ariaExpanded="true"
                    ariaLabelledby="listbox-label"
                    onClick={handleOpen}
                >
                    <span class="block truncate font-semibold">
                        {placeholder}
                    </span>
                </button>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <img src={'../../png/right.png'}
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        aria-hidden="true"
                    />
                </div>
            </div>
            {
                open ? (
                    <div class="relative rounded-md  mt-2">
                        <div className="w-full shadow-lg rounded-md absolute z-10 " style={{ backgroundColor: '#ebeef2' }}>
                            {search ?
                                <div className="mt-3.5 py-4 relative flex items-stretch flex-grow ">
                                    <div className="absolute inset-y-0 left-0 pl-8 flex items-center text-sm leading-5">
                                        <img src={'../../png/search.png'} />
                                    </div>
                                    <input
                                        type="text"
                                        name="password"
                                        placeholder="Cari"
                                        className="mx-4 py-2.5 pl-12 pr-7 block w-full font-semibold sm:text-sm border-none rounded-lg"
                                    />
                                </div> : ''}
                            <ul class="w-full max-h-60 py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                                <li className="text-gray-900 cursor-default select-none relative py-2.5 px-4 pr-9 hover:bg-gray-100" id="listbox-option-0" role="option">
                                    <span class="font-semibold block">
                                        Wade Cooper
                                    </span>
                                </li>
                                <li className="text-gray-900 cursor-default select-none relative py-2.5 px-4 pr-9 hover:bg-gray-100" id="listbox-option-0" role="option">
                                    <span className="font-semibold block">
                                        Wade Cooper
                                    </span>
                                </li>
                            </ul>
                        </div>

                    </div>
                ) : ('')
            }
        </div >
    )
}