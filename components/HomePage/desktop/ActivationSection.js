import { EyeIcon } from '@heroicons/react/outline'
import * as React from 'react'
import css from './HomePage.module.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ActivationSection() {
    const [aktivasi, setAktivasi] = React.useState(false)
    const expand = () => {
        setAktivasi(!aktivasi)
    }

    return (
        <div className="flex justify-center" style={{ backgroundColor: '#0285e4' }}>
            <div className={classNames(css.activation, "w-full py-20 gap-x-6 px-56")} style={{ height: aktivasi ? '900px' : '500px' }}>
                <div className="flex justify-center">
                    <p className="font-nunito text-center text-white font-bold text-4xl">Aktivasi Xstream Box Anda</p>
                </div>
                <div className="flex mt-16">
                    <div className="flex flex-col w-64 pt-7 mx-auto px-20 gap-y-2 cursor-pointer" onClick={expand}>
                        <div className="flex justify-center">
                            <p className="text-white text-lg">Klik Disini</p>
                        </div>
                        <div className="flex justify-center">
                            <img src={'../../../png/gif/scrolldown.gif'} className={classNames(aktivasi ? "transform -rotate-180 transition duration-300" : "transform rotate-0 transition duration-300", "h-12 w-12")} />
                        </div>
                    </div>
                </div>
                {aktivasi ?
                    <div className="flex justify-center mt-14 flex-col">
                        <div className="w-2/4 relative flex mx-auto mb-8">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center text-sm leading-5">
                                <img src={'../../../svg/email.svg'} />
                            </div>
                            <div className="absolute inset-y-4 pl-16 flex items-center text-sm leading-5 border-r-2 " style={{ borderRight: '1px solid rgba(255, 255, 255, 0.37)' }}></div>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email Anda"
                                className={classNames(css.input, "py-4 pl-20 block w-full mx-auto text-white placeholder-white sm:text-sm border-gray-300 rounded-md")}
                            />
                        </div>
                        <div className="w-2/4 relative flex mx-auto mb-8">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center text-sm leading-5">
                                <img src={'../../../svg/password.svg'} />
                            </div>
                            <div className="absolute inset-y-4 pl-16 flex items-center text-sm leading-5 border-r-2 " style={{ borderRight: '1px solid rgba(255, 255, 255, 0.37)' }}></div>
                            <input
                                type="text"
                                name="password"
                                placeholder="Password"
                                className={classNames(css.input, "py-4 pl-20 block w-full mx-auto text-white placeholder-white sm:text-sm border-gray-300 rounded-md")}
                            />
                        </div>
                        <div className="w-2/4 relative flex mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center text-sm leading-5">
                                <img src={'../../../svg/voucher.svg'} />
                            </div>
                            <div className="absolute inset-y-4 pl-16 flex items-center text-sm leading-5 border-r-2 " style={{ borderRight: '1px solid rgba(255, 255, 255, 0.37)' }}></div>
                            <input
                                type="text"
                                name="password"
                                placeholder="Password"
                                className={classNames(css.input, "py-4 pl-20 block w-full mx-auto text-white placeholder-white sm:text-sm border-gray-300 rounded-md")}
                            />
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit"
                                className="w-40 bg-gray-50 w-full self-center items-center px-8 py-5 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm bg-blue-600"
                                style={{ color: '#0285E4' }}
                            >
                                Aktivasi
                            </button>
                        </div>
                        <div className="ml-3 text-sm flex justify-center mt-8">
                        <label htmlFor="comments" className="font-small text-xs" style={{color : 'rgba(255, 255, 255, 0.6'}}>
                            Dengan aktivasi berarti Anda menyetujui <label className="text-white">syarat dan ketentuan</label> yang berlaku
                        </label>
                    </div>
                    </div>
                    : ''}
                <div className="flex mt-20">
                    <div className="mx-auto flex flex-row">
                        <div className="flex justify-center gap-x-4">
                            <div className="flex justify-center">
                                <img src={'../../../png/check-circle.png'} className="self-center" style={{ width: '19px', height: '18px' }} />
                            </div>
                            <p className="text-white text-base font-semibold">Cepat</p>
                        </div>
                        <div className="flex justify-center gap-x-4 ml-20">
                            <div className="flex justify-center">
                                <img src={'../../../png/check-circle.png'} className="self-center" style={{ width: '19px', height: '18px' }} />
                            </div>
                            <p className="text-white text-base font-semibold">Mudah</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}