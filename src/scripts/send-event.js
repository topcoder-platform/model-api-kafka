/**
 * Help script to send a sample event
 */
global.Promise = require('bluebird')
const config = require('config')
const logger = require('../common/logger')
const { getKafkaProducer, generateEventMessage } = require('../common/helper')

/**
 * Send message
 * @param {String} topic the topic
 * @param {Object} payload the payload
 */
async function sendEvent (topic, payload) {
  try {
    const producer = await getKafkaProducer()
    await producer.send({
      topic,
      message: {
        value: JSON.stringify(generateEventMessage(topic, payload))
      }
    })
  } catch (e) {
    console.log(e)
  }
}

/**
 * The main function
 */
async function main () {
  await sendEvent(config.READ_TOPIC, { firstName: 'John', lastName: 'Doe', handle: 'jdoe' })
  logger.info('Done!')
  process.exit()
}

main()
