const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String, minlength: 3, required: true },
  author: { type: String, minlength: 3, required: true },
  url: { type: String, minlength: 12, required: true },
  likes: { type: Number, min: 0, default: 0 },
})

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
