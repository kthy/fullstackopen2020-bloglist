const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  return authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null
}

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', 'name username')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  let decodedToken = { id: false }
  try {
    decodedToken = jwt.verify(token, config.JWT_SECRET)
  } catch (jwtError) {
    return response.status(401).json({ error: jwtError })
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({ ...body, user: user._id })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
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

module.exports = blogsRouter
