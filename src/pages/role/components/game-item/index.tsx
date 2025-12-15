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
}

export const GameItem = ({
    isShowRole,
    item,
    cbSelect,
    changeValue,
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

    return (
        <StyledGameItem>
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
