const { test, after, beforeEach } = require('node:test')
const assert = require('assert');

const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are x blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('The unique identifier is named id', async () =>
{
  const response = await api.get('/api/blogs')
  const allBlogsHaveId = response.body.every(blog => 'id' in blog);

  assert.strictEqual(allBlogsHaveId, true);
})

test('Total amount of blog increases by 1 while every post', async() =>
{
  const newBlog = {
    title: 'HTML is a dog',
    author: 'dog',
    url: 'www.yahoo.com',
    likes: 20
  }
  await api
    .post('/api/blogs/blog')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    assert(titles.includes('HTML is a dog'))
})

// test('the first blog is about something', async () => {
//   const response = await api.get('/api/blogs')

//   const contents = response.body.map(e => e.content)
//   assert.strictEqual(contents.includes('HTML is easy'), true)
// })

after(async () => {
  await mongoose.connection.close()
})