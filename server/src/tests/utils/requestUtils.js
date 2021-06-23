const requestPromise = require('request-promise');
const config = require('../../../config/development');

const api = `${config.host}:${config.port}`;

const getEndpointResponse = (requestOptions) => () => requestPromise(requestOptions);
const testEndPoint = (endpoint, config, body = {}) => {
  return (
    getEndpointResponse({
      method: config.method,
      uri: `${api}${endpoint}`,
      json: config.json,
      body
    })
  )
}

module.exports = { 
  testEndPoint
}