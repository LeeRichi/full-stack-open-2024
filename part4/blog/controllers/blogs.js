const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) =>
{
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/blog', middleware.userExtractor, async(request, response, next) => {
  const body = request.body
  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }

  const user = await request.user
  console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async(request, response, next) =>
{
  const user = await Blog.findById(request.params.id)

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }

  if (JSON.stringify(user.user) === JSON.stringify(request.user))
  {
    // Blog.findByIdAndDelete(request.params.id)
    // .then(() => {
    //   response.status(204).end()
    // })
    // .catch(error => next(error))
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  } else
  {
    return response.status(403).json({ error: 'unauthorized' });
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter