import { useState } from 'react'

import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

import { Item } from '@/shared/domain/interface'

import {
    StyledDragIcon,
    StyledEditIcon,
    StyledItem,
    StyledItemContent,
    StyledItemId,
    StyledItemName,
} from './styles'

export const ItemComponent = ({
    cb,
    edit,
    item,
    index,
    onDragStart,
    onDragEnd,
    $isDragOver,
    $isAllFilled,
}: {
    cb: (item: Item) => void
    edit: Item | null
    item: Item
    index: number
    onDragStart: (index: number) => void
    onDragEnd: () => void
    $isDragOver?: boolean
    $isAllFilled: boolean
}) => {
    const [isDragging, setIsDragging] = useState(false)

    const handleEditClick = () => {
        cb(item)
    }

    const handleDragStart = (e: React.DragEvent) => {
        if ($isAllFilled === false) {
            e.preventDefault()
            return
        }
        setIsDragging(true)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', index.toString())
        onDragStart(index)
    }

    const handleDragEnd = () => {
        setIsDragging(false)
        onDragEnd()
    }

    const $isEditing = edit?.id === item.id

    return (
        <StyledItem
            $isActive={item.isBooked}
            $isEditing={$isEditing}
            $isDragging={isDragging}
            $isDragOver={$isDragOver || false}
            draggable={$isAllFilled}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <StyledDragIcon $isVisible={$isAllFilled}>
                <DragIndicatorIcon />
            </StyledDragIcon>
            <StyledItemContent>
                <StyledItemId>{item.id}.</StyledItemId>
                <StyledItemName>{item.userName}</StyledItemName>
            </StyledItemContent>
            {item.isBooked && (
                <StyledEditIcon onClick={handleEditClick}>
                    <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                    ></i>
                </StyledEditIcon>
            )}
        </StyledItem>
    )
}
