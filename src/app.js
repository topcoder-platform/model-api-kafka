/**
 * The application entry point
 */

global.Promise = require('bluebird')
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const _ = require('lodash')
const routes = require('./routes')
const Kafka = require('no-kafka')
const logger = require('./common/logger')
const helper = require('./common/helper')
const fs = require('fs');

const app = express()

// Add required middlewares
app.use(bodyParser.json())
app.use(cors())

// load routes
_.each(routes, (route, routeDef) => {
  _.each(route, (def, verb) => {
    const actions = []
    actions.push((req, res, next) => def.method(req, res).catch(e => next(e)))
    app[verb](`/${config.API_VERSION}${routeDef}`, actions)
  })
})

// create consumer
const consumer = new Kafka.GroupConsumer(helper.getKafkaOptions())

/*
 * Data handler linked with Kafka consumer
 * Whenever a new message is received by Kafka consumer,
 * this function will be invoked
 */
const dataHandler = (messageSet, topic, partition) => Promise.each(messageSet, async (m) => {
  const message = m.message.value.toString('utf8')
  logger.info(`Handle Kafka event message; Topic: ${topic}; Partition: ${partition}; Offset: ${m.offset}; Message: ${message}.`)
  let messageJSON
  try {
    messageJSON = JSON.parse(message)
  } catch (e) {
    logger.error('Invalid message JSON.')
    logger.logFullError(e)
    // commit the message and ignore it
    await consumer.commitOffset({ topic, partition, offset: m.offset })
    return
  }
  if (messageJSON.topic !== topic) {
    logger.error(`The message topic ${messageJSON.topic} doesn't match the Kafka topic ${topic}.`)
    // commit the message and ignore it
    await consumer.commitOffset({ topic, partition, offset: m.offset })
    return
  }
  try {
    fs.writeFileSync(__dirname + '/helpers/messages.json', JSON.stringify(messageJSON));
    logger.debug('Successfully processed message')
  } catch (err) {
    logger.logFullError(err)
  } finally {
    // Commit offset regardless of error
    await consumer.commitOffset({ topic, partition, offset: m.offset })
  }
})

const topics = [config.READ_TOPIC]

logger.info('Starting kafka consumer')
consumer
  .init([{
    subscriptions: topics,
    handler: dataHandler
  }])
  .then(() => {
    logger.info('Initialized.......')
    logger.info(topics)
    logger.info('Kick Start.......')
  })
  .catch(logger.logFullError)


// Start the API
app.listen(config.PORT, () => logger.info(`API is running on port ${config.PORT}`))