const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert');

const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('../utils/list_helper')


const initialUsers = []


describe('User creation', () =>
{
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('test creation of a user', async () =>
    {
        const newUser = {
            name: "rich",
            username: "rich lee",
            password: 'password123'
        }

        const response = await api
            .post('/api/users/user')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        
        assert.strictEqual(response.body.username, newUser.username);
        assert.strictEqual(response.body.name, newUser.name);

        const user = await User.findOne({ username: newUser.username });
        assert.ok(user);
        assert.ok(user.passwordHash);
    })

    test('failed case', async() =>
    {
        const newUser = {
            name: "rich",
            username: "rich lee",
            password: '12'
        }
        const response = await api
            .post('/api/users/user')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        
        assert.strictEqual(response.body.error, 'Password must be at least 3 characters long');
    })
})