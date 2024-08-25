import { useState,useEffect } from "react";
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = (props) => {
    // const [blogs, setBlogs] = useState([])
  
  
    // useEffect(() => {
  
    //   if(props.user !== null){
    //     blogService.getAll().then((blogs) => {
    //       setBlogs(blogs)
    //     })
    //   }},[props.user])
  
    return (
      <>
      {props.user !== null && props.blogs.length != 0 && (
        <div>
        <h3>Blogs list</h3>
        {props.blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
        </div>
        
      )}
      </>
    )
      
} 

export default Blogs
  