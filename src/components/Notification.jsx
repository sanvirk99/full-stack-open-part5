import {useState,useEffect} from 'react'
import '../styles/App.css'

const Notification = ({message,errorMsg}) => {

   
    return (
        <div>
        {errorMsg && (
            <div className='errorNotification'>
          {errorMsg}
        </div>)
        }

        {message && (
            <div className='notification'>
          {message}
        </div>)
        }
        </div>      
    )
}



export default Notification