import styled from 'styled-components'

export const StyledItem = styled.div<{
    $isActive: boolean
    $isEditing: boolean
}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
    min-height: 45px;
    padding: 8px 12px;
    border: 1px solid
        ${({ $isEditing }) => ($isEditing ? 'green' : '#000')};
    border-width: ${({ $isEditing }) => ($isEditing ? '2px' : '1px')};
    border-radius: 10px;
    background-color: ${({ $isActive }) =>
        $isActive ? 'rgb(153, 47, 47)' : '#6c6b6b'};
    cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
    transition: all 0.2s ease;
    gap: 12px;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: ${({ $isEditing }) =>
        $isEditing ? '0 0 10px rgba(49, 206, 9, 0.5)' : 'none'};

    &:hover {
        opacity: ${({ $isActive }) => ($isActive ? 0.9 : 1)};
    }
`

export const StyledItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
`

export const StyledItemId = styled.div`
    font-weight: 600;
    color: #fff;
    flex-shrink: 0;
`

export const StyledItemName = styled.div`
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    max-width: 100%;
`

export const StyledEditIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #fff;
    font-size: 16px;
    width: 24px;
    height: 24px;
    cursor: pointer;

    i {
        pointer-events: none;
    }
`
