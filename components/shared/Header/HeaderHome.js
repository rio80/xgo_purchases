import { Fragment } from 'react'
import Cookies from "js-cookie";
import { useRouter } from "next/router"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Router from 'next/router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HeaderHome() {
    const router = useRouter();
    const auth = Cookies.get('auth')

    const home = [
        { name: 'Home', href: '#', current: true },
        { name: 'Product', href: '#', current: false }
    ]

    const logout = () => {
        Cookies.remove('auth')
        router.push('/')
    }

    return (
        <Disclosure as="nav" className="bg-white fixed top-0 left-0 right-0 py-8 z-20" style={{ boxShadow: '0 4px 31px 0 rgba(74, 105, 134, 0.1' }}>
            <div className="mx-auto px-28" style={{ maxWidth: '1024px' }}>
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
                            {typeof auth === 'undefined' ? (
                                <button
                                    type="button"
                                    className="w-full self-center items-center px-9 py-3 border border-transparent text-sm leading-4 font-normal rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    style={{ backgroundColor: '#0285e4', boxShadow: '0 4px 31px 0 rgba(0, 0, 0, 0.15)' }}
                                    onClick={() => router.push('/login')}
                                >
                                    Login
                                </button>
                            ) : (
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={'../png/avatar_default.png'}
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        onClick={logout}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}