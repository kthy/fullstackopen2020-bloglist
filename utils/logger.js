const util = require('./swiss_knife')

const info = (...params) => {
  if (!util.environmentIsTest) {
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error,
}
