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
    return apiPost("/transvisionplus/oauth2/token", body);
}

export function getMinipack() {
    return apiGet(`/transvisionplus/minipack?package_id=${config.idPackage}`);
}

export function getMinipackXgo() {
    return apiGet(`/transvisionplus/minipack?package_id=${config.idPackageXgo}`);
}

export function createOrderMinipack(data) {
    return apiPost("/transvisionplus/minipack/order", data);
}

export function createRequestPayment(data) {
    return apiPost("/billing/payment/doku/web/pay/ovo", data);
}


export function createRequestPaymentGopay(data) {
    return apiPost("/billing/payment/midtrans/web/pay", data);
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

export function getTransactionHistory(data) {
    return apiPost('/transvisionplus/order/transaction-history', data);
}

export function getTransactionHistoryMinipack(data) {
    return apiPost('/transvisionplus/minipack/transaction-history/detail', data);
}

export function getTransactionHistoryBox(data) {
    return apiPost('/transvisionplus/xstream/transaction-history/detail', data);
}

export function getProductMinipack(){
    return apiGet('/transvisionplus/product/detail?id=42')
}

export function getJne(data){
    return apiPost('/transvisionplus/courier/rate',data)
}

export function getProvince(){
    return apiGet('/transvisionplus/site-jne/province')
}

export function getCity(data){
    return apiGet(`/transvisionplus/site-jne/city?province=${data}`)
}

export function getDistrict(prov,kec){
    return apiGet(`/transvisionplus/site-jne/district?province=${prov}&city=${kec}`)
}

export function getSubDistrict(prov,kec,kab){
    return apiGet(`/transvisionplus/site-jne/subdistrict?province=${prov}&city=${kec}&district=${kab}`)
}

export function getZipCode(prov,kec,kab,kel){
    return apiGet(`/transvisionplus/site-jne/zipcode?province=${prov}&city=${kec}&district=${kab}&subdistrict=${kel}`)
}

export function saveAddress(data){
    return apiPost('/transvisionplus/customer/address/save',data)
}

export function deleteAddress(data){
    return apiPost('/transvisionplus/customer/address/delete',data)
}

export function createOrderBox(data) {
    return apiPost("/transvisionplus/xstream/order", data);
}

export function getDataStb(data) {
    return apiPost("/billing/payment/stb/show/data", {trx_id: data});
}

export function activationBox(data) {
    return apiPost("/transvisionplus/xstream/activation", data);
}

export function activationStatus(data) {
    return apiGet(`/transvisionplus/xstream/account-info?email=${data}`);
}

export function reprocessActivation(data){
    return apiPost('/transvisionplus/xstream/activation/reprocess', data)
}

export function activationMinipack(data){
    return apiPost('/transvisionplus/minipack/activation', data)
}

export function getDataXgo(data) {
    return apiPost("/billing/payment/web/show/data", {trx_id: data});
}