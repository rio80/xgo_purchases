import config from '../../../utils/config'
import axios from "axios";

const body = {
  client_id: config.clientId,
  client_secret: config.clientSecret,
  grant_type: config.clientGrantType,
  provision_key: config.provisionKey,
  authenticated_userid: config.authenticatedUserid
};

export default function tokenv2(req, res) {
  const data = req.body.url
  axios.post(`${config.apiHost}${data}/oauth2/token`, body)
    .then(function (response) {
      res.status(200).json(response.data.access_token)
    })
    .catch(function (error) {
      res.status(400).json(error)
    });

}
