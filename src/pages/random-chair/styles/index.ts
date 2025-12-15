import styled from 'styled-components'

import Button from '@mui/material/Button'

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`

export const StyledHeader = styled.header`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

export const StyledListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    gap: 8px;
    padding: 12px;
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        padding: 16px;
        gap: 16px;
    }
`

export const StyledEditContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
`

export const StyledInput = styled.input`
    padding: 12px 16px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;
    background: #ffffff;
    color: #333;

    &::placeholder {
        color: #999;
        opacity: 1;
    }

    &:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &:disabled {
        background: #f5f5f5;
        cursor: not-allowed;
        opacity: 0.6;
    }
`

export const StyledButton = styled.button`
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    i {
        font-size: 18px;
    }
`

export const StyledRandomButton = styled(StyledButton)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`

export const StyledSubmitButton = styled(StyledButton)`
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(17, 153, 142, 0.5);
    }

    &:active {
        transform: translateY(0);
    }
`

export const StyledSaveButton = styled(StyledButton)`
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    color: white;
    padding: 10px 16px;
    min-width: 48px;
    box-shadow: 0 2px 8px rgba(17, 153, 142, 0.3);

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(17, 153, 142, 0.4);
    }
`

export const StyledCleanButton = styled(StyledButton)`
    background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
    color: white;
    padding: 12px 20px;
    box-shadow: 0 4px 15px rgba(235, 51, 73, 0.4);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(235, 51, 73, 0.5);
    }

    &:active {
        transform: translateY(0);
    }
`

export const StyledFormSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const StyledInputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const StyledLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
`

export const StyledSelect = styled.select`
    padding: 6px 8px;
    max-width: 70px;
    font-size: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;
    background: #ffffff;
    cursor: pointer;

    &:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
`

export const StyledInputRow = styled.div`
    display: flex;
    gap: 12px;
`

export const StyledShuffleButton = styled(Button)`
    && {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        text-transform: none;
        font-weight: 600;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
        transition: all 0.3s ease;

        &:hover {
            background: linear-gradient(
                135deg,
                #f093fb 0%,
                #f5576c 100%
            );
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(245, 87, 108, 0.5);
        }

        &:active {
            transform: translateY(0);
        }
    }
`
