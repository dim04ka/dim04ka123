import styled from 'styled-components'

export const StyledItem = styled.div<{
    $isActive: boolean
    $isEditing: boolean
    $isDragging: boolean
    $isDragOver: boolean
    $translateY?: number
}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
    min-height: 45px;
    padding: 8px 12px;
    border: 1px solid
        ${({ $isEditing, $isDragOver }) =>
            $isEditing ? 'green' : $isDragOver ? '#4a90e2' : '#000'};
    border-width: ${({ $isEditing, $isDragOver }) =>
        $isEditing || $isDragOver ? '2px' : '1px'};
    border-radius: 10px;
    background-color: ${({ $isActive }) =>
        $isActive ? 'rgb(153, 47, 47)' : '#6c6b6b'};
    cursor: ${({ $isActive, $isDragging }) =>
        $isDragging ? 'grabbing' : $isActive ? 'grab' : 'default'};
    transition: all 0.2s ease;
    gap: 12px;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: ${({ $isEditing, $isDragging, $isDragOver }) =>
        $isDragging
            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
            : $isEditing
              ? '0 0 10px rgba(49, 206, 9, 0.5)'
              : $isDragOver
                ? '0 0 10px rgba(74, 144, 226, 0.5)'
                : 'none'};
    opacity: ${({ $isDragging }) => ($isDragging ? 0.7 : 1)};
    transform: ${({ $isDragging, $translateY }) =>
        $isDragging && $translateY !== undefined && $translateY !== 0
            ? `translateY(${$translateY}px) scale(1.05)`
            : $isDragging
              ? 'scale(0.95)'
              : 'scale(1)'};
    touch-action: pan-y;
    z-index: ${({ $isDragging }) => ($isDragging ? 1000 : 1)};
    position: ${({ $isDragging, $translateY }) =>
        $isDragging && $translateY !== undefined && $translateY !== 0
            ? 'relative'
            : 'static'};
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;

    &:hover {
        opacity: ${({ $isActive, $isDragging }) =>
            $isDragging ? 0.5 : $isActive ? 0.9 : 1};
    }

    &:active {
        cursor: grabbing;
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

export const StyledDragIcon = styled.div<{ $isVisible: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #fff;
    font-size: 18px;
    width: 24px;
    height: 24px;
    cursor: ${({ $isVisible }) => ($isVisible ? 'grab' : 'default')};
    opacity: ${({ $isVisible }) => ($isVisible ? 0.9 : 0.6)};
    transition: opacity 0.2s ease;

    svg {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    &:hover {
        opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.8)};
    }

    &:active {
        cursor: ${({ $isVisible }) =>
            $isVisible ? 'grabbing' : 'default'};
    }
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
