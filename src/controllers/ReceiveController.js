const service = require('../services/ReceiveService')

/**
 * Create
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function status (req, res) {
  res.json(JSON.parse(await service.status()))
}

module.exports = {
  status
}
