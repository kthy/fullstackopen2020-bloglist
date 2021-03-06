const Blog = require('../models/blog')
const User = require('../models/user')

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const listWithMoreBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  }, {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }, {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }, {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  }, {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  }, {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingBlogId = async () => {
  const blog = new Blog(listWithOneBlog[0])
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const usersInDb = async () => {
  const blogs = await User.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingUserId = async () => {
  const user = new User({
    username: 'foo',
    name: 'Foo Fala',
    password: 'Quux',
  })
  await user.save()
  await user.remove()
  return user._id.toString()
}

module.exports = {
  blogsInDb,
  listWithOneBlog,
  listWithMoreBlogs,
  nonExistingBlogId,
  nonExistingUserId,
  usersInDb,
}
