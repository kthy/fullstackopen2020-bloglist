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

const totalLikes = blogs => {
  const likeCounter = (sum, item) => sum + item.likes

  return blogs.length === 0
    ? 0
    : blogs.reduce(likeCounter, 0)
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
}
