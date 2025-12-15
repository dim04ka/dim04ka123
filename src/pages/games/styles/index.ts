import styled from 'styled-components'

import { Link } from 'react-router-dom'

import { Typography } from '@mui/material'
import Button from '@mui/material/Button'

export const StyledGamesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 40px;
    max-width: 1200px;
    margin: 0 auto;
`

export const StyledEmptyMessage = styled.div`
    padding: 60px 20px;
    text-align: center;
    color: #888;
    font-size: 18px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 2px dashed #dee2e6;
`

export const StyledLoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 20px;
`

export const StyledGameCard = styled.div`
    padding: 10px 12px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: #d0d0d0;
        transform: translateY(-2px);
    }
`

export const StyledGameLink = styled(Link)`
    text-decoration: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: inherit;
    cursor: pointer;
`

export const StyledGameInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const StyledGameDetails = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 12px;
    background: #f5f5f5;
    border-radius: 8px;
    margin-top: 4px;
`

export const StyledDeleteButton = styled(Button)`
    && {
        background-color: #dc3545;
        color: white;
        text-transform: none;
        font-weight: 500;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;

        i {
            font-size: 14px;
        }

        &:hover {
            background-color: #c82333;
            box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
        }
    }
`

export const StyledGameNumber = styled(Typography)`
    && {
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 4px;
    }
`

export const StyledGameTime = styled(Typography)`
    && {
        font-size: 14px;
        color: #666;
        font-weight: 500;
        display: flex;
        align-items: center;

        i {
            margin-right: 6px;
            color: #888;
        }
    }
`

export const StyledGameRole = styled(Typography)`
    && {
        font-size: 14px;
        color: #333;
        font-weight: 500;
    }
`
