import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginServices from './services/login'


const App = () => {
  
  const [user, setUser] = useState(null)
  const [blogs,setBlogs] = useState([])


  useEffect(() => {
    const userStr = window.localStorage.getItem('user')
    if(userStr){
      const user = JSON.parse(userStr)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const loginAtempt = async (username, password) => {

      //if success populate user
      console.log(`request login ${username} `)
      try {
        const user=await loginServices.login({username,password})
        setUser(user)
        window.localStorage.setItem('user',JSON.stringify(user))
        blogService.setToken(user.token)
      }catch (exception){
        console.log('invalid credentials')
        setUser(null)
       
      }
  }

  const logout = () => {

    if(user !== null){
      setUser(null)
      blogService.setToken(null)
      window.localStorage.removeItem('user')
    }

  }



  return (
    <div>
      <LoginForm onLogin={loginAtempt} onLogout={logout} user={user}/>
      <CreateBlog user={user} />
      <Blogs user={user} />
    </div>
  )
}

const CreateBlogs = (props) => {

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



export default App