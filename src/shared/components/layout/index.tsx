import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { IS_AUTHENTICATED } from '../../consts'
import { Menu } from '../menu'
import { StyledLayout } from './styles'

export const Layout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const isAuthenticated = localStorage.getItem(IS_AUTHENTICATED)
        if (isAuthenticated !== 'true') {
            navigate('/login')
        }
    }, [])
    return (
        <StyledLayout>
            <Menu />
            <Outlet />
        </StyledLayout>
    )
}
