const cors = require('cors')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

morgan.token('body', request => {
  const body = JSON.stringify(request.body)
  return body === '{}' ? null : body
})

const app = express()
  .use(cors())
  .use(express.static('build'))
  .use(express.json())
  .use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  .use(middleware.requestLogger)
  .use('/api/blogs', blogsRouter)

const mongoUrl = config.MONGODB_URI
logger.info('Connecting to', mongoUrl.replace(config.MONGODB_CRED, 'AzureDiamond:hunter2'))
mongoose
  .connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(_ => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
