const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('dummy(blogs):', () => {
  test('returns two plus two', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(4)
  })
})

describe('favoriteBlog(blogs):', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('when list has only one blog equals that', () => {
    const result = listHelper.favoriteBlog(testHelper.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a longer list is found correctly', () => {
    const result = listHelper.favoriteBlog(testHelper.listWithMoreBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('mostBlogs(blogs):', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBeUndefined()
  })

  test('when list has only one blog equals that author', () => {
    const result = listHelper.mostBlogs(testHelper.listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('of a longer list is found correctly', () => {
    const result = listHelper.mostBlogs(testHelper.listWithMoreBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('mostLikes(blogs):', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('when list has only one blog equals that author', () => {
    const result = listHelper.mostLikes(testHelper.listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('of a longer list is found correctly', () => {
    const result = listHelper.mostLikes(testHelper.listWithMoreBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})

describe('totalLikes(blogs):', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a longer list is calculated right', () => {
    const result = listHelper.totalLikes(testHelper.listWithMoreBlogs)
    expect(result).toBe(36)
  })
})
