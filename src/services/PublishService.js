/**
 * Processor Service
 */
const Joi = require('@hapi/joi')
const config = require('config')
const { getKafkaProducer, generateEventMessage } = require('../common/helper')
const logger = require('../common/logger')

/**
 * Process the message
 * @param {Object} message the kafka message
 * @returns {Promise}
 */
async function publish (message) {
  const producer = await getKafkaProducer()
  return await producer.send({
    topic: config.WRITE_TOPIC,
    message: {
      value: JSON.stringify(generateEventMessage(config.WRITE_TOPIC, message.payload))
    }
  })
}

publish.schema = {
  message: Joi.object().keys({
    payload: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string()
    }).required().unknown(true)
  }).required()
}

module.exports = {
  publish
}

logger.buildService(module.exports)
