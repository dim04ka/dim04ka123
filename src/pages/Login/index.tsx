import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IS_AUTHENTICATED, CLUB_LEO_KING, CLUB_OLE_FLOW, CLUB} from '../../consts'
import { Button, Input, Space } from 'antd';



const Login = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isError, setError] = useState(false)

  const handleEnter = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setError(false)
    if (value) {
      if (value === CLUB_LEO_KING || value === CLUB_OLE_FLOW) {
        localStorage.setItem(IS_AUTHENTICATED, 'true')
        localStorage.setItem(CLUB, value)
        navigate('/random-chair')
        window.location.reload()
      }

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
