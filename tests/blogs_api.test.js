const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let JWT = undefined

beforeAll(async () => {
  await User.deleteMany({})
  const user = {
    username: 'blogs_api.test',
    password: 'foo'
  }
  await api
    .post('/api/users')
    .send(user)
  const login = await api
    .post('/api/login')
    .send(user)
  JWT = login.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const user = await User.find({ username: 'tester' })
  const createInitialBlogs = helper.listWithMoreBlogs.map(blog => new Blog({ ...blog, user: user._id }).save())
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

test('a blog doc cannot be created without a token', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: '.NET Core Code Coverage as a Global Tool with coverlet',
      author: 'Scott Hanselman',
      url: 'https://www.hanselman.com/blog/NETCoreCodeCoverageAsAGlobalToolWithCoverlet.aspx',
      likes: 1
    })
    .expect(401)
})

describe('with a proper token', () => {
  test('a blog doc can be created', async () => {
    let response = await api.get('/api/blogs')
    const lengthBeforeInsert = response.body.length
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${JWT}`)
      .send({
        title: '.NET Core Code Coverage as a Global Tool with coverlet',
        author: 'Scott Hanselman',
        url: 'https://www.hanselman.com/blog/NETCoreCodeCoverageAsAGlobalToolWithCoverlet.aspx',
        likes: 1
      })
      .expect(201)
    response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(lengthBeforeInsert + 1)
    const authors = response.body.map(r => r.author)
    expect(authors).toContain('Scott Hanselman')
  })

  test('a blog doc created without likes has likes=0', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${JWT}`)
      .send({
        title: 'The Majestic Monolith can become The Citadel',
        author: 'David Heinemeier Hansson',
        url: 'https://m.signalvnoise.com/the-majestic-monolith-can-become-the-citadel/'
      })
      .expect(201)
    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })

  test('a blog doc cannot have negative likes', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${JWT}`)
      .send({
        title: 'Foo',
        author: 'Bar',
        url: 'http://example.com/',
        likes: -42
      })
      .expect(400)
    expect(response.body.error).toBeDefined()
  })

  test('a blog doc must have a title', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${JWT}`)
      .send({ author: 'Bar', url: 'http://example.com/' })
      .expect(400)
    expect(response.body.error).toBeDefined()
    expect(response.body.error).toContain('`title` is required')
  })

  test('a blog doc must have a url', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${JWT}`)
      .send({ title: 'Foo', author: 'Bar' })
      .expect(400)
    expect(response.body.error).toBeDefined()
    expect(response.body.error).toContain('`url` is required')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
