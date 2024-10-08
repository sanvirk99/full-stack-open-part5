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

  const update = async () => {

    const newObject = {...blog,'user' : blog.user.id, 'likes': blog.likes+1}
    const res=await blogServices.update(newObject)
    if(res.status===204){
      refresh()
    }
  }

  const remove = async () => {    
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      return
    }
    const res = await blogServices.remove(blog)
    if(res.status===204){
      refresh()
    }
  }

  return (
  <div style={blogStyle} className='blog' data-testid='blog'>
    
    {visible ? <BlogDetails blog={blog} onHide={viewDetail} user={user} remove={remove} update={update}/> : <> {blog.title} {blog.author} <button onClick={viewDetail}>View</button> </>}
  </div> ) 
}

const BlogDetails = ({blog,onHide,user , update , remove}) => {


  //problem matic for test
  return (

    <div >
      <button onClick={onHide}>Hide</button> <br/>
      {blog.title} {blog.author} 
      {blog.url}<br/>
      <span data-testid='like'>{blog.likes}</span> <button onClick={update}>like</button><br/>
      {blog.user && blog.user.name} <br/>
      {blog.user.name === user.name && <button onClick={remove}>Remove</button>}

    </div>

  )



}

export default {Blog, BlogDetails};


