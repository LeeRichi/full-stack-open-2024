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

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl}/api/blogs/${id}`, newObject)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { getAll, create, update, setToken }