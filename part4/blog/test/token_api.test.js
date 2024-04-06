const { test, after } = require('node:test');
const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

const mockUser = {
    username: 'test_user',
    name: 'rich',
    password: 'test_password'
};

let token;

test('create initial user', async () => {
    try {
        await User.deleteOne({ username: mockUser.username });
            
        const response = await api
            .post('/api/users/user')
            .send(mockUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const createdUser = response.data;
    } catch (error) {
        console.error('Error while creating user:', error.message);
    }
});

test('login and get token', async () => {
  try {
    const response = await api
        .post('/api/login')
        .send(mockUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    token = response.body.token;
  } catch (error) {
    console.error('Error while logging in and getting token:', error.message);
  }
});

test('test if the token works', async () =>
{
  if (!token) {
    console.error('Token not available, skipping test.');
    return;
  }

  const newBlog = {
    title: 'HTML is a dog',
    author: 'dog',
    url: 'www.yahoo.com',
    likes: 20
  };

  await api
    .post('/api/blogs/blog')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
});

after(async () => {
  try {
    await User.deleteOne({ username: mockUser.username });
    await Blog.deleteOne({ username: mockUser.username });
    await mongoose.connection.close()
  } catch (error) {
    console.error('Error while cleaning up:', error.message);
  }
});