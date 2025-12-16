import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from 'antd'

import {
    CLUB,
    CLUB_LEO_KING,
    CLUB_OLE_FLOW,
    IS_AUTHENTICATED,
} from '../../shared/consts'
import {
    StyledButtonContainer,
    StyledError,
    StyledForm,
    StyledFormContainer,
    StyledInputContainer,
} from './styles'

export const Login = () => {
    const [value, setValue] = useState('')
    const navigate = useNavigate()

    const [isError, setError] = useState(false)

    const handleEnter = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        setError(false)
        if (value) {
            if (value === CLUB_LEO_KING || value === CLUB_OLE_FLOW) {
                localStorage.setItem(IS_AUTHENTICATED, 'true')
                localStorage.setItem(CLUB, value)
                navigate('/games')
            } else {
                setError(true)
            }
        } else {
            setError(true)
        }
    }

    const handleChangePassword = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setError(false)
        setValue(event.target.value)
    }
    return (
        <StyledForm onSubmit={handleEnter}>
            <StyledFormContainer>
                <StyledInputContainer>
                    <Input.Password
                        name="password"
                        placeholder="Введите пароль"
                        value={value}
                        onChange={handleChangePassword}
                        size="large"
                    />
                </StyledInputContainer>
                <StyledButtonContainer>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                    >
                        Войти
                    </Button>
                </StyledButtonContainer>
                <StyledError $isVisible={isError}>
                    Неверный пароль
                </StyledError>
            </StyledFormContainer>
        </StyledForm>
    )
}
