import dynamic from 'next/dynamic'
import HeaderHome from '../../components/shared/Header/HeaderHome'
import * as rdd from 'react-device-detect'

export default function Minipack() {
    const Minipack = dynamic(() => rdd.isDesktop ? import('../../components/PembelianPage/Minipack/desktop/MinipackPage') : import('../../components/PembelianPage/Minipack/mobile/MinipackPage'))
    return (
        <>
            <HeaderHome />
            <Minipack />
        </>
    )
}