import css from './Footer.module.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Footer() {
    return (
        <div className="sticky bg-white bottom-0 right-0 left-0 h-auto z-20 flex flex-row" style={{ borderLeft: '6px solid #0285e4', boxShadow: '0 -4px 8px 0 rgba(0, 0, 0, 0.06)' }}>
            <div className="w-2/5">
                <div className="ml-28 py-3 flex flex-col">
                    <div>
                        <p className="text-xs font-mendium">DATA ANDA</p>
                    </div>
                    <div className="my-2">
                        <p className="text-lg font-semibold">Gajah Selalu Ingat</p>
                    </div>
                    <div>
                        <p className="text-xs font-mendium">Jl. H. R. Rasuna Said No.8 RT.08 RW.07, Kuningan, Jakarta Selatan, 12950</p>
                    </div>
                </div>
            </div>
            <div className="w-3/5 flex-grow">
                <div className="flex flex-row">
                    <div className="border-l-2 h-auto w-56 flex">
                        <div className="mx-auto py-3 flex flex-col px-2">
                            <div>
                                <p className="text-xs text-center font-mendium">PRODUK</p>
                            </div>
                            <div className="my-2">
                                <p className="text-lg text-center font-semibold">Xstream Seru</p>
                            </div>
                            <div>
                                <p className="text-xs text-center font-mendium">Xstream Seru 8 GB, 3 Bulan</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-l-2 h-auto w-56">
                        <div className="mx-auto py-3 flex flex-col px-2">
                            <div>
                                <p className="text-xs text-center font-mendium">PENGIRIMAN</p>
                            </div>
                            <div className="my-2">
                                <p className="text-lg text-center font-semibold">JNE REG</p>
                            </div>
                            <div>
                                <p className="text-xs text-center font-mendium">1-2 Hari</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-l-2 h-auto w-56">
                        <div className="mx-auto py-3 flex flex-col px-2">
                            <div>
                                <p className="text-xs text-center font-mendium">Minipack</p>
                            </div>
                            <div className="my-2">
                                <p className="text-lg text-center font-semibold">CATCHPLAY</p>
                            </div>
                            <div>
                                <p className="text-xs text-center font-mendium">RP700.000</p>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(css.beli,"col-span-2 flex w-96 cursor-pointer")}>
                        <p className="my-auto mx-auto text-white text-semibold text-base"> BELI</p>
                    </div>
                </div>
            </div>

        </div>
    )
}