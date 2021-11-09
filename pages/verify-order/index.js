import Cookies from 'js-cookie';
import * as React from 'react'
import Loader from 'react-loader-spinner';
import BerhasilPage from '../../components/BerhasilPage/BerhasilPage';
import GagalPage from '../../components/GagalPage/GagalPage';
import HeaderHome from '../../components/shared/Header/HeaderHome';
import { getStatusOrder } from '../../utils/apiHandlers';

export default function VerifyOrder(props) {
    const { order_id } = props
    const [status, setStatus] = React.useState(false)
    const [price, setPrice] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            try {
                const getData = await getStatusOrder(order_id);
                setStatus(getData?.data?.result?.transaction_status)
                setPrice(getData?.data?.result?.gross_amount)
                Cookies.remove('order_id')
                localStorage.removeItem('payment')
                localStorage.removeItem('checkout')
            } catch (e) {
                console.log(e)
            }
        })();
        setLoading(false)
    }, []);


    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
            </div>
        )
    }

    return (
        <>
            <HeaderHome />
            {status ? status === 'PAID' ? <BerhasilPage harga={price} /> : <GagalPage /> : ''}
        </>
    )
}

VerifyOrder.getInitialProps = async ctx => {
    const { query } = ctx;
    return {
        order_id: query ? query.order_id : '',
    };
};