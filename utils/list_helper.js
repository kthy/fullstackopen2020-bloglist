const dummy = _blogs => {
  return 2+2
}

const totalLikes = blogs => {
  const likeCounter = (sum, item) => sum + item.likes

  return blogs.length === 0
    ? 0
    : blogs.reduce(likeCounter, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
