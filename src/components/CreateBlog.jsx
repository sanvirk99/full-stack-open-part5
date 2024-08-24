import {useState,useEffect} from 'react'
import blogService from '../services/blogs'

const CreateBlog = (props) => {

    const blogTemplate ={
      title : null,
      author : null,
      url: null
      
    }
  
    const [blog,setBlog]=useState(blogTemplate)
  
    const requestCreate= (e) => {
      e.preventDefault()
  
      try {
        const data = blogService.create(blog)
  
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
        
        <h1>create New</h1>
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