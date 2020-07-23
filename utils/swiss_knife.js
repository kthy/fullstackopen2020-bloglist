const nodeEnv = process.env.NODE_ENV.toLowerCase()
const environmentIsProd = nodeEnv === 'production'
const environmentIsTest = nodeEnv === 'test'
const environmentIsDev = !(environmentIsProd || environmentIsTest)

const mongoJsonTransformer = (_doc, returnedObj) => {
  returnedObj.id = returnedObj._id.toString()
  delete returnedObj._id
  delete returnedObj.__v
}

module.exports = {
  environmentIsDev,
  environmentIsProd,
  environmentIsTest,
  mongoJsonTransformer,
}
