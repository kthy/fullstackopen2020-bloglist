const jwt = require('jsonwebtoken')
const config = require('./config')
const logger = require('./logger')

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  let token = false

  const authorization = request.get('authorization')
  const bearer = authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null

  if (bearer) {
    try {
      token = jwt.verify(bearer, config.JWT_SECRET)
    } catch (jwtError) {
      return response.status(401).json({ error: jwtError })
    }
    if (!token.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
  }

  request.token = token

  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  errorHandler,
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
}
