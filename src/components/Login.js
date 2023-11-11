import React, {useState} from 'react'
import {useNavigate } from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate ();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/auth/login';
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate('/');
      }
      else alert('Invalid login credentials')
  }

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={handleChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login
