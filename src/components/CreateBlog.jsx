import {useState,useEffect} from 'react'
import blogService from '../services/blogs'

const CreateBlog = (props) => {

    const blogTemplate ={
      title : null,
      author : null,
      url: null
      
    }
  
    const [blog,setBlog]=useState(blogTemplate)
  
    const requestCreate= async (e) => {
      e.preventDefault()
  
      try {
        const res = await blogService.create(blog)
        if(res.status===201){
          props.onNotify(`a new blog ${blog.title} by ${blog.author}`,false)
          props.refresh()
        }else{
          props.onNotify(`failed to create new blog`,true)
        }
  
      }catch(exception) {
  
        console.log(exception)
  
      }
      
      console.log(blog)
    }
  
    const inputHandel = (e) => {
      
      const {name, value} = e.target
      setBlog({...blog,[name] : value})
      
    }
  
    return props.user !== null ?  (
      <div>
        
        <h3>Create New Blog</h3>
        <form onSubmit={requestCreate} onChange={inputHandel}>
          <label>Title :</label><input type = 'text' name='title'></input><br />
          <label>Author :</label>
          <input type = 'text' name='author'></input><br />
          <label>url :</label>
          <input type = 'text' name='url'></input><br />
          <button type='submit'>create</button>
        </form>
  
      </div>
    ) : <></>
  
  }
  
export default CreateBlog