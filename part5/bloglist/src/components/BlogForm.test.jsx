import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('test blogForm', async () =>
{
  const user = userEvent.setup()
  let creatBlogCalls = []
  const createBlog = (blog) => {
    creatBlogCalls.push(blog)
  }

  render(<BlogForm createBlog={createBlog} />)

  const TitleInput = screen.getByText('Title:')
  const authorInput = screen.getByText('Author:')
  const urlInput = screen.getByText('URL:')
  const userInput = screen.getByText('UserId:')
  const likesInput = screen.getByText('Likes:')

  const createButton = screen.getByText('Create')

  await user.type(TitleInput, 'test for rich666')
  await user.type(authorInput, 'dog')
  await user.type(
    urlInput,
    'www.google.com'
  )
  await user.type(userInput, '660d57b929a3457933fa4934')
  await user.type(likesInput, '5')
  await user.click(createButton)

  // expect(createBlog).toHaveBeenCalledTimes(1)
  expect(creatBlogCalls.length).toBe(1)
  // expect(createBlog).toBe(1)

  // expect(createBlogCalls[0].title).toBe('test for rich666')
  // expect(creatBlogCalls[0].title).toBe('test for rich666')
})