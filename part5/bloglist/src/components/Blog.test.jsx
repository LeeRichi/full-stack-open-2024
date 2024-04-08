import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

// test('renders content', async() => {
//   const blog = {
//     title: 'testing',
//     url: '123',
//     likes: 2,
//     author: 'dog',
//     user: '660d57b929a3457933fa4934'
//   }

//   //   const mockHandler = vi.fn()

//   render(<Blog blog={blog} />)

//   const element = screen.getByText('testing')
//   //   const element2 = screen.getByText('dog')

//   expect(element).toBeDefined()
//   //   expect(element2).toBeNull()

//   //   const user = userEvent.setup()
// })

// test('clicking the button toggles the visibility of blog details', async () => {
//   const blog = {
//     title: 'testing',
//     url: 'https://example.com',
//     likes: 5,
//     author: 'dog',
//     user: '660d57b929a3457933fa4934'
//   }

//   render(<Blog blog={blog} />)

//   // Initially, the blog details should not be visible
//   expect(screen.queryByText(blog.url)).toBeNull()
//   expect(screen.queryByText(`Likes: ${blog.likes}`)).toBeNull()
//   expect(screen.queryByText(blog.author)).toBeNull()

//   // Click the 'view' button
//   fireEvent.click(screen.getByText('view'))

//   // After clicking, the blog details should be visible
//   expect(screen.getByText(new RegExp(blog.url))).toBeInTheDocument()
//   expect(screen.getByText(new RegExp(`Likes: ${blog.likes}`))).toBeInTheDocument()
//   expect(screen.getByText(new RegExp(blog.author))).toBeInTheDocument()

//   fireEvent.click(screen.getByText('hide'))

//   // After clicking 'hide', the blog details should be hidden again
//   expect(screen.queryByText(new RegExp(blog.url))).toBeNull()
//   expect(screen.queryByText(new RegExp(`Likes: ${blog.likes}`))).toBeNull()
//   expect(screen.queryByText(new RegExp(blog.author))).toBeNull()
// })

test('clicking the like button twice calls the event handler prop twice', async () => {
  const blog = {
    title: 'testing',
    url: 'https://example.com',
    likes: 5,
    author: 'dog',
    user: '660d57b929a3457933fa4934'
  }

  const user = userEvent.setup()

  let updateBlogCalls = 0
  const updateBlog = () => {
    updateBlogCalls++
  }

  const { container } = render(<Blog blog={blog} updateBlog={updateBlog} />)
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like') // corrected the line
  await user.click(likeButton)
  await user.click(likeButton)

  // Expect the mock function to have been called twice
  expect(updateBlogCalls).toBe(2)
})
