/**
 * Contains generic helper methods
 */
const config = require('config')
const Kafka = require('no-kafka')

let producer

/**
 * Get Kafka options
 * @return {Object} the Kafka options
 */
function getKafkaOptions () {
  const options = { connectionString: config.KAFKA_URL, groupId: config.KAFKA_GROUP_ID }

  /* istanbul ignore next */
  if (config.KAFKA_CLIENT_CERT && config.KAFKA_CLIENT_CERT_KEY) {
    options.ssl = { cert: config.KAFKA_CLIENT_CERT, key: config.KAFKA_CLIENT_CERT_KEY }
  }
  return options
}

/**
 * Get a kafka producer instance
 */
async function getKafkaProducer () {
  if (producer) return producer
  producer = new Kafka.Producer(getKafkaOptions())
  await producer.init()
  return producer
}

/**
 * Generate an event payload object to be send to kafka
 * @param {Object|Array} payload the payload
 */
function generateEventMessage (topic, payload) {
  return {
    topic,
    originator: config.EVENT_ORIGINATOR,
    timestamp: new Date().toISOString(),
    'mime-type': config.EVENT_MIME_TYPE,
    payload
  }
}

module.exports = {
  getKafkaOptions,
  generateEventMessage,
  getKafkaProducer
}
