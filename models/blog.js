const mongoose = require('mongoose')
const util = require('../utils/swiss_knife')

const blogSchema = mongoose.Schema({
  title: { type: String, minlength: 3, required: true },
  author: { type: String, minlength: 3, default: '' },
  url: { type: String, minlength: 10, required: true },
  likes: { type: Number, min: 0, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.set('toJSON', { transform: util.mongoJsonTransformer })

module.exports = mongoose.model('Blog', blogSchema)
