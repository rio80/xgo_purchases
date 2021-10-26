import Head from 'next/head'
import PurchasePage from '../../components/PurchasePage/PurchasePage'
import Header from '../../components/shared/Header/Header'

export default function Pembelian() {
    return (
        <>
            <Head>
                <title>Payment - XGO</title>
                <link rel="icon" href={'../png/logo.png'} />
            </Head>

            <Header />
            <PurchasePage />
        </>
    )
}