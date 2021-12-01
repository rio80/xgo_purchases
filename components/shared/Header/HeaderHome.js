import { useState, Fragment, useEffect } from 'react'
import Cookies from "js-cookie";
import { useRouter } from "next/router"
import { Popover, Disclosure, Menu, Transition } from '@headlessui/react'
import Head from 'next/head';
import { scroller } from "react-scroll";
import { MenuIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/outline'
import css from './HeaderHome.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HeaderHome({ variant = 'default' }) {
    const router = useRouter();
    const auth = Cookies.get('auth')
    const [navbar, setNavbar] = useState(false);
    const [active, setActive] = useState('Home');
    const [app, setApp] = useState('')

    const home = [
        { name: 'Home', href: '#', current: true },
        { name: 'Product', href: '#', current: false },
        { name: 'FAQ', href: '#', current: false }
    ]

    const pages = [
        { name: 'Pembelian', href: '#', current: true },
        { name: 'Pembayaran', href: '#', current: false },
        { name: 'Verifikasi', href: '#', current: false },
    ]

    const rowLen = pages.length;

    const logout = () => {
        Cookies.remove('auth')
        localStorage.removeItem('checkout')
        localStorage.removeItem('payment')
        router.push('/')
    }

    const scrollToSection = (name) => {
        scroller.scrollTo(name, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
            offset: name === 'Product' ? -110 : name === 'FAQ' ? -60 : -200
        });
    };

    const empty = () => {
        //nothing
    }

    const changeHeader = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    const changeActiveMenu = () => {
        if (window.scrollY >= 2947) {
            setActive('FAQ');
        } else if (window.scrollY >= 941) {
            setActive('Product')
        } else {
            setActive('Home');
        }
    }

    useEffect(() => {
        if (typeof window !== undefined) {
            window.addEventListener('scroll', changeHeader);
        }

        if (typeof window !== undefined) {
            window.addEventListener('scroll', changeActiveMenu);
        }
    }, []);

    useEffect(() => {
        const url = router.pathname.toString().split("/")[1].split("-")[0];
        if (url === 'profile') {
            setActive('')
        }
        setApp(url)

    }, [app])

    return (
        <>
            <Head>
                <title>My Transvision 2.0</title>
                <link rel="icon" href={'../png/logo.png'} />
            </Head>
            <Disclosure as="nav" className={classNames(navbar ? css.header : "py-8", "bg-white fixed top-0 left-0 right-0 z-20 h-28")} style={{ boxShadow: navbar ? '0 4px 31px 0 rgba(74, 105, 134, 0.1' : '' }}>
                <div className="mx-8 lg:mx-auto px-0" style={{ maxWidth: '1024px' }}>
                    <div className="flex lg:justify-between items-center">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center ">
                                <img
                                    className="h-4 cursor-pointer"
                                    src={`../png/transvision.png`}
                                    alt="TRANSVISION"
                                    style={{ width: '171px', height: '19px' }}
                                    onClick={() => router.push('/')}
                                />
                            </div>
                        </div>

                        <Popover className="flex w-full lg:hidden">
                            <Popover.Button className="ml-auto bg-white rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="duration-200 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-100 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                        <div className="pt-5 pb-6 px-5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <img
                                                        className="h-4"
                                                        src={`../png/transvision.png`}
                                                        alt="TRANSVISION"
                                                    />
                                                </div>
                                                <div className="-mr-2">
                                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                        <span className="sr-only">Close menu</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <nav className="grid gap-y-8">
                                                    {home.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={variant !== 'default' ? '/' : item.href}
                                                            onClick={variant !== 'default' ? empty : () => scrollToSection(item.name)}
                                                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                        >
                                                            <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                                        </a>
                                                    ))}
                                                    {typeof auth === 'undefined' ? (
                                                        <a
                                                            href={'/login'}
                                                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                        >
                                                            <span className="ml-3 text-base font-medium text-gray-900">Login</span>
                                                        </a>
                                                    ) : (
                                                        <>
                                                            <a
                                                                href={'/profile'}
                                                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                            >
                                                                <span className="ml-3 text-base font-medium text-gray-900">Your Profile</span>
                                                            </a>
                                                            <a
                                                                onClick={logout}
                                                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                            >
                                                                <span className="ml-3 text-base font-medium text-gray-900">Sign Out</span>
                                                            </a>
                                                        </>
                                                    )}

                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>


                        <nav className="hidden lg:flex" aria-label="Breadcrumb">
                            <ol role="list" className="flex items-center space-x-4">
                                {variant === 'pastlogin' ? (
                                    pages.map((page, index) => (
                                        <li key={page.name}>
                                            <div className="flex items-center">
                                                {app === 'pembayaran' && page.name === 'Pembelian' ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#a7bbdc' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    page.name !== 'Verifikasi' && app === 'verifikasi' ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#a7bbdc' }}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        :
                                                        ''
                                                )}
                                                <a
                                                    href={page.href}
                                                    className={classNames(app === page.name.toLocaleLowerCase() ? css.pageActive : css.pageInactive, "text-black mr-4 text-base font-normal font-nunito")}
                                                    aria-current={page.current ? 'page' : undefined}
                                                >
                                                    {page.name}
                                                </a>
                                                {rowLen !== index + 1 && <FontAwesomeIcon icon={faCaretRight} className="flex-shrink-0 h-5 w-5" aria-hidden="true" style={{ color: '#a7bbdc' }} />}
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    home.map((page, index) => (
                                        <li key={page.name}>
                                            <div className="flex items-center">
                                                <a
                                                    href={variant !== 'default' ? '/' : page.href}
                                                    onClick={variant !== 'default' ? empty : () => scrollToSection(page.name)}
                                                    className={classNames(app !== 'profile' && active === page.name ? css.pageActive : css.page, "text-black mr-4 text-base font-normal font-nunito")}
                                                    aria-current={page.current ? 'page' : undefined}
                                                >
                                                    {page.name}
                                                </a>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ol>
                        </nav>

                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center hidden lg:flex">
                                {typeof auth === 'undefined' ? (
                                    <button
                                        type="button"
                                        className={classNames(navbar ? "px-10 py-3" : "px-11 py-3.5", "w-full self-center items-center border border-transparent text-base leading-6 font-normal rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500")}
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
                                                            href={'/profile'}
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
        </>
    )
}