import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.02);
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
`

export const StyledFormContainer = styled.div`
    background: white;
    padding: 24px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    width: 90%;
`

export const StyledInputContainer = styled.div`
    margin-bottom: 20px;
`

export const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 16px;
`

export const StyledError = styled.div<{ $isVisible: boolean }>`
    color: #ff4d4f;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
    animation: ${({ $isVisible }) => ($isVisible ? pulse : 'none')} 1s
        ease-in-out;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.3s ease;
`
