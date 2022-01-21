import config from '../../../utils/config'
import axios from "axios";

const body = {
  client_id: config.clientId,
  client_secret: config.clientSecret,
  grant_type: config.clientGrantType,
  provision_key: config.provisionKey,
  authenticated_userid: config.authenticatedUserid
};

export default function tokenv1(req, res) {
  return new Promise((resolve, reject) => {
    axios.post(`${config.apiHost}/transvisionplus/oauth2/token`, body)
      .then(response => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.end(JSON.stringify(response.data.access_token));
        resolve();
      })
      .catch(error => {
        res.json(error);
        res.status(405).end();
        resolve();
      });
  });
}