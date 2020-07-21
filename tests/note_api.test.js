const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const createInitialBlogs = helper.listWithMoreBlogs.map(blog => new Blog(blog).save())
  await Promise.all(createInitialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.listWithMoreBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(titles).toContain('Canonical string reduction')
})

test('a blog has an id', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)
  ids.forEach(id => expect(id).toHaveLength(24))
})

test('a blog doc can be created', async () => {
  let response = await api.get('/api/blogs')
  const lengthBeforeInsert = response.body.length
  await api
    .post('/api/blogs')
    .send({
      title: '.NET Core Code Coverage as a Global Tool with coverlet',
      author: 'Scott Hanselman',
      url: 'https://www.hanselman.com/blog/NETCoreCodeCoverageAsAGlobalToolWithCoverlet.aspx',
      likes: 1
    })
  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(lengthBeforeInsert + 1)
  const authors = response.body.map(r => r.author)
  expect(authors).toContain('Scott Hanselman')
})

test('a blog doc created without likes has likes=0', async () => {
  const response = await api
    .post('/api/blogs')
    .send({
      title: 'The Majestic Monolith can become The Citadel',
      author: 'David Heinemeier Hansson',
      url: 'https://m.signalvnoise.com/the-majestic-monolith-can-become-the-citadel/'
    })
  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})

test('a blog doc cannot have negative likes', async () => {
  const response = await api
    .post('/api/blogs')
    .send({
      title: 'Foo',
      author: 'Bar',
      url: 'http://example.com/',
      likes: -42
    })
  expect(response.body.error).toBeDefined()
})

test('a blog doc must have a title', async () => {
  const response = await api
    .post('/api/blogs')
    .send({ author: 'Bar', url: 'http://example.com/' })
  expect(response.body.error).toBeDefined()
})

test('a blog doc must have a url', async () => {
  const response = await api
    .post('/api/blogs')
    .send({ title: 'Foo', author: 'Bar' })
  expect(response.body.error).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
