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
async function processMessage (message) {
  const producer = await getKafkaProducer()
  await producer.send({
    topic: config.WRITE_TOPIC,
    message: {
      value: JSON.stringify(generateEventMessage(config.WRITE_TOPIC, message.payload))
    }
  })
}

processMessage.schema = {
  message: Joi.object().keys({
    topic: Joi.string().required(),
    originator: Joi.string().required(),
    timestamp: Joi.date().required(),
    'mime-type': Joi.string().required(),
    payload: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      handle: Joi.string()
    }).required().unknown(true)
  }).required()
}

module.exports = {
  processMessage
}

logger.buildService(module.exports)
