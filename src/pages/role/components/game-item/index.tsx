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
    isDragging: boolean
    isDragOver: boolean
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
    isDragging,
    isDragOver,
}: GameItemProps) => {
    const [isDisabled, setDisabled] = useState<boolean>(true)
    const [value, setValue] = useState<string>(item.userName)

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
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={onDragEnd}
            $isDragging={isDragging}
            $isDragOver={isDragOver}
        >
            <StyledGameItemLabel>
                <StyledGameItemId>{item.id}</StyledGameItemId>
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
