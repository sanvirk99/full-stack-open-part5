import { useState,useEffect } from 'react'
import BlogComponets from './Blog'
const {Blog, BlogDetails} = BlogComponets
import blogService from '../services/blogs'

const Blogs = (props) => {
  return (
    <>
      {props.user !== null && props.blogs.length !== 0 && (
        <div>
          <h3>Blogs list</h3>
          <ol>
            <li>

              {props.blogs.map(blog => (
                <Blog key={blog.id} blog={blog} refresh={props.refresh} user={props.user} />
              ))}
            </li>


          </ol>

        </div>
      )}
    </>
  )
} 

export default Blogs
  