import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog, blogs, setBlogs }) =>
{
  const [likes, setLikes] = useState(blog.likes)

  const onLike = async () => {
    try
    {
      setLikes(likes + 1)
      const newObj = {
        'title': blog.title,
        'author': blog.author,
        'url': blog.url,
        'likes': likes + 1,
        'user': blog.user
      }
      await blogService.update(blog.id, newObj)
    } catch (error) {
      console.error('Error liking the blog:', error)
    }
  }

  const onDelete = async() =>
  {
    try
    {
      if (window.confirm('Do you really want to delete?'))
      {
        await blogService.remove(blog.id)

        setBlogs(blogs.filter((b) => b.id !== blog.id))
      }
    } catch (error)
    {
      console.error('Error deleting the blog:', error)
    }
  }

  return (
    <div>
      {blog.title}
      <Togglable buttonLabel='view' buttonCancel='hide'>
        {blog.url} <br />
        Likes: {likes} <button onClick={onLike}>like</button> <br />
        {blog.author}
        <button onClick={onDelete}>delete</button>
      </Togglable>
    </div>
  )
}

export default Blog