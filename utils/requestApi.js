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
  return axios.post(`/api/tokenv2`, {url :splitParam})
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
};

const refreshAccessToken = () => {
  return axios.post(`/api/tokenv1`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
};

Axios.interceptors.request.use(async (req) => {
  const url = req.url
  const splitUrl = req.url.split('/')[1]
  if (splitUrl === 'transvisionplus') {
    const getTokenTrv = await refreshAccessToken()
    if (getTokenTrv) {
      req.headers = {
        Authorization: `Bearer ${getTokenTrv}`,
      };
    }
  } else {
    const getToken = await getAccessToken(url)
    if (getToken) {
      req.headers = {
        Authorization: `Bearer ${getToken}`,
      };
    }

  }
  return req;
});

// Axios.interceptors.request.use(
//   async (config) => {
//     const url = config.url
//     const splitUrl = config.url.split('/')[1]
//     if (splitUrl === 'transvisionplus') {
//       const token = await Cookies.get("token");
//       // const token = await refreshAccessToken()
//       if (token) {
//         config.headers = {
//           Authorization: `Bearer ${token}`,
//         };
//       }
//     } else {
//       const getToken = await getAccessToken(url)
//       if (getToken) {
//         config.headers = {
//           Authorization: `Bearer ${getToken}`,
//         };
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
//   null,
//   { synchronous: true }
// );

// Axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // console.log('masuk response')
//     const config = error.config;
//     if (error?.response?.status === 401 && !config._retry) {
//       config._retry = true;
//       const refreshToken = await refreshAccessToken();
//       Axios.defaults.headers.common.authorization = `Bearer ${refreshToken}`;
//       // Cookies.set("token", refreshToken);

//       return Axios(config);
//     }

//     return Promise.reject(error);
//   }
// );

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

