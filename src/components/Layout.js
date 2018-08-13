import React from 'react'
import {Link} from 'react-router-dom'

export function Header (props){
  return (
    <header className="main-header">
      <ul>
          <li><Link to="/" >Home</Link></li>
          <li><Link to="/weather" >Weather</Link></li>
      </ul>
      <ul>
          <li><Link to="/login" >Login</Link></li>
      </ul>
    </header>
  )
}

export function Login() {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form method="post">
        <label htmlFor="email">Email: </label>  
        <input type="text" name="email" />
        <label htmlFor="password">Password: </label>  
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
      <Link to="/forgot-password" >Forgot password?</Link>
    </div>
  )
} 
export function Error404() {
  return (
    <div className="error-404">
      <h1>Error 404</h1>
      <p>Sorry we didn't find this route</p>
      <Link to="/" >Go home</Link>
    </div>
  )
}

