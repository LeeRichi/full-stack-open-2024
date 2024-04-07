import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorFlag, setErrorFlag] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const onLogOut = () =>
  {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleErrorMessage = (message, isError) => {
    setErrorMessage(message)
    setErrorFlag(isError)

    setTimeout(() => {
      setErrorMessage('');
      setErrorFlag(false);
    }, 5000); 
  }

  return (
    <div>
      <h1 className={errorFlag ? 'error' : 'success'}>{errorMessage}</h1> {/* Apply appropriate class based on errorFlag */}
      {!user ?
        <LoginForm setUser={setUser} setErrorMessage={handleErrorMessage} />
        :
        <>
          <div>
            {user.username} is logged in <button onClick={onLogOut}>log out</button>
          </div>
          <h2>blogs</h2>
          <Togglable buttonLabel="new blog" buttonCancel="cancel">
            <BlogForm setErrorMessage={handleErrorMessage} />
          </Togglable >
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  )
}

export default App