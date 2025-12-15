import React, { useEffect, useState } from 'react'

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
    $touchY,
    $touchStartY,
}: {
    cb: (item: Item) => void
    edit: Item | null
    item: Item
    index: number
    onDragStart: (index: number) => void
    onDragEnd: () => void
    $isDragOver?: boolean
    $isAllFilled: boolean
    $touchY?: number | null
    $touchStartY?: number | null
}) => {
    const [isDragging, setIsDragging] = useState(false)
    const [translateY, setTranslateY] = useState(0)
    const itemRef = React.useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (
            $touchY != null &&
            $touchStartY != null &&
            typeof $touchY === 'number' &&
            typeof $touchStartY === 'number'
        ) {
            const offsetY = $touchY - $touchStartY
            setTranslateY(offsetY)
            setIsDragging(true)
        } else {
            setTranslateY(0)
            setIsDragging(false)
        }
    }, [$touchY, $touchStartY])

    const $isEditing = edit?.id === item.id
    const $isTouchDragging =
        $touchY != null &&
        $touchStartY != null &&
        typeof $touchY === 'number' &&
        typeof $touchStartY === 'number'

    return (
        <StyledItem
            ref={itemRef}
            $isActive={item.isBooked}
            $isEditing={$isEditing}
            $isDragging={isDragging || $isTouchDragging}
            $isDragOver={$isDragOver || false}
            $translateY={$isTouchDragging ? translateY : 0}
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
