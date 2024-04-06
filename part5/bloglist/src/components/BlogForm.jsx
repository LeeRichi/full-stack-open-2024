import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setErrorMessage}) =>
{
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [likes, setLikes] = useState(0);
    const [userId, setUserId] = useState('');

    const handleCreate = async(event) =>
    {
        event.preventDefault()
        
        try
        {
            event.preventDefault()
            await blogService.create({ title, author, url, likes, userId })
            setTitle('')
            setAuthor('')
            setUrl('')
            setLikes(0)
            setUserId('')
            setErrorMessage(`a new blog ${title} by ${author} added`, false)
        } catch (error)
        {
            setErrorMessage(`Error creating blog: ${error.message}`, true)
        }
    }

  return (
    <div>
        <h1>Create New Blog</h1>
        <form onSubmit={handleCreate}>
            <div>
                Title:
                <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                URL:
                <input
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <div>
                Likes:
                <input
                type="number"
                value={likes}
                onChange={({ target }) => setLikes(target.value)}
                />
            </div>
            <div>
                UserId:
                <input
                    type="text"
                    value={userId}
                    onChange={({ target }) => setUserId(target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
    );

}

export default BlogForm