const service = require('../services/PublishService')

/**
 * Create
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function publish (req, res) {
  res.json(await service.publish(req.body))
}

module.exports = {
  publish
}
