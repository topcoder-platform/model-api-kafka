/**
 * This module contains the route definitions
 */
const healthController = require('./controllers/HealthController')
const publishController = require('./controllers/PublishController')
const receiveController = require('./controllers/ReceiveController')

module.exports = {
  '/health': {
    get: {
      method: healthController.check
    }
  },
  '/publish': {
    post: {
      method: publishController.publish
    }
  },
  '/receive': {
    get: {
      method: receiveController.status
    }
  },
}
