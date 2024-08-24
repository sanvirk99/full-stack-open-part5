import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'

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
    await props.onLogin(username,password)
  }

  return (

    <form onSubmit={requestLogin}>
      <div>
        <label>Username :</label>
        <input type='text' value={username} onChange={userChange} />
        
        <label>Password :</label>
        <input type='text' value={password} onChange={passChange} /><br/>
        <button type="submit">Login</button>
      </div>
    </form>

  )


}

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [user, setUser] = useState(null)

  const loginAtempt = async (username, password) => {

      //if success populate user
      console.log(`request login ${username} `)

      const res=await loginServices.login({username,password})

      console.log('response')


  }


  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    }
    )  
  }, [])

  return (
    <div>
      
      <LoginForm onLogin={loginAtempt}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App