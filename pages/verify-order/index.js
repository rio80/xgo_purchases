import * as React from 'react'
import BerhasilPage from '../../components/BerhasilPage/BerhasilPage';
import GagalPage from '../../components/GagalPage/GagalPage';
import Header from '../../components/shared/Header/Header';
import { getStatusOrder } from '../../utils/apiHandlers';

export default function VerifyOrder(props) {
    const { order_id } = props
    const [status, setStatus] = React.useState(false)
    React.useEffect(() => {
        (async () => {
            try {
                const getData = await getStatusOrder(order_id);
                // console.log(getData?.data?.result?.transaction_status)
                setStatus(getData?.data?.result?.transaction_status)
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);
    return (
        <>
            <Header />
            {status === 'PAID' ? <BerhasilPage /> : <GagalPage />}
        </>
    )
}

VerifyOrder.getInitialProps = async ctx => {
    const { query } = ctx;
    return {
        order_id: query ? query.order_id : '',
    };
};