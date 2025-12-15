import styled from 'styled-components'

import { FormGroup } from '@mui/material'
import Button from '@mui/material/Button'

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    max-width: 800px;
    margin: 0 auto;
`

export const StyledFormGroup = styled(FormGroup)`
    flex-direction: row;

    margin-bottom: 0 !important;
`

export const StyledDivider = styled.hr`
    margin: 0;
    border: none;
    border-top: 2px solid #e0e0e0;
    opacity: 0.5;
`

export const StyledResultGame = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 0;
`

export const StyledResultSelect = styled.select`
    padding: 10px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    outline: none;
    transition: all 0.3s ease;
    min-width: 120px;

    &:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &:hover {
        border-color: #667eea;
    }
`

export const StyledTextarea = styled.textarea`
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
    font-size: 14px;
    color: #333;
    outline: none;
    transition: all 0.3s ease;
    background: #fff;

    &::placeholder {
        color: #999;
        opacity: 1;
    }

    &:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
`

export const StyledSubmitButton = styled(Button)`
    && {
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        color: white;
        text-transform: none;
        font-weight: 600;
        padding: 14px 28px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);
        transition: all 0.3s ease;
        font-size: 16px;

        &:hover {
            background: linear-gradient(
                135deg,
                #11998e 0%,
                #38ef7d 100%
            );
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(17, 153, 142, 0.5);
        }

        &:active {
            transform: translateY(0);
        }
    }
`
