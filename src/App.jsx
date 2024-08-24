import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
      <CreateBlogs user={user} />
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


//pass user as prop
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



const LoginForm = (props) => {

  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('')

  const userChange = (e) => {
    setUsername(e.target.value)
  }

  const passChange = (e) => {
    setPassword(e.target.value)
  }

  const requestLogin =  async (e) => {
    e.preventDefault()
    console.log(e)
    props.onLogin(username,password) //dont need to await here
  }

  const requestLogout = (e) => {

    props.onLogout()
  }

  return (
    <>
    
    {props.user === null && (
      <form onSubmit={requestLogin}>
      <div>
        <label>Username :</label>
        <input type='text' value={username} onChange={userChange} />
        
        <label>Password :</label>
        <input type='text' value={password} onChange={passChange} /><br/>
        <button type="submit">Login</button>
      </div>
    </form>
    )}

    {props.user !== null && (
      <div>
        <label>{props.user.name} logged in</label>
        <button type="submit" onClick={requestLogout}>Logout</button>
      </div>
    )}
    
    
    </>
    
  )
}

export default App