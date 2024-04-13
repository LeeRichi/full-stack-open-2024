const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () =>
{
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

    await request.post('http://localhost:3001/api/users/user', {
      data: {
        name: 'Different User',
        username: 'differentuser',
        password: 'password'
      }
    });

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  test('can login', async ({ page }) => {
    await page.getByRole('textbox').first().fill('mluukkai')
    await page.getByRole('textbox').last().fill('salainen')
    await page.getByRole('button', { name: 'Login' }).click()
  
    await expect(page.getByText('blogs')).toBeVisible()
  })


  describe('When logged in', () =>
  {
    let token

    beforeEach(async ({ page, request }) => {
      const user = {
        username: "mluukkai",
        password: "salainen"
      }
      try {
        const response = await request.post('http://localhost:3001/api/login', user, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        token = response.token

        await page.getByRole('textbox').first().fill('mluukkai')
        await page.getByRole('textbox').last().fill('salainen')
        await page.getByRole('button', { name: 'Login' }).click()
      } catch (error) {
        console.error('Error logging in:', error);
      }
    })

    test('can login', async ({ page }) =>
    {
      await expect(page.getByText('blogs')).toBeVisible();
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click();

      const textboxes = await page.$$('input[type="text"]');

      console.log(textboxes.length); //not sure why it's 4 but not 5

      await textboxes[0].fill('this is not title')
      await textboxes[1].fill('this is author')
      await textboxes[2].fill('this is the link')
      await textboxes[3].fill('10')

      await page.getByTestId('userId').fill('randomidhahahaha')

      // await textboxes[4].fill('randomidhahahaha') //old, failed

      await page.getByRole('button', { name: 'Create' }).click();

      await expect(page.getByText('view')).toBeVisible();

      await page.getByRole('button', { name: 'view' }).click();

      await expect(page.getByText('link')).toBeVisible();
    });

    test('blog can be edited or delete', async ({ page }) =>
    {
      
      await page.getByRole('button', { name: 'new blog' }).click();
      const textboxes = await page.$$('input[type="text"]');

      await textboxes[0].fill('this is not title')
      await textboxes[1].fill('modified')
      await textboxes[2].fill('edited too')
      await textboxes[3].fill('100')

      await page.getByRole('button', { name: 'Create' }).click();
      
      page.on('dialog', async dialog => {
        await dialog.accept();
      });

      // await expect(page.getByText('view')).toBeVisible();

      await page.getByRole('button', { name: 'view' }).click();

      await expect(page.getByText('A new blog "this is not title" by modified added')).toBeVisible();
    })

    test('blog can be deleted only by the right user', async ({ page }) =>
    {
      await page.getByRole('button', { name: 'new blog' }).click();


      await expect(page.getByText('UserId')).toBeVisible();

      const textboxes = await page.$$('input[type="text"]');

      await textboxes[0].fill('this is not title')
      await textboxes[1].fill('modified')
      await textboxes[2].fill('edited too')
      await textboxes[3].fill('100')

      await page.getByRole('button', { name: 'Create' }).click();
      
      page.on('dialog', async dialog => {
        await dialog.accept();
      });
      await page.getByRole('button', { name: 'view' }).click();

      await expect(page.getByText('delete')).toBeVisible();

      await page.getByRole('button', { name: 'delete' }).click();
      
      page.on('dialog', async dialog => {
        await dialog.accept();
      });

      // await expect(page).not.toHaveText('this is not title');

      await expect(page.getByText('view')).not.toBeVisible()
    })

    async function login(page, username, password) {
      // Perform login actions here
      // For example:
      await page.getByRole('textbox').first().fill(username)
      await page.getByRole('textbox').last().fill(password)

      // await page.getByRole('button', { name: 'Login' }).click()

      // await expect(page.getByText('blogs')).toBeVisible()

      const loginButton = await page.getByRole('button', { name: 'Login' });
      await loginButton.click();

      await expect(page.getByText('blogs')).toBeVisible()
    }

    async function createBlogPost(page, title, author, url, likes) {
      // Perform actions to create a blog post here
      // For example:
      // await expect(page.getByText('new blog')).toBeVisible()

      await page.getByRole('button', { name: 'new blog' }).click()

      const textboxes = await page.$$('input[type="text"]');

      await textboxes[0].fill('external function')
      await textboxes[1].fill('new')
      await textboxes[2].fill('also new')
      await textboxes[3].fill('50')
      await page.getByRole('button', { name: 'Create' }).click()
    }

    test('only the matched login user can see the delete btn', async ({ page }) =>
    {      
      await login(page, 'mluukkai', 'salainen')
      await createBlogPost(page, 'Test Blog', 'Test Author', 'http://test.com', 10)
      await expect(page.getByText('view')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('delete')).toBeVisible()
      await page.getByRole('button', { name: 'delete' }).click()

      await page.getByRole('button', { name: 'log out' }).click();
      await expect(page.getByText('log in to application')).toBeVisible()

      await login(page, 'differentuser', 'password')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('delete')).not.toBeVisible()
    })
  })
});