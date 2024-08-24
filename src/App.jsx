import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'


const App = () => {
  
  const [user, setUser] = useState(null)


  useEffect(() => {

    const userStr = window.localStorage.getItem('user')
    if(userStr){
      setUser(JSON.parse(userStr))
    }


  },[])

  const loginAtempt = async (username, password) => {

      //if success populate user
      console.log(`request login ${username} `)
      try {
        const user=await loginServices.login({username,password})
        setUser(user)
        window.localStorage.setItem('user',JSON.stringify(user))
      }catch (exception){
        console.log('invalid credentials')
        setUser(null)
        window.localStorage.removeItem('user')
      }
  }

  const logout = () => {

    if(user !== null){
      setUser(null)
    }

  }

  return (
    <div>


      <LoginForm onLogin={loginAtempt} onLogout={logout} user={user}/>
      <Blogs user={user} />
      
    </div>
  )
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