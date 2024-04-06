import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setErrorMessage }) =>
{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) =>
    {
      event.preventDefault()
    
      try
      {
        const user = await loginService.login({
            username, password,
        })

        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
        blogService.setToken(user.token)
        setUser(user)
        // console.log(`user in from: ${JSON.stringify(user)}`);
        setUsername('')
        setPassword('')
      } catch (exception)
      {
        setErrorMessage('Wrong credentials')
        setTimeout(() =>
        {
            setErrorMessage(null)
        }, 5000)
      }
    }
    return (
      <>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        <button type="submit">Login</button>
        </form>
      </>
    )
}

export default LoginForm