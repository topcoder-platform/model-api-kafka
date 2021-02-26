const service = require('../services/HealthService')

/**
 * Create
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function check (req, res) {
  res.json(await service.check(req.body))
}

module.exports = {
  check
}
