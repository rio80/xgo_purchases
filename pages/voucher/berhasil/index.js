import FooterPage from '../../../components/FooterPage/FooterPage'
import HeaderHome from '../../../components/shared/Header/HeaderHome'
import VoucherBerhasilPage from '../../../components/VoucherPage/VoucherBerhasilPage/VoucherBerhasilPage'

export default function VoucherBerhasil() {
    return (
        <>
            <HeaderHome />
            <VoucherBerhasilPage />
            <FooterPage variant={'passlogin'} />
        </>
    )
}