import { useEffect, useState } from 'react'

import Select from '@/components/Select'
import { Item, Role } from '@/shared/domain/interface'

import {
    StyledEditButton,
    StyledGameItem,
    StyledGameItemId,
    StyledGameItemInput,
    StyledGameItemLabel,
    StyledRoleSelectWrapper,
} from './styles'

type GameItemProps = {
    item: Item
    isShowRole: boolean
    cbSelect: (id: number, role: Role) => void
    changeValue: (value: string) => void
    onDragStart: (id: number) => void
    onDragOver: (e: React.DragEvent, id: number) => void
    onDragLeave: () => void
    onDrop: (id: number) => void
    onDragEnd: () => void
    onTouchStart: (e: React.TouchEvent) => void
    isDragging: boolean
    isDragOver: boolean
    $touchY?: number | null
    $touchStartY?: number | null
}

export const GameItem = ({
    isShowRole,
    item,
    cbSelect,
    changeValue,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onTouchStart,
    isDragging,
    isDragOver,
    $touchY,
    $touchStartY,
}: GameItemProps) => {
    const [isDisabled, setDisabled] = useState<boolean>(true)
    const [value, setValue] = useState<string>(item.userName)
    const [translateY, setTranslateY] = useState(0)

    const handleToggleEdit = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()

        if (isDisabled) {
            setDisabled(false)
        } else {
            setDisabled(true)
            changeValue(value || '')
        }
    }

    useEffect(() => {
        setValue(item.userName)
    }, [item.userName])

    useEffect(() => {
        if (
            $touchY != null &&
            $touchStartY != null &&
            typeof $touchY === 'number' &&
            typeof $touchStartY === 'number'
        ) {
            const offsetY = $touchY - $touchStartY
            setTranslateY(offsetY)
        } else {
            setTranslateY(0)
        }
    }, [$touchY, $touchStartY])

    const $isTouchDragging =
        $touchY != null &&
        $touchStartY != null &&
        typeof $touchY === 'number' &&
        typeof $touchStartY === 'number'

    const handleItemTouchStart = (e: React.TouchEvent) => {
        const target = e.target as HTMLElement
        const dragId = target.closest('[data-drag-id]')
        if (!dragId) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    const handleDragIdTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation()
        onTouchStart(e)
    }

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'move'
        onDragStart(item.id)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        onDragOver(e, item.id)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        onDragLeave()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        onDrop(item.id)
    }

    return (
        <StyledGameItem
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onTouchStart={handleItemTouchStart}
            $isDragging={isDragging || $isTouchDragging}
            $isDragOver={isDragOver}
            $translateY={$isTouchDragging ? translateY : 0}
        >
            <StyledGameItemLabel>
                <StyledGameItemId
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={onDragEnd}
                    onTouchStart={handleDragIdTouchStart}
                    data-drag-id
                >
                    {item.id}
                </StyledGameItemId>
                <StyledGameItemInput
                    onChange={(e) => setValue(e.target.value)}
                    disabled={isDisabled}
                    value={value}
                />
                <StyledEditButton onClick={handleToggleEdit}>
                    {isDisabled ? 'Edit' : 'Save'}
                </StyledEditButton>
            </StyledGameItemLabel>

            {isShowRole && (
                <StyledRoleSelectWrapper>
                    <Select
                        role={item.role}
                        cb={(role) => cbSelect(item.id, role)}
                    />
                </StyledRoleSelectWrapper>
            )}
        </StyledGameItem>
    )
}
