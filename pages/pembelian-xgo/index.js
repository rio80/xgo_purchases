import dynamic from 'next/dynamic'
import HeaderHome from '../../components/shared/Header/HeaderHome'
import * as rdd from 'react-device-detect'
export default function Minipack() {
    const Minipack = dynamic(() => rdd.isDesktop ? import('../../components/PembelianPage/Xgo/desktop/MinipackXgoPage') : import('../../components/PembelianPage/Xgo/mobile/MinipackXgoPage'))
    return (
        <>
            <HeaderHome variant="pastlogin" />
            <Minipack />
        </>
    )
}