if (process.env.NODE_ENV !== 'production') require('dotenv-expand')(require('dotenv').config())

let MONGODB_PWD = process.env.MONGODB_PWD
let MONGODB_URI = process.env.MONGODB_URI
let PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_PWD,
  MONGODB_URI,
  PORT,
}
