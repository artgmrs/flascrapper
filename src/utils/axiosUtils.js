const axios = require('axios');
const { Agent } = require('node:https');

const createAxiosInstance = () => {
  return axios.create({
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  });
};

module.exports = {
  createAxiosInstance,
}