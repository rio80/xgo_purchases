import config from './config'
import axios from "axios";
import Cookies from "js-cookie";

const API_GATEWAY = config.apiHost;

export const Axios = axios.create({
  baseURL: API_GATEWAY,
  timeout: 15000,
});

const body = {
  client_id: config.clientId,
  client_secret: config.clientSecret,
  grant_type: config.clientGrantType,
  provision_key: config.provisionKey,
  authenticated_userid: config.authenticatedUserid
};

const getAccessToken = (url) => {
  const splitParam = url.split('?')[0]
  return axios.post(`${config.apiHost}${splitParam}/oauth2/token`, body)
    .then(function (response) {
      return response.data.access_token;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const refreshAccessToken = () => {
  return Axios.post("/transvisionplus/oauth2/token", body)
    .then(function (response) {
      return response.data.access_token;
    })
    .catch(function (error) {
      console.log(error);
    });
};

Axios.interceptors.request.use(
  async (config) => {
    const url = config.url
    const splitUrl = config.url.split('/')[1]
    if (splitUrl === 'transvisionplus') {
      const token = await Cookies.get("token");
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
    } else {
      const getToken = await getAccessToken(url)
      if (getToken) {
        config.headers = {
          Authorization: `Bearer ${getToken}`,
        };
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
  null,
  { synchronous: true }
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    // console.log(error);
    if (error?.response?.status === 401 && !config._retry) {
      config._retry = true;
      const refreshToken = await refreshAccessToken();
      Axios.defaults.headers.common.authorization = `Bearer ${refreshToken}`;
      Cookies.set("token", refreshToken);

      return Axios(config);
    }

    return Promise.reject(error);
  }
);

export const apiGet = (url, params = {}) =>
  new Promise(async (resolve, reject) => {
    await Axios.get(url, { params })
      .then((res) => {
        resolve({ data: res.data, status: res?.status });
      })
      .catch((err) => {
        reject({ err });
      });
  });

export const apiPost = (url, data) =>
  new Promise(async (resolve, reject) => {
    await Axios.post(url, { ...data })
      .then((res) => {
        resolve({ data: res.data, status: res?.status });
      })
      .catch((err) => {
        reject({ err, res: err?.response, status: err?.status });
      });
  });

