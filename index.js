const opentelemetry = require("@opentelemetry/api");
const logger = require('./logger');

const tracer = opentelemetry.trace.getTracer(
  'service-a'
);


function getRandomNumber(min, max) {
  return tracer.startActiveSpan('getRandomNumber', (span) => {
    return Math.floor(Math.random() * (max - min) + min);
  });
}

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  logger.info('Hello world!');
  res.send(getRandomNumber(1, 6).toString());
})

app.get('/span', (req, res) => {
  tracer.startActiveSpan('/', (span) => {
    res.send(getRandomNumber(1, 6).toString());
  });
})

app.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})
