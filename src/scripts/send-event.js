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
  await sendEvent(config.READ_TOPIC, { name: 'Publish Event Name', description: 'This is event to publish event via TC Bus API' })
  logger.info('Done!')
  process.exit()
}

main()
