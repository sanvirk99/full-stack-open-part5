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

  return response

}

const update = async (newObj) => {

  
  const res = await axios.put(`${baseUrl}/${newObj.id}`,newObj)

  return res

}


const remove = async (obj) => {


  const config = {

    headers : {Authorization : `Bearer ${token}`}
  }

  const res = await axios.delete(`${baseUrl}/${obj.id}`,config)

  return res

}

export default { getAll , setToken , create , update , remove }