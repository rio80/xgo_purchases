export default function AlamatPage() {
    return (
        <>
            <p className="font-nunito font-extrabold text-lg mt-12">Alamat</p>
            <div className="mt-3.5 relative flex items-stretch flex-grow">
                <button
                    type="button"
                    className="bg-gray-100 relative w-full border-none rounded-lg shadow-sm py-3 px-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        </>
    )
}
