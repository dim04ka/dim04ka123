import { useNavigate } from 'react-router-dom'

import { Button } from 'antd'

import { CLUB, IS_AUTHENTICATED } from '@/shared/consts'

import {
    StyledButtonContainer,
    StyledContainer,
    StyledTitle,
} from './styles'

export const Settings = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem(CLUB)
        localStorage.removeItem(IS_AUTHENTICATED)
        navigate('/login')
    }

    return (
        <StyledContainer>
            <StyledTitle>Настройки</StyledTitle>
            <StyledButtonContainer>
                <Button
                    type="primary"
                    danger
                    size="large"
                    onClick={handleLogout}
                >
                    Выйти
                </Button>
            </StyledButtonContainer>
        </StyledContainer>
    )
}
