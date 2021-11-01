import FooterPage from '../../components/FooterPage/FooterPage'
import HeaderHome from '../../components/shared/Header/HeaderHome'
import VoucherPage from '../../components/VoucherPage/VoucherPage'

export default function voucher() {
    return (
        <>
            <HeaderHome />
            <VoucherPage />
            <FooterPage variant={'pastlogin'} />
        </>
    )
}