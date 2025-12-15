import styled from 'styled-components'

import { NavLink } from 'react-router-dom'

export const StyledMenu = styled.nav`
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    margin-bottom: 16px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`

export const StyledNavLink = styled(NavLink)`
    padding: 8px 16px;
    text-decoration: none;
    color: #666;
    font-size: 15px;
    font-weight: 500;
    border-radius: 6px;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
        color: #333;
    }

    &.active {
        color: #ab2a2a;
    }

    &.pending {
        opacity: 0.5;
    }
`

export const StyledSettingsButton = styled.button`
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    background: transparent;
    color: #666;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #f5f5f5;
        color: #333;
    }

    svg {
        display: block;
    }
`
