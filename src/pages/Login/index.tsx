import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem('isAuthenticated')
  //   if (isAuthenticated) {
  //     navigate('/random-chair')
  //   }
  // }, [])

  const handleEnter = (e: any) => {
    e.preventDefault();
    if (value === '12345') {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/')
    }
  }
  return (
    <>
      <div>Login</div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit" onClick={handleEnter}>Войти</button>
    </>

  )
}

export default Login