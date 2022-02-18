import FooterPage from '../../components/FooterPage/FooterPage'
import QrCodePage from '../../components/QRCodePage/QrCodePage'
import HeaderHome from '../../components/shared/Header/HeaderHome'

export default function voucher() {
    return (
        <>
            <HeaderHome />
            <QrCodePage />
            <FooterPage />
        </>
    )
}