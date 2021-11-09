import { apiGet, apiPost } from './requestApi';
import config from '../utils/config'

const body = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    grant_type: config.grant_type,
    provision_key: config.provision_key,
    authenticated_userid: config.authenticated_userid
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



