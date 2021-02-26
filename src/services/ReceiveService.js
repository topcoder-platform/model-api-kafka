
const service = require('../services/ReceiveService')
const fs = require('fs');

/**
 * status
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function status () {
  let rawdata = fs.readFileSync(__dirname + '/../helpers/messages.json');
  return rawdata
}

module.exports = {
  status
}