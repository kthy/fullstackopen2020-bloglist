if (process.env.NODE_ENV !== 'production') require('dotenv-expand')(require('dotenv').config())

const MONGODB_PWD = process.env.MONGODB_PWD
let MONGODB_URI = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

const PORT = process.env.PORT

module.exports = {
  MONGODB_PWD,
  MONGODB_URI,
  PORT,
}
