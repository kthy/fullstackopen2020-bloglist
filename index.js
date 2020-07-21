const bloglist = require('./app')
const config = require('./utils/config')
const http = require('http')
const logger = require('./utils/logger')

const server = http.createServer(bloglist)

server.listen(config.PORT, () => {
  logger.info(`Bloglist server running on port ${config.PORT}`)
})
