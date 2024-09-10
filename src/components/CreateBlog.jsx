import {useState,useEffect} from 'react'
import blogService from '../services/blogs'

const CreateBlog = (props) => {

    const blogTemplate ={
      title : '',
      author : '',
      url: ''
      
    }

    const [visable,setVisable] = useState(false)

    const [blog,setBlog]=useState(blogTemplate)


    const requestCreate= async (e) => {
      e.preventDefault()
  
      try {
        const res = await blogService.create(blog)
        if(res.status===201){
          props.onNotify(`a new blog ${blog.title} by ${blog.author}`,false)
          setBlog(blogTemplate)
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

    const newNote = (e) => {
      setVisable(!visable)
      setBlog(blogTemplate)
    } 
  
    return props.user !== null ?(
     <Form  blog={blog}
      requestCreate={requestCreate}
      inputHandel={inputHandel}
      onPress={newNote}
      visable={visable}
      />
    ) : <></>
  }

const Form = (props) => {


  if(props.visable){

    return (
      
    <div>
      
      <h3>Create New Blog</h3>
      <form onSubmit={props.requestCreate} onChange={props.inputHandel}>
        <label>Title :</label><input type = 'text' name='title' data-testid='title' value={props.blog.title} onChange={props.inputHandel}></input><br />
        <label>Author :</label>
        <input type = 'text' name='author' data-testid='author' value={props.blog.author} onChange={props.inputHandel} ></input><br />
        <label>url :</label>
        <input type = 'text' name='url' data-testid='url' value={props.blog.url} onChange={props.inputHandel}></input><br />
        <button type='submit'>Create</button>
      </form>
    <button onClick={props.onPress}>Cancel</button>
    </div>
  )
  }else{

    return (
      <button onClick={props.onPress}>create new blog</button>
    )
  }



}  


export default {CreateBlog,Form}

