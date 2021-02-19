/**
 * The default configuration file.
 */

module.exports = {
  PORT: process.env.PORT || 2004,
  API_VERSION: process.env.API_VERSION || 'v5/model-api/kafka',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  KAFKA_URL: process.env.KAFKA_URL || 'localhost:9092',
  // below are used for secure Kafka connection, they are optional
  // for the local Kafka, they are not needed
  KAFKA_CLIENT_CERT: process.env.KAFKA_CLIENT_CERT,
  KAFKA_CLIENT_CERT_KEY: process.env.KAFKA_CLIENT_CERT_KEY,

  // Kafka group id
  KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || 'model-api-kafka',
  EVENT_ORIGINATOR: process.env.EVENT_ORIGINATOR || 'model-api-kafka',
  EVENT_MIME_TYPE: process.env.EVENT_MIME_TYPE || 'application/json',
  READ_TOPIC: process.env.READ_TOPIC || 'test.new.bus.events',
  WRITE_TOPIC: process.env.WRITE_TOPIC || 'test.new.bus.events'
}
