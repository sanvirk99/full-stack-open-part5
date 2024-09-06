import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import CreateBlogComponents from './components/CreateBlog'
const {CreateBlog,Form} = CreateBlogComponents
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginServices from './services/login'



const App = () => {
  const [user, setUser] = useState(null)
  const [blogs,setBlogs] = useState([])
  const [errorMsg,setErrorMsg] = useState(null)
  const [msg,setMsg] = useState(null)



  useEffect(() => {
    const userStr = window.localStorage.getItem('user')
    if(userStr){
      const user = JSON.parse(userStr)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  useEffect(() => { //this is not async do need to use then return promoise

    refresh()
  },[user])



  useEffect(() => {

    //anytime msd
    setTimeout( () => {
      setMsg(null)
    },1500)

  },[msg])

  useEffect( () => {

    setTimeout(() => {
      setErrorMsg(null)
    },1500)
  },[errorMsg])

  const notify=(msg,isError) => {
    if(isError){
      setErrorMsg(msg)
    }else{
      setMsg(msg)
    }
  }

  const refresh = () => {
    blogService.getAll().then( (blogs) => {
      const sorted=blogs.sort((a,b) => { return b.likes - a.likes})
      setBlogs(sorted)
    })
  }

  const loginAtempt = async (username, password) => {
    //if success populate user
    console.log(`request login ${username} `)
    try {
      const user=await loginServices.login( { username,password } )
      setUser(user)
      window.localStorage.setItem('user',JSON.stringify(user))
      blogService.setToken(user.token)
      setMsg(`Welcome back ${user.name}`)
    }catch (exception){
      console.log('invalid credentials')
      setErrorMsg('wrong username or password')
      setUser(null)
    }
  }

  const logout = () => {
    if(user !== null){
      setUser(null)
      blogService.setToken(null)
      window.localStorage.removeItem('user')
      setMsg('Logout Succesfull')
    }
  }




  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={msg} errorMsg={errorMsg}/>
      <LoginForm onLogin={loginAtempt} onLogout={logout} user={user}/>
      <CreateBlog user={user} refresh={refresh} onNotify={notify}/>
      <Blogs user={user} blogs={blogs} refresh={refresh}/>
    </div>
  )
}





export default App