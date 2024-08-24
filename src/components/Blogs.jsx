import { useState,useEffect } from "react";
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = (props) => {
    const [blogs, setBlogs] = useState([])
  
  
    useEffect(() => {
  
      if(props.user !== null){
        blogService.getAll().then((blogs) => {
          setBlogs(blogs)
        })
      }},[props.user])
  
    return (
      <>
      {props.user !== null && (
        <div>
        <h2>blogs</h2>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
        </div>
        
      )}
      </>
    )
      
} 

export default Blogs
  