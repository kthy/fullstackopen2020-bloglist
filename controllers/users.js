const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.get('/', async (_, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.password || body.password.length < 3) {
    response.status(400).json({ error: 'password missing or too short' })
  }
  const passwordHash = await bcrypt.hash(body.password, 8)
  const user = new User({ ...body, password: passwordHash })
  const result = await user.save()
  response.status(201).json(result)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await User.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true, runValidators: true, context: 'query' }
  )
  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter
