import { apiGet, apiPost } from './requestApi';

const body = {
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
    provision_key: process.env.NEXT_PUBLIC_PROVISION_KEY,
    authenticated_userid: process.env.NEXT_PUBLIC_AUTHENTICATED_USERID,
};

export function getToken() {
    return apiPost("/transvisionplus/oauth2/token", body);
}

export function getMinipack(){
    return apiGet("/transvisionplus/minipack?package_id=381");
}

export function createOrderMinipack(data){
    return apiPost("/transvisionplus/minipack/order", data);
}

export function createRequestPayment(data){
    return apiPost("/billing/payment/doku/web/pay/ovo", data);
}

export function getStatusOrder(data){
    return apiPost("/billing/payment/doku/check", {order_id:data});
}



