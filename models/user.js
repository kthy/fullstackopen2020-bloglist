const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const util = require('../utils/swiss_knife')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  password: { type: String, required: true, validate: /^\$2[ab]\$.+/ },
  name: { type: String, default: 'Anonymous Coward' },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (doc, obj) => {
    util.mongoJsonTransformer(doc, obj)
    delete obj.password
  }
})

module.exports = mongoose.model('User', userSchema)
