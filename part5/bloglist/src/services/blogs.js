import axios from 'axios'
const baseUrl = 'http://localhost:3001'

let token = null

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/blogs`)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${ baseUrl}/api/blogs/blog`, newObject, config)
  return response.data
}

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/api/blogs/${id}`, newObject)
//   return request.then(response => response.data)
// }

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/api/blogs/${id}`, newObject)
    return response.data
  } catch (error) {
    console.error('Error updating the blog:', error)
    throw error
  }
}

const remove = async (id) =>
{
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.delete(`${baseUrl}/api/blogs/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Error updating the blog:', error)
    throw error
  }
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { getAll, create, update, setToken, remove }