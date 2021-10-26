import { Disclosure } from "@headlessui/react"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HeaderHome() {
    const home = [
        { name: 'Home', href: '#', current: true },
        { name: 'Product', href: '#', current: false } 
    ]

    return (
        <Disclosure as="nav" className="bg-white z-10 fixed top-0 left-0 right-0 py-8 z-20">
            <div className="mx-auto px-28" style={{maxWidth: '1024px'}}>
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center hidden lg:flex">
                            <img
                                className="h-4 w-40"
                                src={`../png/transvision.png`}
                                alt="TRANSVISION"
                            />
                        </div>
                    </div>

                    <nav className="flex" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            {home.map((page, index) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <a
                                            href={page.href}
                                            className="text-gray-600 hover:text-gray-600 mr-4 text-sm font-base"
                                            aria-current={page.current ? 'page' : undefined}
                                        >
                                            {page.name}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center hidden lg:flex">
                            <button
                                type="button"
                                className="w-full self-center items-center px-9 py-3 border border-transparent text-sm leading-4 font-normal rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                style={{ backgroundColor: '#0285e4', boxShadow: '0 4px 31px 0 rgba(0, 0, 0, 0.15)' }}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}