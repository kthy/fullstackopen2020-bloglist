const _ = require('lodash')

const dummy = _blogs => {
  return 2+2
}

const favoriteBlog = blogs => {
  let favBlog = { likes: -1 }
  blogs.forEach(blog => {
    if (blog.likes > favBlog.likes) {
      favBlog = blog
    }
  })
  return favBlog.likes === -1
    ? {}
    : { title: favBlog.title, author: favBlog.author, likes: favBlog.likes }
}

const mostBlogs = blogs => {
  let authors = []
  _.sortBy(
    _.forEach(
      _.countBy(blogs, 'author'),
      (value, key) => authors.push({ author: key, blogs: value })
    ),
    ['blogs', 'author']
  )
  return authors.pop()
}

const mostLikes = blogs => {
  let authors = {}
  blogs.forEach(blog => {
    if (Object.keys(authors).includes(blog.author)) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  })

  let mostLiked = { likes: -1 }
  Object.keys(authors).forEach(author => {
    if (authors[author] > mostLiked.likes) {
      mostLiked = { author: author, likes: authors[author] }
    }
  })

  return mostLiked.likes === -1
    ? {}
    : mostLiked
}

const totalLikes = blogs => {
  const likeCounter = (sum, item) => sum + item.likes

  return blogs.length === 0
    ? 0
    : blogs.reduce(likeCounter, 0)
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
}
