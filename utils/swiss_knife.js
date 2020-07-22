const mongoJsonTransformer = (_doc, returnedObj) => {
  returnedObj.id = returnedObj._id.toString()
  delete returnedObj._id
  delete returnedObj.__v
}

module.exports = {
  mongoJsonTransformer,
}
