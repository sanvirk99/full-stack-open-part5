
import React , { useState, useEffect } from 'react'
import PropTypes from 'prop-types'


const LoginForm = React.forwardRef((props,ref) => {

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
          <input type='password' value={password} onChange={passChange} /><br/>
          <button type='submit'>Login</button>
        </div>
      </form>
      )}
  
      {props.user !== null && (
        <div>
          <label>{props.user.name} logged in</label>
          <button type='submit' onClick={requestLogout}>Logout</button>
        </div>
      )}
      
      
      </>
      
    )
  })
  
LoginForm.displayName = 'LoginForm'

LoginForm.propTypes = {
onLogin: PropTypes.func.isRequired,
onLogout: PropTypes.func.isRequired,
user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null])
])
}

export default LoginForm