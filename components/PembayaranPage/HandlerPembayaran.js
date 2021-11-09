import { createOrderMinipack, createRequestPayment } from "../../utils/apiHandlers"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

export const checkPayment = async () => {
    const datapayment = JSON.parse(localStorage.getItem('payment'))
    try {
        let submit = {
            ...datapayment,
            order_id: Cookies.get('order_id')
        }
        const reqPayment = await createRequestPayment(submit)
        router.push(reqPayment?.data?.result?.url_doku)
    } catch (e) {
        createOrder()
    }
}

export const createOrder = async () => {
    try {
        const createorder = JSON.parse(localStorage.getItem('checkout'))
        let postData = await createOrderMinipack(createorder);
        const orderId = postData?.data?.result?.order_id
        Cookies.set('order_id', orderId)
        await checkPayment()
    } catch (e) {
        return { error: e?.res?.data?.message[0] }
        // setError(e?.res?.data?.message[0])
        // setOpen(true)
        // setLoading(false)
    }
}