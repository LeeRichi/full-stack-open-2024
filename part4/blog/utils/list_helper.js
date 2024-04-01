const Blog = require("../models/blog")
var _ = require('lodash');

const dummy = (blogs) =>
{
    return 1
}

const totalLikes = (blogs) =>
{
  return blogs.reduce((total, blog) => total + blog.likes, 0);
}

const favorite = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog;
  }, blogs[0]);
}

const mostBlogs = (blogs) =>
{
  const authorCounts = _.groupBy(blogs, 'author');
  const maxAuthor = _.maxBy(Object.keys(authorCounts), (author) => authorCounts[author].length);
  return maxAuthor;
}

const mostLikes = (blogs) =>
{
  const authorCounts = _.groupBy(blogs, 'author');
  const likesPerAuthor = Object.entries(authorCounts).map(([author, blogs]) => {
    const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
    return { author, likes: totalLikes };
  });
  const maxLikesAuthor = _.maxBy(likesPerAuthor, 'likes')
  return maxLikesAuthor;
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favorite,
  mostBlogs,
  mostLikes,
  blogsInDb
}