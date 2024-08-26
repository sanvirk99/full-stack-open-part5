import { useState } from 'react'
import blogServices from '../services/blogs'
const Blog = ({ blog, refresh, user }) => {
  
  const [visible,setVisible]=useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewDetail = () => {
    setVisible(!visible)
  }

  return (
  <div style={blogStyle}>
    
    {visible ? <BlogDetails blog={blog} onHide={viewDetail} refresh={refresh} user={user}/> : <> {blog.title} {blog.author} <button onClick={viewDetail}>View</button> </>}
  </div> ) 
}

const BlogDetails = ({blog,onHide,refresh, user}) => {

  const update = async () => {

    const newObject = {...blog,'user' : blog.user.id, 'likes': blog.likes+1}
    const res=await blogServices.update(newObject)
    if(res.status===204){
      refresh()
    }

  }

  
  const remove = async () => {
    

    const res = await blogServices.remove(blog)

    if(res.status===204){
      refresh()
    }
    
  }

  return (

    <div>
      <li>{blog.title} {blog.author} <button onClick={onHide}>Hide</button></li> 
      <li>{blog.url} </li>
      <li>{blog.likes} <button onClick={update}>like</button></li>
      {blog.user && <li>{blog.user.name}</li>} 
      {blog.user.name === user.name && <button onClick={remove}>Remove</button>}

    </div>

  )



}

export default Blog