const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () =>
{
  // test('front page can be opened', async ({ page }) => {
  //   await page.goto('http://localhost:5173')

  //   const locator = await page.getByText('Notes')
  //   await expect(locator).toBeVisible()
  //   await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  // })

  beforeEach(async ({ page, request }) =>
  {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users/user', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  test('login old', async ({ page }) => {
    await page.getByRole('textbox').first().fill('mluukkai')
    await page.getByRole('textbox').last().fill('salainen')
    await page.getByRole('button', { name: 'Login' }).click()
  
    await expect(page.getByText('mluukkai')).toBeVisible()
  })

  //Login new
  // describe('HTTP POST /login', () =>
  // {
  //   test('authenticate user', async () =>
  //   {
  //     const user = {
  //       username: 'mluukkai',
  //       password: 'salainen',
  //     };

  //     const response = await api.post('/api/login').send(user).expect(201);
  //     token = response.body.token;
  //   });
  // })
});