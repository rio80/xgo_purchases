import Loader from 'react-loader-spinner';
import { activatedEmail } from "../../../utils/apiHandlers";
import { useRouter } from 'next/router';

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function VerifyAccount(props) {
    const router = useRouter()
    const { expires, hash, id, signature } = props
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [counter, setCounter] = useState(10);
    const [open, setOpen] = useState(true)

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const getData = await activatedEmail(expires, hash, id, signature);
                if (getData.data.status) {
                    setSuccess(true)
                }
            } catch (e) {
                console.log(e)
            }
        })();
        setLoading(false)
    }, []);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        console.log(counter)
        if (counter === 0) {
            router.push('/login')
        }
    }, [counter]);


    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
            </div>
        )
    }
    return (
        <>
            {success ? (
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto" onClose={() => { setOpen(false), close(false), router.push('/login') }}>
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                    <div>
                                        <div className="bg-green-100 mx-auto flex items-center justify-center h-12 w-12 rounded-full">
                                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Email berhasil di verifikasi
                                            </Dialog.Title>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <p className="text-sm text-center text-gray-500">
                                            Anda akan di arahkan ke halaman login : {counter}
                                        </p>
                                    </div>

                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="w-full self-center items-center px-8 py-4 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                            style={{ backgroundColor: '#0285e4' }}
                                            onClick={() => { setOpen(false), close(false), link !== '' ? router.push(link) : '' }}
                                        >
                                            Ke Halaman Masuk
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            )
                : ('')
            }
        </>
    )
}

VerifyAccount.getInitialProps = async ctx => {
    const { query } = ctx;
    return {
        expires: query ? query.expires : '',
        hash: query ? query.hash : '',
        id: query ? query.id : '',
        signature: query ? query.signature : '',
    };
};