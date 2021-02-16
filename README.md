# Kafka Producer and Consumer

Topcoder processes are all event driven. Almost all services generate events that are then published on Kafka - and consumed by other services. Topcder has the [bus api](https://github.com/topcoder-platform/tc-bus-api) that interfaces with Kafka already - so you would never find yourself creating a Kafka producer to send events in Topcoder's Kafka instance, but you will find uses for Consuming these events from Kafka

## Template

This folder contains the template for interacting with Kafka - both the producer and consumer bits

### Dependencies

- Nodejs(v12+)
- Kafka

### Configuration

Configuration for the bulk record processor is at `config/default.js`.
The following parameters can be set in config files or in env variables:

- LOG_LEVEL: the log level; default value: 'debug'
- KAFKA_URL: comma separated Kafka hosts; default value: 'localhost:9092'
- KAFKA_CLIENT_CERT: Kafka connection certificate, optional; default value is undefined;
    if not provided, then SSL connection is not used, direct insecure connection is used;
    if provided, it can be either path to certificate file or certificate content
- KAFKA_CLIENT_CERT_KEY: Kafka connection private key, optional; default value is undefined;
    if not provided, then SSL connection is not used, direct insecure connection is used;
    if provided, it can be either path to private key file or private key content
- KAFKA_GROUP_ID: the Kafka group id, default value is 'autopilot-processor'
- EVENT_ORIGINATOR: the event originator to be included in the event message
- EVENT_MIME_TYPE: the event MIME-TYPE to be included in the event message
- READ_TOPIC: the topic where the processor listens to, default value is 'test.topic.read'
- WRITE_TOPIC: the topic where the processor writes to, default value is 'test.topic.write'

### Local Kafka setup

#### Install bin

- `http://kafka.apache.org/quickstart` contains details to setup and manage Kafka server,
  below provides details to setup Kafka server in Linux/Mac, Windows will use bat commands in bin/windows instead

#### Local install with Docker

- Navigate to the directory `docker-kafka`
- Run the command `docker-compose up -d`

### Local deployment

1. Make sure that Kafka is running.

2. From the project root directory, run the following command to install the dependencies

    ```bash
    npm install
    ```

3. To run linters if required

    ```bash
    npm run lint
    ```

    To fix possible lint errors:

    ```bash
    npm run lint:fix
    ```

5. Start the processor and health check dropin

    ```bash
    npm start
    ```

6. You can run `npm run send-event` to send a sample event to the `READ_TOPIC` topic using the script in `src/scripts/send-event.js`. Feel free to play around with the data in that script for testing.

### Local Deployment with Docker

To run the Bulk Record Processor using docker, follow the below steps

1. Navigate to the directory `docker`

2. Rename the file `sample.api.env` to `api.env`

3. Set the required auth0 config in the file `api.env`

4. Once that is done, run the following command

    ```bash
    docker-compose up
    ```

5. When you are running the application for the first time, It will take some time initially to download the image and install the dependencies

### Heroku deployment

- You will need to install Heroku Toolbelt for this step if you don't already have it installed.

- In the main project folder, run the following commands:

```
  heroku login
  git init
  git add .
  git commit -m "init"
  heroku create
  heroku addons:create heroku-kafka:standard-0
  git push heroku master
  heroku logs -t
  heroku open
```

- To set the configuration variables on Heroku, use the following syntax: 

```
  heroku config:set VARIABLE_NAME=value
```

- More details on how to setup Kafka on Heroku can be found [here](https://devcenter.heroku.com/articles/kafka-on-heroku)
