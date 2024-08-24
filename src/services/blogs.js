import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (userToken) => {
  token = userToken
}
const create = async (newObj) => {

  const config = {

    headers : {Authorization : `Bearer ${token}`}
  }

  const response = await axios.post(baseUrl, newObj, config)

  return response.data

}

export default { getAll , setToken , create }