import styled from 'styled-components'

export const StyledGameItem = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: stretch;

    &:hover {
        background: #f0f2f5;
        border-color: #e0e0e0;
    }

    &:last-child {
        margin-bottom: 0;
    }
`

export const StyledGameItemLabel = styled.label`
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    gap: 12px;
    min-width: 0;
    max-width: calc(100% - 160px);

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
    }
`

export const StyledGameItemId = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`

export const StyledGameItemInput = styled.input`
    flex: 1;
    padding: 10px 14px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
    background: #fff;
    color: #333;

    &:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &:disabled {
        background: #f5f5f5;
        cursor: not-allowed;
        opacity: 0.7;
    }
`

export const StyledGameItemContent = styled.div`
    display: flex;
    align-items: center;
`

export const StyledEditButton = styled.button`
    cursor: pointer;
    padding: 8px 16px;
    border: 2px solid #667eea;
    border-radius: 8px;
    background-color: #fff;
    color: #667eea;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
        background-color: #667eea;
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    &:active {
        transform: translateY(0);
    }
`

export const StyledRoleSelectWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
    width: 140px;
    max-width: 140px;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
        margin-top: 12px;
    }

    select {
        width: 100%;
        padding: 10px 14px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        background-color: #fff;
        color: #333;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        padding-right: 36px;

        &:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        &:hover {
            border-color: #667eea;
        }
    }
`
