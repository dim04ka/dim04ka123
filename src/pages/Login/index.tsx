import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TEST_PASS, IS_AUTHENTICATED } from '../../consts'
import { Button, Input, Space } from 'antd';



const Login = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isError, setError] = useState(false)

  const handleEnter = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setError(false)
    if (value === TEST_PASS) {
      localStorage.setItem(IS_AUTHENTICATED, 'true')
      navigate('/random-chair')
      window.location.reload()
    } else {
      setError(true)
    }
  }
  return (
      <>
        <form onSubmit={handleEnter} style={{marginTop: 50, padding: '0px 20px'}}>
          <Space direction="vertical">
            <Space direction="horizontal">
              <Input.Password
                  name="password"
                  placeholder="input password"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  visibilityToggle={{visible: passwordVisible, onVisibleChange: setPasswordVisible}}
              />
              <Button htmlType="submit">
                Enter
              </Button>
            </Space>
          </Space>
          {isError ? <div style={{color: 'red'}}>error</div> : null}
        </form>
      </>
  )
}

export default Login
