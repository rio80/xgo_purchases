import dynamic from "next/dynamic";
import HeaderHome from "../../components/shared/Header/HeaderHome";
import * as rdd from "react-device-detect"

export default function Pembayaran() {
    const Pembayaran = dynamic(() => rdd.isDesktop ? import('../../components/PembayaranPage/desktop/PembayaranPage') : import('../../components/PembayaranPage/mobile/PembayaranPage'))
    return (
        <>
            <HeaderHome />
            <Pembayaran />
        </>
    )
}