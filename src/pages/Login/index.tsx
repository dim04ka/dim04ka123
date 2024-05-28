import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TEST_PASS, IS_AUTHENTICATED } from '../../consts'

const Login = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleEnter = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { password } = Object.fromEntries(formData.entries());

    if (password === TEST_PASS) {
      localStorage.setItem(IS_AUTHENTICATED, 'true')
      navigate('/stats')
    }
  }
  return (
    <form onSubmit={handleEnter}>
      <div>Login</div>
      <input type="text" value={value} name='password' onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Войти</button>
    </form>

  )
}

export default Login