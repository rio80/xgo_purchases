import { apiGet, apiPost } from './requestApi';
import config from './config'

const body = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    grant_type: config.grant_type,
    provision_key: config.provision_key,
    authenticated_userid: config.authenticated_userid
};

export function getToken() {
    console.log(body)
    return apiPost("/transvisionplus/oauth2/token", body);
}

export function getMinipack() {
    return apiGet(`/transvisionplus/minipack?package_id=${config.idPackage}`);
}

export function createOrderMinipack(data) {
    return apiPost("/transvisionplus/minipack/order", data);
}

export function createRequestPayment(data) {
    return apiPost("/billing/payment/doku/web/pay/ovo", data);
}

export function getStatusOrder(data) {
    return apiPost("/billing/payment/doku/check", { order_id: data });
}

export function postLogin(data) {
    return apiPost("/mytrans/v2/auth/login", data);
}

export function postRegister(data) {
    return apiPost("/mytrans/v2/auth/register", data);
}

export function requestResetPassword(data) {
    return apiPost("/mytrans/v2/auth/req-reset-password", data);
}

export function activatedEmail(expires,hash,id,signature) {
    return apiGet(`/mytrans/v2/auth/verify?expires=${expires}&hash=${hash}&id=${id}&signature=${signature}`);
}

export function resetPassword(data) {
    return apiPost('/mytrans/v2/auth/reset-password', data);
}

export function getProfil(data) {
    return apiPost('/transvisionplus/customer/detail', {email: data});
}

export function getActiveMinipack(data) {
    return apiPost('/transvisionplus/customer/activated-minipack', {email: data});
}



