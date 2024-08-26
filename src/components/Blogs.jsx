import { useState,useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = (props) => {
  return (
    <>
    {props.user !== null && props.blogs.length !== 0 && (
    <div>
    <h3>Blogs list</h3>
    {props.blogs.map(blog => (
        <Blog key={blog.id} blog={blog} refresh={props.refresh} user= { props.user } />
    ))}
    </div>
    )}
    </>
    )
} 

export default Blogs
  