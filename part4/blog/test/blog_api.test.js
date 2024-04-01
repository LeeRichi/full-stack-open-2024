const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert');

const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('../utils/list_helper')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'dog',
    url: 'www.google.com',
    likes: 22
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'cat',
    url: 'www.gmail.com',
    likes: 3
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('there are x blogs', async () => {
//   const response = await api.get('/api/blogs')

//   assert.strictEqual(response.body.length, 2)
// })

// test('The unique identifier is named id', async () =>
// {
//   const response = await api.get('/api/blogs')
//   const allBlogsHaveId = response.body.every(blog => 'id' in blog);

//   assert.strictEqual(allBlogsHaveId, true);
// })

// test('Total amount of blog increases by 1 while every post', async() =>
// {
//   const newBlog = {
//     title: 'HTML is a dog',
//     author: 'dog',
//     url: 'www.yahoo.com',
//     likes: 20
//   }
//   await api
//     .post('/api/blogs/blog')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
  
//     const response = await api.get('/api/blogs')
//     const titles = response.body.map(r => r.title)

//     assert.strictEqual(response.body.length, initialBlogs.length + 1)

//     assert(titles.includes('HTML is a dog'))
// })

// test('if like is missing, default to 1', async() =>
// {
//   const newBlog = {
//     title: 'HTML is a dog',
//     author: 'dog',
//     url: 'www.yahoo.com',
//   }
//   const response = await api.post('/api/blogs/blog').send(newBlog).expect(200);

//   console.log(response.body)
//   assert.strictEqual(response.body.likes, 0)
// })

// test('if the title or url is missing', async() =>
// {
//   const newBlog = {
//     author: 'dog',
//     url: 'www.yahoo.com',
//   }
//   const response = await api.post('/api/blogs/blog').send(newBlog);

//   assert.strictEqual(response.status, 400);
// })


describe('deletion of a note', () =>
{
  test('succeeds with status code 204 if id is valid', async () =>
  {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.title)
    assert(!contents.includes(blogToDelete.title))
  })
})

// test('the first blog is about something', async () => {
//   const response = await api.get('/api/blogs')

//   const contents = response.body.map(e => e.content)
//   assert.strictEqual(contents.includes('HTML is easy'), true)
// })

after(async () => {
  await mongoose.connection.close()
})